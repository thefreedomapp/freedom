<script lang="ts">
	import Nav from "$lib/Nav.svelte";
	import { dev } from "$app/environment";
	import Error from "$lib/tRPC/ClientError.svelte";

	import "$lib/fonts.css";

	export const prerender = true;
</script>

<svelte:head>
	<title>Freedom v2</title>

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
	<script async src={dev ? "" : "https://arc.io/widget.min.js#iYGzLN9i"}></script>

	<!-- this looks very ugly with dark reader. -->
	<!-- and we're already in dark mode. -->
	<meta name="darkreader" />

	<style>
		* {
			margin: 0;
			padding: 0;
			/*font-family: Raleway, sans-serif;*/
			font-family: "Josefin Sans", sans-serif;
		}
	</style>
</svelte:head>

<div class="root">
	<Nav />

	<main class="app">
		<Error />
		<slot />
	</main>
</div>

<style>
	div.root {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 5px;
		width: 100vw;
		height: 100vh;
		background: #292929;
		overflow-x: hidden;
	}
	main.app {
		width: 100vw;
		height: calc(100vh - 110px);
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
	}
</style>
