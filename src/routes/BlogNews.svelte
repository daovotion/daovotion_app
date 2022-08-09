<script>
    import Router, {link} from "svelte-spa-router";
    import Loren from "../blog/lorenipsun3.md";
    import Second from "../blog/second.md";
    import Third from "../blog/third.md";
    import NotFound from "./NotFound.svelte";
    import NavLink from "../lib/NavLink.svelte";

    const prefix = "/blog";
    let route_set = {
        "/": Loren,
        "/loren": Loren,
        "/second": Second,
        "/third": Third,
        "*": NotFound
    };

</script>

<h1>Blog</h1>
  
<ul>
    <li><NavLink to="/blog/loren" >About</NavLink></li>
    <li><NavLink to="/blog/second">I did something awesome today</NavLink></li>
    <li><NavLink to="/blog/third">Did something sweet today</NavLink></li>
</ul>
<div>
    <Router routes={route_set} prefix={prefix} />
</div>