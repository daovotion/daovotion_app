<script>
    import { createEventDispatcher } from 'svelte';
    import WaitingIcon from "@icons/waiting.svg.svelte";
    
    /** this Component produces 2 event types:
     * - account-connect : attempt to connect to an account through a wallet (like metamask)
     * - account-menu : call to the container for showing the account drawer menu
    */
    let e_dispatch = createEventDispatcher();
    function click_event(){
        e_dispatch("click");
    }

    export let label = "Button";
    export let extra_class = "big_button_alt";
    export let nullify = false;

</script>
<div draggable="false" class="big_button_pad {extra_class} {nullify? "pointer-events-none":""}" 
     data-tip="{label}" on:click={click_event} >    
    <div class="button_icon">        
        {#if nullify}
            <WaitingIcon />
        {:else}
            <slot></slot>
        {/if}
    </div>    
</div>
<style lang="scss">
    

    :global(.big_button_pad){
        display:flex;    
        flex-direction: column;
        justify-content: space-around;
        align-content: center;
        align-items: center;    
        border-style: outset;    
        overscroll-behavior: none;
        cursor: pointer;
        user-select: none;

        @apply font-semibold uppercase;

        box-shadow: 0.2em 0.2em 4px 2px rgba(0.5, 0.5, 0.5, 0.5);

        @apply border rounded-full w-20 h-20 p-2 m-px transition-all duration-100;

        @apply tooltip tooltip-bottom;
    }

    :global(.big_button_pad):active {
        box-shadow: 0.03em 0.03em 1px 1px rgba(0.5, 0.5, 0.5, 0.5);
        @apply border-2;        
    }


    .button_icon {
        user-select: none;
        @apply border-none self-center max-w-full max-h-full;
    }

    // default extra class
    .big_button_alt {
        @apply bg-primary border-primary-focus tooltip-secondary;
    }

    .big_button_alt:hover {
        @apply bg-secondary border-secondary;
    }

    .big_button_alt:active {
        @apply brightness-150;
    }

</style>