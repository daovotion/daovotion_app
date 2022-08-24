<script>
    import Logo from "./Logo.svelte";
    import NavBar from "./NavBar.svelte";
    import Language from "./Language.svelte";
    import Profile from "./Profile.svelte";
</script>

<style>
    .Header-content {
        width: 100%;
        background-color: black;
        color: white;
        padding: 10px;
        display: flex;
        align-items: center;
        font-size: 1.3rem;
    }
</style>

<div class="Header">
    <header class="Header-content">
        <Logo />
        <NavBar />
        <Language />
        <Profile />
    </header>
</div>