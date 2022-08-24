<script>
    let IslaImg = "https://freepngimg.com/download/island/14-2-island-free-download-png.png";
    
    export let name;
    export let description;
    export let logo;
    export let url;
    export let score;
    export let funds;
    export let price;
</script>

<style>
    .Project {
        margin-top: 50px;
        width: 300px;
        height: 400px;
        font-size: 0.8rem;
        box-shadow: 0px 1px 20px 0px #66ff99;
        border-radius: 30px;
        text-align: center;
        padding: 30px;
        color: white;
    }

    .Project-info {
        text-align: center;
    }

    .Project-info-header {
        margin-top: 5%;
        margin-left: 10%;
        display: flex;
    }

    .Project-info-header h1 {
        margin-left: 10%;
        display: flex;
    }

    .Project-img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #66ff99;
    }

    .Project-description {
        word-wrap: break-word;
    }

    .Project-repository {
        color: #66ff99;
    }

    .Project-balance {
        margin-top: 10px;
        display: flex;
        justify-content: space-evenly;
    }

    .Project-balance h2 {
        margin-left: 20px;
    }

    .Project-prestige-icon {
        display: flex;
    }

    .fa-star {
        margin-top: 10px;
        color: gold;
        font-size: 30px;
    }

    .Project-funds-icon {
        display: flex;
    }

    .fa-coins {
        margin-top: 10px;
        color: gold;
        font-size: 30px;
    }

    .Project-land-icon {
        margin-left: 30%;
        display: flex;
    }

    .Project-land h3 {
        margin-top: 10px;
        margin-bottom: 0px;
    }

    .Project-land-icon {
        background-color: black;
    }

    .Project-land-icon h2 {
        margin-left: 30px;
        margin-top: 20px;
        display: flex;
    }

    .Project-land img {
        width: 60px;
        height: 60px;
    }

    .Project-land-button {
        margin-top: 10px;
        width: 100px;
        height: 50px;
        border: none;
        padding: 10px 15px;
        text-align: center;
        font-size: 1rem;
        background-color: black;
        border-radius: 50px;
        border: 2px solid #66ff99;
        color:#66ff99;
        font-family: 'Inter', sans-serif;
        font-weight: bold;
    }
</style>

<div class="Project" id="Project">
    <div>
        <div class="Project-info">
            <div class="Project-info-header">
                <img class="Project-img" src={logo} alt="Project img">
                <h1>{name}</h1>
            </div>
            <p class="Project-description">{description}</p>
            <a class="Project-repository" href="__blank">{url}</a>
        </div>
        <div class="Project-balance">
            <div class="Project-prestige-icon">
                <i class="fa-solid fa-star"></i>
                <h2>{score}</h2>
            </div>
            <div class="Project-funds-icon">
                <i class="fa-solid fa-coins"></i>
                <h2>${funds}</h2>
            </div>
        </div>
        <div class="Project-land">
            <h3>¡Apoya este proyecto!</h3>
            <div class="Project-land-icon">
                <img src={IslaImg} alt="Isla">
                <h2>{price}</h2>
            </div>
            <button class="Project-land-button">Comprar</button>
        </div>
    </div>
</div>