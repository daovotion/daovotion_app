<script>
    import {link} from "svelte-spa-router";
    import active from 'svelte-spa-router/active'
  
    export let to = "";

    export let match = null;

    export let activeClass = null;

    export let inactiveClass = null;

    if(match === null)
    {
      match = to;
    }

    let param_match_set = {path:match};

    if(activeClass !== null)
    {
      param_match_set["className"] = activeClass;
    }

    if(inactiveClass !== null)
    {
      param_match_set["inactiveClassName"] = inactiveClass;
    }  
    
  </script>
  <a href="{to}" use:link use:active={param_match_set}><slot/></a>
  