<script>
    import { createEventDispatcher } from 'svelte';

    export let open = false;

    /** this Component produces 2 event types:
     * - wallet : attempt to connect to an account through a wallet (like metamask)
     * - cancel : closing the dialog
    */
    let e_dispatch = createEventDispatcher();
    
    let account_psw = "";

    function cancel_dialog(){        
        e_dispatch("cancel");
    }

    function clear_fields(){        
        account_psw = "";
    }

    function select_metamask() {        
        e_dispatch("wallet", 
            {
                provider:"metamask",
                account:{password:account_psw}
            }
        );

        clear_fields();
    }

</script>

<div class="modal {open? "modal-open":""} " >
    <div class="modal-box relative">
        <label class="btn btn-sm btn-circle absolute right-2 top-2" on:click={cancel_dialog}>✕</label>
        <slot></slot>
        <div class="flex flex-col justify-between items-center w-full content-center px-16">
            <label class="input-group input-group-vertical my-4 w-full">
                <span>Password</span>
                <input type="password" class="input input-bordered" bind:value={account_psw} />
            </label>
            <div class="modal-action">
                <label on:click={select_metamask} class="btn">Metamask</label>
            </div>
        </div>
    </div>
</div>
