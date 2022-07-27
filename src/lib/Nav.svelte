<script lang="ts">
	import Logo from "$lib/Logo.svelte";
	import Settings from "carbon-icons-svelte/lib/Settings.svelte";
	import Menu from "carbon-icons-svelte/lib/Menu.svelte";
	let showMobileNav: boolean;
</script>

<nav class="nav">
	<!-- Logo -->
	<div class="logo-container">
		<a href="/"><Logo birdLocation="side" width={100} text={false} /></a>
	</div>

	<!-- Links -->
	<div class="navlinks">
		<a href="/direct" class="navlink">Direct</a>
		<a href="#404" class="navlink">Causes</a>
		<a href="#404" class="navlink">Donate</a>
		<a href="#404" class="settings">
			<Settings size={32} />
		</a>
		<!-- Mobile Nav Button -->
		<button on:click={() => (showMobileNav = true)} class="mobileNav">
			<Menu size={32} />
		</button>
	</div>
</nav>

<style lang="scss">
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

			.navlink {
				cursor: pointer;
				background: #434343;
				border: none;
				width: 140px;
				height: 55px;
				color: white;
				font-size: 30px;
				border-radius: 30px;
				transition: 400ms ease-in-out;
				text-decoration: none;
				display: flex;
				align-items: center;
				justify-content: center;

				&:hover {
					background: #3a3a3a;
				}
			}

			.mobileNav {
				display: none;
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

			@media (max-width: 950px) {
				.mobileNav {
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
				}

				.navlink {
					display: none;
				}

				.settings {
					display: none;
				}
			}
		}
	}
</style>
