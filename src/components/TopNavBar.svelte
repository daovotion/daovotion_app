<script>
import AccountButton from "@components/AccountButton.svelte";
import NavLink from "@components/NavLink.svelte";
import DaovotionImage from "@icons/daovotion_penrose_triangle.png";
import ArrowIcon from "@icons/up_arrow_web.svg.svelte";
import { createEventDispatcher } from 'svelte';

export let links = [];
export let hide_bar = false;
export let nullify_account_button = false;

// Dispatch event for up arrow
let e_dispatch = createEventDispatcher();

function up_arrow_event(){
    e_dispatch("up_arrow");
}

function account_connect()
{
    e_dispatch("account_connect");
}

function account_menu()
{
    e_dispatch("account_menu");
}
</script>

<div class="topnavbar_base {hide_bar ? "topnavbar_shrink" : "topnavbar_extend"}">
    <div class = "flex flex-row justify-start px-2 w-full transition-all duration-500 {hide_bar ? "nav_section_disabled": "nav_section_enabled"}">
        <a href="/" class="{hide_bar ? "pointer-events-none" : "pointer-events-auto"}">
            <div class="btn btn-ghost p-1 mx-2 h-20 w-20 bg-transparent border-none tooltip tooltip-bottom" data-tip="Home">
                <img src={DaovotionImage} class="button_icon" />
            </div>
        </a>
        <!-- <div class = "flex flex-row justify-start  w-full"> -->
        {#if !hide_bar}
            {#each links as item}
                <div class="p-2 m-2 pointer-events-auto">
                    <NavLink to = "{item[0]}" activeClass = "active_link" inactiveClass = "normal_link" >{item[1]}</NavLink>
                </div>
            {/each}
        {/if}
        
    </div>
    <div class="justify-self-end px-8 pointer-events-auto">
        <AccountButton on:account_menu={account_menu} on:account_connect={account_connect} nullify={nullify_account_button} />
    </div>
</div>

<div on:click={up_arrow_event} class="uparrow_base {hide_bar ? "uparrow_enabled" : "uparrow_disabled"}">
    <ArrowIcon />
</div>

<style lang="scss" >

    :global(.normal_link) {
        @apply btn btn-ghost;
    }

    :global(.active_link) {
        @apply btn btn-primary;
    }

    .topnavbar_base {
        @apply bg-neutral absolute w-screen top-0 left-0 z-30 flex flex-row h-20 p-0  justify-items-stretch;
        @apply transition-opacity duration-500 pointer-events-none;        
    }


    .topnavbar_extend {
        @apply bg-opacity-80 shadow;        
    }

    .topnavbar_shrink{
        @apply bg-opacity-0;
        
    }

    .nav_section_enabled {
        @apply pointer-events-auto opacity-100;
    }

    .nav_section_disabled {
        @apply pointer-events-none opacity-0;
    }

    
    .uparrow_base {

        --up_arrow_siz : 8vh;
        --up_arrow_px : calc(99vw - var(--up_arrow_siz) );

        @apply absolute top-20 z-10 btn btn-circle;
        @apply transition-all duration-300;

        width: var(--up_arrow_siz);
        height: var(--up_arrow_siz);
        left: var(--up_arrow_px);
        padding:0.5vh;
    }

    .uparrow_enabled {
        @apply top-20 opacity-70  pointer-events-auto;
    }

    .uparrow_disabled {
        @apply top-px opacity-0  pointer-events-none;
    }


</style>