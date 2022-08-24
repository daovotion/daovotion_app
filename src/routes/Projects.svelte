<script>
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import Project from "../components/Project.svelte";
    import { writable, derived } from 'svelte/store';
    import { projects } from "../store/Projects";

    let term = writable('');
    let items = writable(projects);
    let filtered = derived([term, items], ([$term, $items]) => $items.filter(x => x.name.includes($term) || x.description.includes($term)));
	let val = '';
	$: term.set(val);
</script>

<style>
    .Projects {
        color: white;
        background-color: black;
    }

    .Projects-search {
        width: 400px;
        height: auto;
        padding: 10px 20px;
        display: flex;
        border: 2px solid #66ff99;
        border-radius: 30px;
        font-family: 'Inter', sans-serif;
        margin-top: 30px;
        margin-left: 35%;
    }

    .Projects-search i {
        font-size: 1rem;
        color: #66ff99;
        margin-right: 5%;
    }

    .Projects-search input {
        border: 0;
        outline: 0;
        font-size: 1rem;
        background-color: black;
        color: white;
    }

    .Projects-list {
        text-align: center;
    }

    .Projects-list p {
        margin-top: 12%;
        margin-bottom: 12%;
    }

    .Projects-list div {
        margin: 0px 50px 0px 50px;
        display: inline-flex;
    }
</style>

<div class="Projects">
    <Header />
    <div class="Projects-search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Buscar proyecto" bind:value={val} id="searchInput">
    </div>
    <div class="Projects-list">
        {#each $filtered as project}
            <div>
                <Project {...project}></Project>
            </div>
        {:else}
            <p>No pudimos encontrar ese proyecto.</p>
        {/each}
    </div>
    <Footer />
</div>