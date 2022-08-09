<script>
    import AccountMenu from "@components/AccountMenu.svelte";
    import { createEventDispatcher } from 'svelte';

    export let open = false;// Opens the drawer
    export let drawerID = "AccountMenuDrawerID";

    let e_dispatch = createEventDispatcher();
    


    function select_item(event)
    {
        e_dispatch("select_item", event.detail);
    }

    function close_drawer()
    {
        e_dispatch("close");
    }

    let drawer_handle = null;
    
    $:if(drawer_handle != null){
        drawer_handle.checked = open;
    }
    


</script>

<div class="drawer">
    <input id="{drawerID}" type="checkbox" class="drawer-toggle" bind:this={drawer_handle} />
    <div class="drawer-content">
      <slot></slot>
    </div> 
    <div class="drawer-side">
      <label class="drawer-overlay" on:click={close_drawer} ></label>
      <AccountMenu on:select_item={select_item}/>
    </div>
  </div>