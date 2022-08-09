<script lang="ts">
    import ScrollOut from "scroll-out";
    import "@styles/global.scss";
    import TopNavBar from "@components/TopNavBar.svelte";
    import Home from "@routes/Home.svelte";
    import LoginModal from "@components/LoginModal.svelte";
    import MessageBox from "@components/MessageBox.svelte";
    import AccountMenuDrawer from "@components/AccountMenuDrawer.svelte";
    import {accountID, loginUser, logoutUser} from "@lib/account_wallet.ts";



    import {onMount, onDestroy} from "svelte";


    let menu_items = [
        ["/market", "Market"],
        ["/events", "Events"],
        ["/blog", "News"]
    ];


    let scroll_navbar_hide = false;
    let content_target = null;
    


    // adjust scroll out
    let scroll_out_handle = null;
    onMount(() => { 

        scroll_out_handle  = ScrollOut({
            targets:".focus_mark",
            scrollingElement: content_target,
            onShown: function(element, ctx, scrollingElement) {
                scroll_navbar_hide = false;
            },
            onHidden: function(element, ctx, scrollingElement) {
                scroll_navbar_hide = true;
            }
        });
    });

    onDestroy(() => {
        scroll_out_handle.teardown();
    });
    

    function scroll_up()
    {
        if(content_target != null)
        {
            content_target.scrollTop = 0;
        }
    }


    // control variable for login dialog
    let modal_show_login = false;
    let transaction_message_dlg = null;
    let nullify_account_button = false;
    function asking_wallet() {
        console.log("Show login modal??");
        modal_show_login = true;
    }

    function cancel_connect() {        
        modal_show_login = false;
    }

    const try_connect =  async function(user:string, pasw:string) : boolean {
        let login_success = await loginUser(user, pasw);

        nullify_account_button = false;

        if(login_success == false)
        {
            show_transaction_msg("Failed to connect to account");
        }
        return login_success;
    } 

    function connect_event(event) {        
        modal_show_login = false;
        
        let wallet = event.detail;
        if(wallet.provider == "metamask")
        {
            console.log("METAMASK!!");

            nullify_account_button = true;
            let account = wallet.account;
            try_connect(account.name, account.password);
        }
    }

    function show_transaction_msg(message)
    {
        transaction_message_dlg = message;
    }

    function close_transaction_msg()
    {
        transaction_message_dlg = null;
    }

    /// Menu Drawer
    let open_menu_drawer = false;

    function show_account_menu() {
        if(nullify_account_button == false)
        {
            open_menu_drawer = true;
        }        
    }

    function account_select_item(event)
    {
        let selected_item = event.detail;
        console.log("Selected Option : ", selected_item);

        open_menu_drawer = false;

        if(selected_item == "logout"){
            logoutUser();
        }
    }

    function close_menu_drawer(){
        open_menu_drawer = false;
    }

</script>
<div class="w-screen h-screen absolute overflow-hidden">
    <AccountMenuDrawer open={open_menu_drawer} on:close={close_menu_drawer} on:select_item={account_select_item} >

        <TopNavBar
            on:up_arrow={scroll_up}
            on:account_connect={asking_wallet}
            on:account_menu={show_account_menu}
            hide_bar={scroll_navbar_hide}
            links={menu_items}
            nullify_account_button={nullify_account_button} />

        <div class="w-screen h-screen overscroll-auto overflow-auto px-[15vw] py-24" bind:this={content_target}>
            <div class="focus_mark"></div>
            <Home />
        </div>

    </AccountMenuDrawer>
    

    <LoginModal open={modal_show_login} on:cancel={cancel_connect} on:wallet={connect_event} />

    <MessageBox message={transaction_message_dlg} on:close={close_transaction_msg}/>

</div>

<style>
    .focus_mark {
        @apply opacity-0 w-screen h-24;
    }
</style>
