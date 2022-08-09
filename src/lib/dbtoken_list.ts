import { DBfetch, DBstore } from "@lib/localdb";

function get_field<Type>(obj: Type, field: string): any {
    type ObjectKey = keyof Type;
    return obj[field as ObjectKey];
}


function set_field<Type>(obj: Type, field: string, value:any) {
    type ObjectKey = keyof Type;
    obj[field as ObjectKey] = value;
}

export interface IListHead {
    head:string;
    count:number;
}

/**
 * This method stores the state of current list node and 
 * the list head status.
 * It changes new_node but it doesn't store the state of new_node in the DB.
 * @param new_node 
 * @param new_node_id 
 * @param prev 
 * @param next 
 * @param listdb_field 
 * @param node_loading 
 * @param node_store 
 */
const appendListDB = async function<NodeType>(new_node:NodeType, 
                                              new_node_id : string,
                                              prev:string, next:string,
                                              listdb_field:string,
                                              node_loading: (node_id:string) => Promise<NodeType>,
                                              node_store: (node:NodeType) => Promise<void>, 
                                              store_new_node:boolean = false ) {

    let current_head_id = null;
    let list_count = 0;

    // fetch current list
    let dblist_handle = await DBfetch(listdb_field);
    if(dblist_handle != null){
        let dblistobj:IListHead = dblist_handle as IListHead;
        current_head_id = dblistobj.head; list_count = dblistobj.count;
    }

    set_field(new_node, prev, null);
    set_field(new_node, next, current_head_id);

    // current head node
    if(current_head_id != null){
        let head_node:NodeType = await node_loading(current_head_id);
        if(head_node == null){
            throw Error("Cannot load list node");
        }

        // link previous
        set_field(head_node, prev, new_node_id);
        // store node update
        await node_store(head_node);
    }

    // store new list head
    await DBstore(listdb_field, {head:new_node_id, count:(list_count + 1) });

    if(store_new_node){
        await node_store(new_node);
    }
}

const removeListDB = async function<NodeType>(  excluded_node:NodeType, 
                                                excluded_node_id : string,
                                                prev:string, next:string,
                                                listdb_field:string,
                                                node_loading: (node_id:string) => Promise<NodeType>,
                                                node_store: (node:NodeType) => Promise<void>,
                                                store_excluded_node:boolean = false  ) {
    let current_head_id = null;
    let list_count = 0;
    // fetch current list
    let dblist_handle = await DBfetch(listdb_field);
    if(dblist_handle != null){
        let dblistobj:IListHead = dblist_handle as IListHead;
        current_head_id = dblistobj.head; list_count = dblistobj.count;
    }
    else // null list?
    {
        throw Error("Cannot update list");
    }

    let ex_prev_id:string = get_field(excluded_node, prev);
    let ex_next_id:string = get_field(excluded_node, next);

    if(ex_prev_id != null){
        // unlink from previous
        let prev_node:NodeType = await node_loading(ex_prev_id);
        if(prev_node == null){
            throw Error("Cannot load list node");
        }
        set_field(prev_node, next, ex_next_id); // link to the next
        // store node update
        await node_store(prev_node);
    }


    if(ex_next_id != null){
        // unlink from next
        let next_node:NodeType = await node_loading(ex_next_id);
        if(next_node == null){
            throw Error("Cannot load list node");
        }
        set_field(next_node, prev, ex_prev_id); // link to the previous
        // store node update
        await node_store(next_node);
    }

    // update list status
    if(current_head_id == excluded_node_id){
        current_head_id = ex_next_id;
    }

    // store new list head
    await DBstore(listdb_field, {head:current_head_id, count:(list_count - 1) });

    if(store_excluded_node){
        await node_store(excluded_node);
    }
}

export {get_field, set_field, appendListDB, removeListDB};