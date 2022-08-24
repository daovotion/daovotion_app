<script>
    import {link} from 'svelte-spa-router';
    
    let DaovotionLogo = "https://nebairevelations.com/wp-content/uploads/2021/08/penrose_triangle_web.svg";
</script>

<style>
    .Logo {
        margin-left: 150px;
    }

    .Logo-img {
        width: 70px;
        height: 70px;
    }
</style>

<div class="Logo">
    <a a href="/" use:link>
        <img class="Logo-img" src={DaovotionLogo} alt="Daovotion Logo">
    </a>
</div>