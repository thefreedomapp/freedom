<script>
	import Logo from "$lib/Logo.svelte";
</script>

<Logo width={428} height={428} />

<div class="buttons">
	<a class="btn" href="/signup">Sign Up</a>
	<a class="btn" href="/login">Login</a>
</div>

<style lang="scss">
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
		}
	}
</style>
