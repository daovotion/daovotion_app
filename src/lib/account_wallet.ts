import {writable as writableDBLocal} from "svelte-local-storage-store";
import {get as getter} from "svelte/store";
import {keccak256} from "ethereum-cryptography/keccak";
import {toHex, hexToBytes, utf8ToBytes} from "ethereum-cryptography/utils";
import {getPublicKey as CurveKeyGen, sign as CurveSign , verify as CurveVerify} from "ethereum-cryptography/secp256k1";
import "@lib/localdb";


const accountID_field = "DVaccountID";
const accountList_field = "DVaccount_list";
const accountInitialBalance = BigInt(10000000);
/*****************
 * Local store writables need to be declared as const !!
 *****************/
const accountID = writableDBLocal(accountID_field, null);
const accountList = writableDBLocal(accountList_field, null);

interface UserAccount{
    user: string;    
    balance:bigint;
    public_key: string;
};

const searchUser = async function(usrname : string) : Promise<UserAccount> {
    let usrlist = getter(accountList);
    if(usrlist == null) return null;
    let index = usrlist.findIndex(ele => ele && ele.user == usrname);

    /// A Delay 
    const delayfn = new Promise(function(resolve){
        setTimeout(resolve, 500);
    });

    await delayfn;

    if(index >= 0)
    {
        return usrlist[index];
    }
    return null;
};

/**
 * Only generates a hash
 * @param user 
 * @param password 
 */
const accountPrivKeyGen = async function(user:string, password:string) : Promise<Uint8Array> {
    return keccak256(utf8ToBytes(user + "_" + password));
}

const accountPublicKey = async function(user:string, password:string) : Promise<string> {
    let bytearr = await accountPrivKeyGen(user, password);
    return toHex(CurveKeyGen(bytearr));
}

const verifyAccount = async function(user:string, password:string, public_key: string) : Promise<boolean> {
    let genkey = await accountPublicKey(user, password);
    return Promise.resolve( genkey ===  public_key);
}

const updateUser = async function(usrname : string, newbalance : bigint) : Promise<boolean> {
    let usrlist = getter(accountList);
    if(usrlist == null) return false;
    
    let index = usrlist.findIndex(ele => ele && ele.user == usrname);

    /// A Delay 
    const delayfn = new Promise(function(resolve){
        setTimeout(resolve, 1000);
    });

    await delayfn;

    if(index >= 0)
    {
        const new_usr_data = {user:usrname, password: usrlist[index].password, balance:newbalance};
        usrlist[index] = new_usr_data;
        accountList.update((prev_list) => {
            return usrlist;
        });

        return true;
    }
    return false;
};

const registerUser = async function(usrname : string, passw : string) : Promise<boolean>
{
    let oldusr = await searchUser(usrname);
    if(oldusr != null) 
    {
        accountID.set(null);
        return false;
    }

    let publicKey = await accountPublicKey(usrname, passw);
    
    let new_usr_data = {user:usrname, balance:accountInitialBalance, public_key: publicKey};
    accountList.update((prev_list) => { 
        if(prev_list != null)
        {
            return [...prev_list, new_usr_data];
        }
        return [new_usr_data];
    });

    accountID.set(usrname);


    return true;
};

const loginUser = async function(usrname : string, passw : string) : Promise<boolean>
{
    let oldusr = await searchUser(usrname);

    if(oldusr == null){
        let ret = await registerUser(usrname, passw);
        return ret;
    } 


    // verify user and password
    let very = await verifyAccount(oldusr.user, passw, oldusr.public_key);

    if(!very){
        accountID.set(null);
        return false;
    }

    accountID.set(usrname);
    return true;
};

const authorizeAccountEx = async function(usrname: string, passw : string) : Promise<boolean> {
    let oldusr = await searchUser(usrname);
    if(oldusr == null){
        return false;
    }

    // verify user and password
    let very = await verifyAccount(oldusr.user, passw, oldusr.public_key);

    return very;
}


const authorizeAccount = async function(passw : string) : Promise<boolean> {

    let usrname = getter(accountID);
    if(usrname == null) return false;

    return authorizeAccountEx(usrname, passw);
}


const accountBalance = async function() : Promise<bigint> {

    let usrname = getter(accountID);
    if(usrname == null) return 0n;

    let oldusr = await searchUser(usrname);
    if(oldusr == null){
        return 0n;
    }

    return oldusr.balance;
}

const accountPaymentEx = async function(payment:bigint, src_wallet:string, src_psw:string, target_wallet:string) : Promise<boolean> {
    let src_usr = await searchUser(src_wallet);
    if(src_usr == null){
        return false;
    }

    let target_usr = await searchUser(target_wallet);
    if(src_usr == null){
        return false;
    }

    if(payment < src_usr.balance){
        return false;
    }

    // verify user and password
    let very = await verifyAccount(src_usr.user, src_psw, src_usr.public_key);
    if(!very){
        return false;
    }

    const updates = Promise.all([() => updateUser(src_wallet, src_usr.balance - payment ), 
                                 () => updateUser(target_wallet, src_usr.balance + payment) ]);
    await updates;
    return true;
}

const accountContractPaymentEx = async function(payment:bigint, src_wallet:string, src_psw:string) : Promise<boolean> {
    let src_usr = await searchUser(src_wallet);
    if(src_usr == null){
        return false;
    }

    if(payment < src_usr.balance){
        return false;
    }

    // verify user and password
    let very = await verifyAccount(src_usr.user, src_psw, src_usr.public_key);
    if(!very){
        return false;
    }

    let success = await updateUser(src_usr.user, src_usr.balance - payment );
    return success;
}

const accountPayment = async function(payment:bigint, src_psw:string, target_wallet:string) : Promise<boolean> {
    let usrname = getter(accountID);
    if(usrname == null) return false;
    return accountPaymentEx(payment, usrname, src_psw, target_wallet);
}

const accountContractPayment = async function(payment:bigint, src_psw:string) : Promise<boolean> {
    let usrname = getter(accountID);
    if(usrname == null) return false;
    return accountContractPaymentEx(payment, usrname, src_psw);
}

/// Logout 
const logoutUser = async function(){
    accountID.set(null);    
};

export { 
    accountID,
    loginUser,
    registerUser,
    searchUser,
    verifyAccount,
    authorizeAccount,
    authorizeAccountEx,
    accountBalance,
    accountPayment,
    accountPaymentEx,
    accountContractPayment,
    accountContractPaymentEx,
    logoutUser
};