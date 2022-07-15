<script lang="ts">
	import Nav from "$lib/Nav.svelte";
	import Error from "$lib/Error.svelte";
</script>

<svelte:head>
	<link rel="icon" href="/logos/bird-on-top.svg" />
	<title>Freedom v2</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700;900&display=swap"
		rel="stylesheet"
	/>

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
