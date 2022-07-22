<script lang="ts">
	import Logo from "$lib/Logo.svelte";
	import { onMount } from "svelte";

	let logged_in: boolean;
	onMount(() => (logged_in = document.cookie.includes("user=")));
</script>

<div class="container">
	<Logo birdLocation="top" width={350} />
	<br />

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
		align-items: flex-start;
		gap: 10px;

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
