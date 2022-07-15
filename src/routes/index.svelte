<script lang="ts">
	import Logo from "$lib/Logo.svelte";
	import { onMount } from "svelte";

	let logged_in: boolean;
	onMount(() => {
		logged_in = document.cookie.includes("user=");
	});
</script>

<Logo birdLocation="side" width={600} />
<p class="motto">- Giving voice to the shunned.</p>

{#if logged_in}
	<div class="buttons">
		<a class="btn" href="/signup">Sign Up</a>
		<a class="btn" href="/login">Login</a>
	</div>
{:else}
	<h2>TODO: Logged in page.</h2>
{/if}

<style lang="scss">
	p.motto {
		font-size: 32px;
		margin-bottom: 60px;
		margin-left: 400px;
	}

	div.buttons {
		display: flex;
		flex-direction: row;
		gap: 20px;

		a.btn {
			width: 150px;
			font-size: 24px;
			background: #4169e1;
			height: 75px;
			border-radius: 10px;
			border: none;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
			text-decoration: none;
		}
	}
</style>
