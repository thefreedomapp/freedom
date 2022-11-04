<script lang="ts">
	import Nav from "$lib/Nav.svelte"
	import Sidebar from "$lib/Sidebar.svelte"
	import { page } from '$app/stores';
	import { dev } from "$app/environment" // it is used, but TypeScript doesn't know that for some reason
	import Error from "$lib/tRPC/ClientError.svelte"

	import "$lib/fonts.css"

	export const prerender = true
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

{#if $page.routeId?.startsWith('/login')}
	<div class="accountsRoot">
		<Sidebar />
		<main class="accounts">
			<Error />
			<slot />
		</main>
	</div>
{:else if $page.routeId?.startsWith('/signup')}
	<div class="accountsRoot">
		<Sidebar />
		<main class="accounts">
			<Error />
			<slot />
		</main>
	</div>
{:else}
	<div class="root">
		<Nav />
		<main class="app">
			<Error />
			<slot />
		</main>
	</div>
{/if}

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
	div.accountsRoot {
		display: flex;
		flex-direction: row;
		align-items: center;
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
	main.accounts {
		width: calc(100vw - 650px);
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
	}
</style>
