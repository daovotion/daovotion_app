
/****** bigint FIX ******/
BigInt.prototype["toJSON"] = function () {
    return this.toString();
};

let g_localStorage = null;
 
if (typeof localStorage === "undefined" || localStorage === null) 
{
    const LocalStorageClass = require('node-localstorage').LocalStorage;

    //import {LocalStorage as LocalStorageClass} from "node-localstorage";
    g_localStorage = new LocalStorageClass('./scratch');
}
else
{
    g_localStorage = localStorage;
}
  


const DBfetch = async function(key:string) : Promise<object> {

    let objdata = g_localStorage.getItem(key);
    if(objdata == null) return null;

    let parsedpromise = null;
    try{
        parsedpromise = Promise.resolve(JSON.parse(objdata));
    }
    catch(e){
        throw  new EvalError("Cannot evaluate parsedobject");
    }
    return parsedpromise;
}

const DBstore = async function(key:string, objvalue : any)  {
    try{
        let objdata = JSON.stringify(objvalue);
        g_localStorage.setItem(key, objdata);
    }
    catch(e){
        throw EvalError("Cannot store object");
    }
}

export {DBfetch, DBstore};