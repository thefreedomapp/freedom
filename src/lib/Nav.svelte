<script lang="ts">
	import Logo from "$lib/Logo.svelte";
	import Settings from "carbon-icons-svelte/lib/Settings.svelte";
	import Menu from "carbon-icons-svelte/lib/Menu.svelte";
	let showMobileNav: Boolean;

	function goToPage(page: String) {
		if(page === "direct") {
			window.location.href = '/direct'
		}

		if(page === "causes") {
			window.location.href = '/causes'
		}

		if(page === "donate") {
			window.location.href = '/donations'
		}

		if(page === "settings") {
			window.location.href = '/settings'
		}
	}
</script>

<nav class="nav">
	<!-- Logo -->
	<div class="logo-container">
		<a href="/"><Logo birdLocation="side" textColor="white" width={270} height={400} /></a>
	</div>

	<!-- Links -->
	<div class="navlinks">
		<button on:click={()=> goToPage('direct')} class="navlink">Direct</button>
		<button on:click={()=> goToPage('causes')} class="navlink">Causes</button>
		<button on:click={()=> goToPage('donate')} class="navlink">Donate</button>
		<button on:click={()=> goToPage('settings')} class="settings">
			<Settings size={32} />
		</button>
		<!-- Mobile Nav Button -->
		<button on:click={()=> showMobileNav = true} class="mobileNav">
			<Menu size={32} />
		</button>
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
