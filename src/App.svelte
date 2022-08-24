<script>
	import Router from 'svelte-spa-router'
	import Layaout from './Layaout.svelte';
	import Blog from './routes/Blog.svelte';
	import CreateProject from './routes/CreateProject.svelte';
	import Governance from './routes/Governance.svelte';
	import Help from './routes/Help.svelte';
	import Projects from './routes/Projects.svelte';

	const routes = {
		'/': Layaout,

		'/projects/': Projects,

		'/governance/': Governance,

		'/blog/': Blog,

		'/help/': Help,

		'/create_project/': CreateProject
	}
</script>

<Router {routes}/>

