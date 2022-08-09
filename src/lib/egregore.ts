import {writable as writableDBLocal} from "svelte-local-storage-store";
import {get as getter} from "svelte/store";
import { v4 as uuidv4 } from 'uuid';
import {keccak256} from "ethereum-cryptography/keccak";
import {toHex, hexToBytes, utf8ToBytes} from "ethereum-cryptography/utils";
import {getPublicKey as CurveKeyGen, sign as CurveSign , verify as CurveVerify} from "ethereum-cryptography/secp256k1";
import { DBfetch, DBstore } from "@lib/localdb";
import {appendListDB, removeListDB, IListHead} from "@lib/dbtoken_list";

import { 
    accountID,
    searchUser,
    authorizeAccount,
    authorizeAccountEx,
    accountBalance,
    accountPayment,
    accountContractPayment
} from "@lib/account_wallet";


const egregoreID_prefix = "DVEgregore_";
const EgregoreContract_field = "DVEgregore_contract";
const EgregoreOwnership_prefix = "DV_Eg_owner_";
const DevoteeOwnership_prefix = "DV_Dev_owner_";
const EgregoreTokenOwnership_prefix = "DV_EgToken_owner_";
const WoodenEgregoreList_field = "DV_Eg_wooden";
const AccreditedEgregoreList_field = "DV_Eg_accr";

const percentDivisor = BigInt(10000);

enum ePrestigeKind {
    WOODEN_GOBLET = 0,
    BRONZE_GOBLET = 1,
    SILVER_GOBLET = 2,
    GOLDEN_GOBLET = 3,
    DIAMOND_GOBLET = 4
}

interface IEgregore{
    ID : string;
    name : string;
    owner : string;
    URL:string;
    description:string;
    prestigeLevel:ePrestigeKind;
    graceGrapes:number;
    floorPrice: bigint;
    minCommisionPrice: bigint;
    commisionPercentaje: bigint;// If positive, is calculated based on the sale price
    insuranceTax: bigint; // In percentaje, default 10%
    
    collectedFunds : bigint;
    insuranceVault : bigint;
    accumulatedCommisions : bigint;
    //// Initial devotee allocation
    founderDevoteesReserve:number; // ammount of Devotees reserved for the founder to be minted
    initialDevoteeCount:number;// initial ammount of devotees to be minted by demand
    initialDevoteePrice:bigint;// initial price of devotees to be minted by demand

    //// Devotee promotion 
    graduationThreshold : number;

    /// Devotees listing
    devoteesCount :number;
    devoteeListHead: string;// hash ID of the devotee

    /// Data list structure
    prevList:string;
    nextList:string;
    ownerListPrev:string;
    ownerListNext:string;
}


class Egregore implements IEgregore{
    ID : string;
    name : string;
    owner : string;
    URL:string;
    description:string;
    prestigeLevel:ePrestigeKind;
    graceGrapes:number;
    floorPrice: bigint;
    minCommisionPrice: bigint;
    commisionPercentaje: bigint;// If positive, is calculated based on the sale price
    insuranceTax: bigint; // In percentaje    
    collectedFunds : bigint;
    insuranceVault : bigint;
    accumulatedCommisions : bigint;
    //// Founder devottess
    founderDevoteesReserve:number; // ammount of Devotees reserved for the founder to be minted
    initialDevoteeCount:number;// initial ammount of devotees to be minted by demand
    initialDevoteePrice:bigint;// initial price of devotees to be minted by demand

    //// Devotee promotion 
    graduationThreshold : number;

    /// Devotees listing
    devoteesCount :number;
    devoteeListHead: string;// hash ID of the devotee

    /// Data structure
    prevList:string;
    nextList:string;
    ownerListPrev:string;
    ownerListNext:string;

    constructor(egregoreID: string, ownerAccount:string) {
        this.ID = egregoreID;
        this.name = "";
        this.owner = ownerAccount;
        this.URL = "";
        this.description = "";
        this.prestigeLevel = ePrestigeKind.WOODEN_GOBLET;
        this.graceGrapes = 0;
        this.floorPrice = 1000000n;/// $100 * percentDivisor
        this.minCommisionPrice = 200000n;/// $20 * percentDivisor
        this.commisionPercentaje = 0n;// If positive, is calculated based on the sale price
        this.insuranceTax = 1000n; // 10% In percentaje units
        
        this.collectedFunds = 0n;
        this.insuranceVault = 0n;
        this.accumulatedCommisions = 0n;
        //// Initial devotee allocation
        this.founderDevoteesReserve = 20; // ammount of Devotees reserved for the founder to be minted
        this.initialDevoteeCount = 10;// initial ammount of devotees to be minted by demand
        this.initialDevoteePrice = this.floorPrice;// initial price of devotees to be minted by demand

        //// Devotee promotion 
        this.graduationThreshold = 6;

        /// Devotees listing
        this.devoteesCount = 0;
        this.devoteeListHead = null;// hash ID of the devotee

        /// Data structure
        this.prevList = null;
        this.nextList = null;
        this.ownerListPrev = null;
        this.ownerListNext = null;
    }

    copyfrom(egregore_data: IEgregore, copyID:boolean = true) {
        if(copyID == true){
            this.ID = egregore_data.ID;            
            this.owner = egregore_data.owner;
            this.prevList = egregore_data.prevList;
            this.prevList = egregore_data.prevList;
            this.ownerListPrev = egregore_data.ownerListPrev;
            this.ownerListNext = egregore_data.ownerListNext;
        }

        this.name = egregore_data.name
        this.URL = egregore_data.URL;
        this.description = egregore_data.description;
        this.prestigeLevel = egregore_data.prestigeLevel;
        this.graceGrapes = egregore_data.graceGrapes;
        this.floorPrice = egregore_data.floorPrice;
        this.minCommisionPrice = egregore_data.minCommisionPrice;
        this.commisionPercentaje = egregore_data.commisionPercentaje;
        this.insuranceTax = egregore_data.insuranceTax;        
        this.collectedFunds = egregore_data.collectedFunds;
        this.insuranceVault = egregore_data.insuranceVault;
        this.accumulatedCommisions = egregore_data.accumulatedCommisions;        
        this.founderDevoteesReserve = egregore_data.founderDevoteesReserve;
        this.initialDevoteeCount = egregore_data.initialDevoteeCount;
        this.initialDevoteePrice = egregore_data.initialDevoteePrice;
        this.graduationThreshold = egregore_data.graduationThreshold;        
        this.devoteesCount = egregore_data.devoteesCount;
        this.devoteeListHead = egregore_data.devoteeListHead;
    }

    toObject() : IEgregore {
        return {
            ID: this.ID,
            name: this.name,
            owner: this.owner,
            URL: this.URL,
            description: this.description,
            prestigeLevel: this.prestigeLevel,
            graceGrapes : this.graceGrapes,
            floorPrice: this.floorPrice,
            minCommisionPrice : this.minCommisionPrice,
            commisionPercentaje : this.commisionPercentaje,
            insuranceTax: this.insuranceTax,        
            collectedFunds : this.collectedFunds,
            insuranceVault : this.insuranceVault,
            accumulatedCommisions : this.accumulatedCommisions,        
            founderDevoteesReserve : this.founderDevoteesReserve,
            initialDevoteeCount : this.initialDevoteeCount,
            initialDevoteePrice : this.initialDevoteePrice,            
            graduationThreshold : this.graduationThreshold,            
            devoteesCount : this.devoteesCount,
            devoteeListHead : this.devoteeListHead,
            prevList : this.prevList,
            nextList : this.nextList,
            ownerListPrev: this.ownerListPrev,
            ownerListNext: this.ownerListNext
        };
    }

    is_accredited() : boolean {
        return this.prestigeLevel != ePrestigeKind.WOODEN_GOBLET;
    }
}


const fetch_egregore = async function (egregoreID : string) : Promise<Egregore> {
    let obj = await DBfetch(egregoreID);
    if(obj == null) Promise.resolve(null);

    let newinstance : Egregore = new Egregore("","");

    try{
        newinstance.copyfrom(<IEgregore>obj);
    }catch(e){
        throw new EvalError("Bad formating data");
    }
    return newinstance;
}

const store_egregore = async function (egregoreobj : IEgregore) {
    await DBstore(egregoreobj.ID, egregoreobj);
}

/// Egregore token balance

interface IETokenBalance {
    tokens:number;
}

const fetch_e_token_balance = async function(account:string) : Promise<number> {
    let key_id = EgregoreTokenOwnership_prefix + account;
    let obj = await DBfetch(key_id);
    if(obj == null) return 0;
    let etk = <IETokenBalance>obj;
    return etk.tokens;
}

const store_e_token_balance = async function(account:string, numtokens:number) {
    let key_id = EgregoreTokenOwnership_prefix + account;
    await DBstore(key_id, {tokens:numtokens});
}
/****************************** */

interface IEgregoreContract {
    delegate_account:string;/// account ID from delegate administrator, contract owner
    globalTax: bigint; // In percentaje, default 5%
    commonTreasure: bigint;
    egregoreMintTokenPrice: bigint; // price for minting Egregore Foundational tokens
    woodenEgregoreList : string; // last in the list of non-accredited egregores
    accreditedEgregoreList : string; // last in the list of accredited egregores
}

class EgregoreContract {
    delegate_account:string;/// account ID from delegate administrator, contract owner
    globalTax: bigint; // In percentaje, default 5%
    commonTreasure: bigint;
    egregoreMintTokenPrice: bigint; // price for minting Egregore Foundational tokens
    woodenEgregoreList : string; // last in the list of non-accredited egregores
    woodenEgregoreListCount:number;
    accreditedEgregoreList : string; // last in the list of accredited egregoresres
    accreditedEgregoreListCount:number;

    constructor(contract_owner:string){
        this.delegate_account = contract_owner;
        this.globalTax = 500n; // In percentaje, default 5%
        this.commonTreasure = 0n;
        this.egregoreMintTokenPrice = 100000n; // price for minting Egregore Foundational tokens
        this.woodenEgregoreList = null;
        this.woodenEgregoreListCount = 0;
        this.accreditedEgregoreList = null; // last in the list of accredited egregoresres
        this.accreditedEgregoreListCount = 0;

    }

    /// Throws error
    public async transfer_egregore(egregore_id:string, target_account:string, owner_passw:string) {
        
        let account_id = getter(accountID);
        if(account_id == null){
            throw Error("Account is not active.");
        }
        
        // load egregore
        let egregore_obj = await fetch_egregore(egregore_id);
        if(egregore_obj == null){
            throw Error("Egregore does not exists.");
        }

        // verifty ownership
        if(egregore_obj.owner != account_id){
            throw Error("Account is not the owner.");
        }

        let isallowed:boolean = await authorizeAccountEx(account_id,owner_passw);
        if(isallowed == false){
            throw Error("Not allowed signature.");
        }

        let list_owner_id = EgregoreOwnership_prefix + account_id;

        let list_target_id = EgregoreOwnership_prefix + target_account;
        

        const prev_field = "ownerListPrev";
        const next_field = "ownerListNext";

        await removeListDB<Egregore>(egregore_obj, egregore_id,
                                     prev_field, next_field, list_owner_id,
                                     fetch_egregore, store_egregore);
        // append node in target account
        await appendListDB<Egregore>(egregore_obj, egregore_id,
                                     prev_field, next_field, list_target_id,
                                     fetch_egregore, store_egregore, true);

    }

    public async remove_egregore(egregore_id:string, src_passw:string) {
        let account_id = getter(accountID);
        if(account_id == null){
            throw Error("Account is not active.");
        }
        
        // load egregore
        let egregore_obj = await fetch_egregore(egregore_id);
        if(egregore_obj == null){
            throw Error("Egregore does not exists.");
        }

        // verifty ownership
        if(egregore_obj.owner != account_id){
            throw Error("Account is not the owner.");
        }

        let isallowed:boolean = await authorizeAccountEx(account_id,owner_passw);
        if(isallowed == false){
            throw Error("Not allowed signature.");
        }

        let list_owner_id = EgregoreOwnership_prefix + account_id;

        const prev_field = "ownerListPrev";
        const next_field = "ownerListNext";

        const prev_list_field = "prevList";
        const next_list_field = "nextList";

        await removeListDB<Egregore>(egregore_obj, egregore_id,
                                     prev_field, next_field, list_owner_id,
                                     fetch_egregore, store_egregore);

        
        if(egregore_obj.is_accredited()){
            // remove from accredited list
            await removeListDB<Egregore>(egregore_obj, egregore_id,
                prev_list_field, next_list_field,
                AccreditedEgregoreList_field,
                fetch_egregore, store_egregore);
        }
        else{
            // remove from woodwn list

            await removeListDB<Egregore>(egregore_obj, egregore_id,
                prev_list_field, next_list_field,
                WoodenEgregoreList_field,
                fetch_egregore, store_egregore);

        }

        // store null on key
        await DBstore(egregore_id, null);
    }

    public async transfer_devotee(devotee_id:string, target_account:string, src_passw:string) : Promise<boolean> {

    }

    public async remove_devotee(devotee_id:string, src_passw:string) : Promise<boolean>{

    }

    public async mint_egregore_token(owner_passw:string): Promise<boolean> {

    }
}