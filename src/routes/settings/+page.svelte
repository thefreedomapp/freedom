<script lang="ts">
	import NotLoggedIn from "$lib/NotLoggedIn.svelte";
	import { onMount } from "svelte";
	import Locked from "carbon-icons-svelte/lib/Locked.svelte";
	import ChevronRight from "carbon-icons-svelte/lib/ChevronRight.svelte";
	import Err from "$lib/Err.svelte";
	import { Logout } from "carbon-icons-svelte";

	let logged_in: boolean;
	let tab: string;

	function logOut(rootCookie: string, apiCookie: string) {
		// @ts-ignore
		document.cookie(first, null, { path: "/" });
		// @ts-ignore
		document.cookie(apiCookie, null, { path: "/api" });
		window.location.reload();
	}

	function redirect(path: string) {
		window.location.href = path;
	}

	onMount(async () => {
		logged_in = document.cookie.includes("user=");
	});
</script>

{#if logged_in === false}
	<NotLoggedIn />
{:else if logged_in === true}
	<div class="settings">
		<!-- TODO(@TheBotlyNoob): add avatars -->
		<div class="sidebar">
			<div class="user">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img class="av" src="./temp/av.png" alt="friend's image" />
				<!-- TODO(@TheBotlyNoob): dynamic username -->
				<span class="username">molai.dev</span>
			</div>
			<div on:click={() => (tab = "security")} class="security">
				<div class="label">
					<Locked size={32} />
					<span>Account Security</span>
				</div>
				<div class="arrow">
					<ChevronRight size={32} />
				</div>
			</div>
			<div
				on:click={() => {
					logOut("user", "token");
				}}
				class="logout"
			>
				<div class="label">
					<span>Log Out</span>
				</div>
				<div class="arrow">
					<Logout size={24} />
				</div>
			</div>
		</div>
		<div class="openTab">
			{#if tab === "security"}
				<div class="securityTab">
					<h1 class="title">Account Security</h1>
					<!-- TODO(@mtgsquad): Settings Page Security Tab -->
					<div class="twofa">
						<input type="checkbox" class="checkbox" />
						<label for="switch" class="toggle" />
						<span class="togglelabel"> Enable 2FA </span>
					</div>
				</div>
			{:else}
				<div class="nothing">
					<span>Please select from the sidebar on the left.</span>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.nothing {
		width: calc(100vw - 500px);
		height: calc(100vh - 110px);
		display: flex;
		align-items: center;
		justify-content: center;

		span {
			font-size: 44px;
			font-weight: 700;
		}
	}

	.settings {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		height: calc(100vh - 110px);
		width: 100vw;

		.sidebar {
			margin-top: 10px;
			border-right: 2px solid grey;
			width: 400px;
			height: calc(100vh - 135px);
			padding-left: 20px;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			.user {
				cursor: pointer;
				margin-top: 15px;
				margin-bottom: 15px;
				max-width: 350px;
				width: 350px;
				height: 75px;
				border-radius: 25px;
				background-color: #434343;
				box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				-webkit-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				-moz-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				padding: 15px;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.av {
					height: 75px;
					width: 75px;
				}

				.username {
					color: rgb(255, 255, 255);
					font-size: 28px;
					margin-right: 25px;
				}
			}

			.security {
				cursor: pointer;
				margin-bottom: 15px;
				max-width: 350px;
				width: 350px;
				height: 45px;
				border-radius: 25px;
				background-color: #434343;
				box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				-webkit-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				-moz-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				padding: 15px;
				display: inline-flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;

				.label {
					display: flex;
					gap: 10px;
					flex-direction: row;
					align-items: center;
					justify-content: space-evenly;

					span {
						font-size: 24px;
					}
				}

				.arrow {
					display: flex;
					flex-direction: row;
					align-items: center;
					min-height: 45px;
					min-width: 45px;
					border-radius: 25px;
					transition: 600ms ease-in-out;
					justify-content: center;
				}

				&:hover {
					.arrow {
						background: #292929;
					}
				}
			}

			.logout {
				cursor: pointer;
				margin-bottom: 15px;
				max-width: 350px;
				width: 350px;
				height: 45px;
				border-radius: 25px;
				background-color: #434343;
				box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				-webkit-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				-moz-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				padding: 15px;
				display: inline-flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				justify-self: flex-end;

				.label {
					display: flex;
					gap: 10px;
					flex-direction: row;
					align-items: center;
					justify-content: space-evenly;

					span {
						font-size: 24px;
					}
				}

				.arrow {
					display: flex;
					flex-direction: row;
					align-items: center;
					min-height: 45px;
					min-width: 45px;
					border-radius: 25px;
					transition: 600ms ease-in-out;
					justify-content: center;
				}

				&:hover {
					.arrow {
						background: #292929;
					}
				}
			}
		}
	}

	.securityTab {
		width: calc(100vw - 500px);
		height: calc(100vh - 160px);
		flex-direction: column;
		display: flex;
		gap: 25px;
		padding: 25px;

		h1 {
			font-size: 52px;
		}

		.twofa {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-evenly;
			width: 250px;

			.togglelabel {
				font-size: 24px;
			}

			.toggle {
				position: relative;
				display: inline-block;
				width: 80px;
				height: 40px;
				background-color: #292929;
				border-radius: 30px;
				border: 2px solid gray;
				transition: 600ms ease-in-out;
			}

			/* After slide changes */
			.toggle:after {
				content: "";
				position: absolute;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background-color: #ffffff;
				top: 0px;
				left: -1px;
				transition: all 0.5s;
			}

			/* Checkbox checked effect */
			.checkbox:checked + .toggle::after {
				left: 40px;
			}

			/* Checkbox checked toggle label bg color */
			.checkbox:checked + .toggle {
				background-color: #525252;
			}

			/* Checkbox vanished */
			.checkbox {
				display: none;
			}
		}
	}
</style>
