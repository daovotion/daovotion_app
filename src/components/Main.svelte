<script>
    import Interaction from "./Interaction.svelte";
    import Project from "./Project.svelte";
    import {link} from 'svelte-spa-router'
    import Carrousel from './Carousel.svelte';
</script>

<style>
    .Main {
        background-color: black;
        width: 100%;
        height: auto;
        font-size: 1.3rem;
        position: relative;
    }

    .Main-section-description {
        color: white;
        position: absolute;
        width: 800px;
        margin-top: 100px;
        margin-left: 150px;
    }

    .Main-section-description h1 {
        -webkit-text-stroke: 1px #66ff99;
        color: black; /* width and color */
        margin: 0;
        font-size: 4rem;
        font-weight: 700;
    }

    .Main-section-description h3 {
        font-weight: 700;
    }

    .Main-section-description p {
        margin-bottom: 40px;
    }

    .Main-section-description a {
        text-decoration: none;
        width: auto;
        height: 50px;
        padding: 10px 20px;
        font-size: 1.2rem;
        font-weight: 1000;
        color: #66ff99;
        background-color: black;
        border: 2px solid #66ff99;
        border-radius: 50px;
        font-family: 'Inter', sans-serif;
    }

    .Main-section-projects {
        position: absolute;
        width: 400px;
        height: 100%;
        margin-left: 75%;
        display: flex;
    }
</style>

<div class="Main">
    <section class="Main-section">
        <div class="Main-section-description">
            <h1>DAOVOTION</h1>
            <h3>Apoya el financiamiento del OSS y gana dinero en el Metaverso.</h3>
            <p>DAOVOTION es una plataforma de organizaciones decentralizadas (DAO), que gestiona el recaudo para proyectos de Software Libre (FOSS), mediante la venta de tierras ligadas al Metaverso Abierto: Las Meta Islas.</p>
            <a href="/governance/" use:link>Saber mas</a>
            <!-- <a href="/projects/" use:link>Explorar proyectos</a> -->
        </div>
        <div class="Main-section-projects">
            <Carrousel />
        </div>
    </section>
    <Interaction />
</div>