<script lang="ts">
	import Nav from "$lib/Nav.svelte";
	import { dev } from "$app/env";

	import "$lib/fonts.css";
</script>

<svelte:head>
	<title>Freedom v2</title>

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<script async src={dev ? "" : "https://arc.io/widget.min.js#iYGzLN9i"}></script>

	<!-- this looks very ugly with dark reader. -->
	<!-- and we're already in dark mode. -->
	<meta name="darkreader" />

	<style>
		* {
			margin: 0;
			padding: 0;
			font-family: Raleway, sans-serif;
		}
	</style>
</svelte:head>

<div class="root">
	<Nav />

	<main class="app">
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
	}
	main.app {
		margin-top: 70px;
		width: 100vw;
		height: calc(100vh - 110px);
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white;
	}
</style>
