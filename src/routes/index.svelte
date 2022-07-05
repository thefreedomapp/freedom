<script>
	import Logo from "$lib/Logo.svelte";
</script>

<Logo width={428} height={428} />

<div class="buttons">
	<button class="headerBtn">Sign Up</button>
	<button class="headerBtn">Login</button>
</div>

<style lang="scss">
	.buttons {
		display: flex;
		flex-direction: row;
		gap: 20px;

		.headerBtn {
			width: 150px;
			font-size: 24px;
			background: #4169e1;
			height: 75px;
			border-radius: 10px;
			border: none;
			color: white;
		}
	}
</style>
