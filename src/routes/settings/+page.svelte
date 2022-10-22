<script lang="ts">
	import type { PageData } from "./$types"
	import { Logout, ChevronRight, Locked, Settings } from "carbon-icons-svelte"

	let tab: "security" | "general";

	export let data: PageData;
	console.log('acc')
	console.log(data.account)
</script>

{#if !data.logged_in}
	<p class="nouser">Not logged in.</p>
{:else if data.logged_in === true}
	<div class="settings">
		<!-- TODO(@TheBotlyNoob): add avatars -->
		<div class="sidebar">
			<div class="top">
				<div class="user">
					<!-- TODO(@TheBotlyNoob): dynamic avatars -->
					<img class="av" src="./temp/av.png" alt="friend" />
					<!-- Dynamic Username + Email Display ✔️ -->
					<div class="text">
						<span class="username">{data.account.username}</span>
						<span class="email">{data.account.email}</span>
					</div>
				</div>
				<div on:click={() => (tab = "general")} class="item">
					<div class="label">
						<Settings size={32} />
						<span>General Settings</span>
					</div>
					<div class="arrow">
						<ChevronRight size={32} />
					</div>
				</div>
				<div on:click={() => (tab = "security")} class="item">
					<div class="label">
						<Locked size={32} />
						<span>Account Security</span>
					</div>
					<div class="arrow">
						<ChevronRight size={32} />
					</div>
				</div>
			</div>
			<div on:click={() => alert("Not Implemented (logout)")} class="item">
				<div class="label">
					<Logout size={24} />
					<span>Log Out</span>
				</div>
				<div class="arrow">
					<ChevronRight size={32} />
				</div>
			</div>
		</div>
		<div class="openTab">
			{#if tab === "security"}
				<div class="tab">
					<h1 class="title">Account Security</h1>
					<!-- TODO(@mtgsquad): Settings Page Security Tab -->
					<div class="option">
						<input type="checkbox" class="checkbox" />
						<label for="switch" class="toggle" />
						<span class="togglelabel"> Enable 2FA </span>
					</div>
				</div>
			{:else if tab === "general"}
			<div class="tab">
				<h1 class="title">General Settings</h1>
				<!-- TODO(@mtgsquad): Settings Page Security Tab -->
				<div class="option">
					<input type="checkbox" class="checkbox" />
					<label for="switch" class="toggle" />
					<span class="togglelabel"> Developer Mode </span>
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
	.nouser {
		font-size: 50px;
		font-weight: 700;
		margin-top: 75px;
	}

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
			justify-content: space-between;

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

				.text {
					display: flex;
					flex-direction: column;
					gap: 5px;
					align-items: center;
					justify-content: center;

					.username {
						color: rgb(255, 255, 255);
						font-size: 32px;
						margin-right: 25px;
						font-weight: bold;
					}

					.email {
						color: rgb(255, 255, 255);
						font-size: 18px;
						margin-right: 25px;
					}
				}
			}

			.item {
				cursor: pointer;
				margin-bottom: 15px;
				max-width: 350px;
				width: 350px;
				height: 40px;
				vertical-align: center !important;
				text-align: center;
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

	.tab {
		width: calc(100vw - 500px);
		height: calc(100vh - 160px);
		flex-direction: column;
		display: flex;
		gap: 25px;
		padding: 25px;

		h1 {
			font-size: 52px;
		}

		.option {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-evenly;
			width: auto;
			max-width: 325px;
			text-align: center;

			.togglelabel {
				font-size: 26px;
				font-weight: bold;
				vertical-align: center;
				text-align: center;
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
