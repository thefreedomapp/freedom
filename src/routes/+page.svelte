<script lang="ts">
	import { browser } from "$app/env";
	import Logo from "$lib/Logo.svelte";
	import tRPC from "$lib/tRPC/client";

	let logged_in: boolean;
	if (browser) tRPC!.query("users:loggedIn").then((res) => (logged_in = res));
</script>

<div class="container">
	<Logo birdLocation="side" width={500} margin={50} />

	{#if logged_in === false}
		<div class="buttons">
			<a class="btn" href="/signup">Sign Up</a>
			<a class="btn" href="/login">Login</a>
		</div>
	{:else if logged_in === true}
		<p>Logged In</p>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		justify-content: center;

		.buttons {
			display: flex;
			flex-direction: row;
			gap: 20px;

			.btn {
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
	}
</style>
