<script>
    import {accountID} from "@lib/account_wallet.ts";
    import { createEventDispatcher } from 'svelte';
    import BigButton from "@components/BigButton.svelte";
    import ConnectIcon from "@icons/connect_plug_web.svg.svelte";
    import AccountIcon from "@icons/profile_light_web.svg.svelte";
    //import DaovotionImage from "@icons/daovotion_penrose_triangle.png";
    

    export let nullify = false;

    /** this Component produces 2 event types:
     * - account-connect : attempt to connect to an account through a wallet (like metamask)
     * - account-menu : call to the container for showing the account drawer menu
    */
    let e_dispatch = createEventDispatcher();

    function account_connect()
    {
        console.log("User ID when.. ",  $accountID);
        e_dispatch("account_connect");
    }

    function account_menu()
    {
        console.log("User ID YAY!! ",  $accountID);
        e_dispatch("account_menu");
    }

    
    let account_val = null;
    $: account_val = $accountID;    
    
</script>
<style lang="scss">
    
    :global(.account_connect_button_alt) {
        @apply bg-accent border-accent-focus tooltip-error;
    }

    :global(.account_connect_button_alt):hover {
        @apply bg-error border-error;
    }

    :global(.account_connect_button_alt):active {
        @apply bg-warning;
    }
</style>
{#if account_val != null}
    <BigButton on:click={account_menu} label = "Account" nullify={nullify} > <AccountIcon /> </BigButton>    
{:else}
    <BigButton on:click={account_connect} label = "Connect" extra_class="account_connect_button_alt" nullify={nullify} > <ConnectIcon /> </BigButton>
{/if}
