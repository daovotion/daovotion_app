<script>
    import {link} from 'svelte-spa-router';
</script>

<style>
    .Interaction {
        margin-top: 40%;
        width: 100%;
        display: inline-flex;
        justify-content: center;
        color: white;
    }

    .Interaction div {
        width: 350px;
        height: 350px;
        border: 1px solid #66ff99;
        border-radius: 10px;
        padding: 10px;
        text-align: center;
        margin: 0% 5%;
    }

    .Interaction a {
        text-decoration: none;
        height: auto;
        height: 50px;
        border: none;
        padding: 10px 15px;
        text-align: center;
        font: bold;
        font-size: 1rem;
        background-color: #66ff99;
        border-radius: 50px;
        color: black;
        font-family: 'Inter', sans-serif;
        font-weight: bold;
        margin-bottom: 10%;
    }
</style>

<div class="Interaction">
    <div class="Interaction-support-project">
        <h2>¡Se pionero!</h2>
        <h3>Adquiere planetas al mejor precio</h3>
        <p>Apoyando proyectos novedosos tendrás la oportunidad de ganar comisiones por la futura venta tus MetaIslas.</p>
        <a href="/projects/" use:link>Explorar proyectos</a>
    </div>
    <div class="Interaction-create-project">
        <h2>Crea tu proyecto</h2>
        <h3>¡Nace una Estrella! <br> Se fundador de tu sistema planetario</h3>
        <p>Desarrollas Software Libre? Creas contenido digital? Crea comunidad con el impacto de tu idea creativa.</p>
        <a a href="/create_project/" use:link>Crear proyecto</a>
    </div>
</div>