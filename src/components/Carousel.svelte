<script>
    import Project from "./Project.svelte";
    import { projects } from "../store/Projects";
</script>

<style>    
    @keyframes display {
        0% {
        transform: translateX(150px);
        opacity: 0;
        }
        10% {
        transform: translateX(0);
        opacity: 1;
        }
        20% {
        transform: translateX(0);
        opacity: 1;
        }
        30% {
        transform: translateX(-100px);
        opacity: 0;
        }
        50% {
        transform: translateX(-100px);
        opacity: 0;
        }
        100% {
        transform: translateX(-50px);
        opacity: 0;
        }
    }
    
    .Carousel {
        position: relative;
    }
    
    .Carousel > div {
        position: absolute;
        top: 0;
        left: calc(50% - 100px);
        opacity: 0;
        animation: display 20s infinite;
    }
    
    div:nth-child(2) {
    animation-delay: 4s;
    }

    div:nth-child(3) {
    animation-delay: 8s;
    }

    div:nth-child(4) {
    animation-delay: 12s;
    }

    div:nth-child(5) {
    animation-delay: 16s;
    }
</style>

<div class="Carousel">
    <div>
        <Project {...projects[0]}/>
    </div>
    <div>
        <Project {...projects[1]}/>
    </div>    
    <div>
        <Project {...projects[2]}/>
    </div>
    <div>
        <Project {...projects[3]}/>
    </div>
    <div>
        <Project {...projects[4]}/>
    </div>
</div>