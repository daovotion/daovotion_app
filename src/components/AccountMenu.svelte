<script>
    import { createEventDispatcher } from 'svelte';
    import {accountID} from "@lib/account_wallet.ts";

    let e_dispatch = createEventDispatcher();

    function select_item(item_id)
    {
        e_dispatch("select_item", item_id);
    }

    let account_id = null;
    $: account_id = $accountID;

    
</script>

{#if account_id != null}

    <ul class="menu overflow-y-auto bg-base-100 w-1/3 p-4">
        <li class="menu-title">
            <span>Account Details for : {account_id} </span>
        </li>    
        <li class="hover-bordered" ><a on:click={() => select_item("dashboard") }> Dashboard & Inventory </a></li>
        <li class="hover-bordered" ><a class="link-primary" on:click={() => select_item("logout") }><strong>Log out</strong></a></li>
        
        <li class="menu-title">
            <div class="divider"></div>
            <span>Egregore Management</span>
        </li>
        <li class="hover-bordered"><a on:click={() => select_item("egregores") }>Egregores Foundation </a></li>    
        <li class="menu-title">
            <div class="divider"></div>
            <span>Egregore Memberships</span>
        </li>
        <li class="hover-bordered"><a on:click={() => select_item("devotees") }>Devotee Tokens</a></li>
        <li class="hover-bordered"><a on:click={() => select_item("staked") }>Staked Reputation</a></li>
        <li class="hover-bordered"><a on:click={() => select_item("devotee_bill") }>New Devotee Bill</a></li>
        <li class="menu-title">
            <div class="divider"></div>
            <span>Lottery & Trials</span>
        </li>
        <li class="hover-bordered"><a on:click={() => select_item("lottery") }>Promotion Lottery</a></li>
        <li class="hover-bordered"><a on:click={() => select_item("trials") }>Ongoing Trials</a></li>
        <li class="hover-bordered"><a on:click={() => select_item("allegations") }>My Allegations</a></li>
        <li class="menu-title">
            <div class="divider"></div> 
            <span>Governance Tokens</span>
        </li>
        <li class="hover-bordered"><a class="link-primary" on:click={() => select_item("minting") }><strong>NFT Minting</strong></a></li>
        <li class="hover-bordered"><a on:click={() => select_item("archangels") }>Archangel Seats</a></li>
        <li class="hover-bordered"><a on:click={() => select_item("puzzle") }>Token Puzzles</a></li>
        <li class="hover-bordered"><a on:click={() => select_item("nft_market") }>NFT Market</a></li>
    </ul>

{:else}
    
    <div class="alert alert-error shadow-lg w-56 p-2">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Error! Cannot connect to account.</span>
        </div>
    </div>

    
{/if}

