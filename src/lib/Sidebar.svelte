<script lang="ts">
	import Logo from "$lib/Logo.svelte"
</script>

<div class="sidebar">
	<a href="/"><Logo birdLocation="side" width={500} text={true} margin={0} /></a>
</div>

<style lang="scss">
	.sidebar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 650px;
		height: 100vh;
		background-color: #1e1e1e;
		box-shadow: 10px -1px 15px 0px #1e1e1e7b;
		-webkit-box-shadow: 10px -1px 15px 0px #1e1e1e7b;
		-moz-box-shadow: 10px -1px 15px 0px #1e1e1e7b;
	}
</style>
