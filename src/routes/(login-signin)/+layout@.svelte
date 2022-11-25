<script lang="ts">
	import Logo from "$lib/Logo.svelte"
	// When changing this variable, make sure to change it below as well.
	const LOGO_WIDTH = "35vw"
</script>

<div class="container">
	<div class="sidebar">
		<a href="/"><Logo birdLocation="side" width={LOGO_WIDTH} text={true} /></a>
	</div>

	<div class="content">
		<div class="form-container">
			<slot />

			<style lang="scss">
				.form-container {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-family: "Josefin Sans", sans-serif;

					form {
						margin-top: 50px;
						display: flex;
						flex-direction: column;
						align-items: center;
						font-family: "Josefin Sans", sans-serif;
					}

					h1 {
						margin-top: 50px;
						font-size: 64px;
						font-family: "Josefin Sans", sans-serif;
					}

					input {
						margin-top: 15px;
						padding-left: 15px;
						width: 450px;
						height: 50px;
						font-size: 24px;
						border: none;
						border-radius: 15px;
						font-family: "Josefin Sans", sans-serif;
					}

					input[type="submit"] {
						width: 150px;
						padding: 0;
						font-size: 24px;
						background: #4169e1;
						height: 75px;
						font-family: "Josefin Sans", sans-serif;
						border-radius: 10px;
						border: none;
						color: white;
						text-decoration: none;
						cursor: pointer;
					}
				}
			</style>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		--sidebar-width: calc(/* change it here */ 35vw + 5vw);
		display: flex;
		flex-direction: row;
	}
	.content {
		width: calc(100vw - var(--sidebar-width));
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: white;
	}
	.sidebar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--sidebar-width);
		background-color: #1e1e1e;
		box-shadow: 10px -1px 15px 0px #1e1e1e7b;
		-webkit-box-shadow: 10px -1px 15px 0px #1e1e1e7b;
		-moz-box-shadow: 10px -1px 15px 0px #1e1e1e7b;
	}
</style>
