<script>
	import Logo from "$lib/Logo.svelte";
	import Settings from "carbon-icons-svelte/lib/Settings.svelte";
</script>

<nav class="nav">
	<!-- Logo -->
	<div class="logo-container">
		<a href="/"><Logo birdLocation="side" textColor="white" width={270} height={400} /></a>
	</div>

	<!-- Links -->
	<div class="navlinks">
		<button class="navlink">Direct</button>
		<button class="navlink">Causes</button>
		<button class="navlink">Petitions</button>
		<button class="settings">
			<Settings size={32} />
		</button>
		<!-- Mobile Nav Button -->
	</div>
</nav>

<style lang="scss">
	@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;700;900&display=swap");

	.nav {
		background: #434343;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100vw;
		height: 110px;
		box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.5);
		-webkit-box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.5);
		-moz-box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.5);

		.logo-container {
			margin-left: 40px;
		}

		.navlinks {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			margin-right: 40px;
			gap: 20px;

			button.navlink {
				cursor: pointer;
				background: #434343;
				border: none;
				width: 140px;
				height: 55px;
				color: white;
				font-size: 30px;
				border-radius: 30px;
				transition: 400ms ease-in-out;

				&:hover {
					background: #3a3a3a;
				}
			}

			.settings {
				cursor: pointer;
				background: #434343;
				border: none;
				border-radius: 30px;
				color: white;
				font-size: 30px;
				transition: 400ms ease-in-out;
				width: 50px;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: center;

				&:hover {
					background: #3a3a3a;
					transform: rotateZ(15deg);
				}
			}
		}
	}

	@media (max-width: 950px) {
	}
</style>
