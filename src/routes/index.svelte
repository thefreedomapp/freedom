<script lang="ts">
	import Logo from "$lib/Logo.svelte";
	import { onMount } from "svelte";

	let logged_in: boolean;
	onMount(() => {
		logged_in = document.cookie.includes("user=");
	});
</script>

<div class="container">
	<Logo text="text" birdLocation="top" width={350} height={350} />
	<br>

{#if logged_in}
	<div class="buttons">
		<a class="btn" href="/signup">Sign Up</a>
		<a class="btn" href="/login">Login</a>
	</div>
{:else}
	<p>Logged In</p>
{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
	}
</style>
