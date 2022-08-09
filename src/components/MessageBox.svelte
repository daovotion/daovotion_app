<script>
    import { createEventDispatcher } from 'svelte';

    export let message = null;

    /** this Component produces event:     
     * - close : closing the dialog
    */
    let e_dispatch = createEventDispatcher();

    function close_message(){
        e_dispatch("close");
    }
</script>

<div class="modal {message != null ? "modal-open":""} " >
    <div class="modal-box relative">        
        {#if message != null}
        <h3>{message}</h3>
        {/if}
        <div class="modal-action">
            <label on:click={close_message} class="btn">Ok</label>
        </div>
    </div>
</div>

