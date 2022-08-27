<script lang="ts">
	import type { FriendsResponse } from "$lib/common";
	import NotLoggedIn from "$lib/NotLoggedIn.svelte";
	import { onMount } from "svelte";

	let friends: FriendsResponse["friends"] = [];

	let logged_in: boolean;

	onMount(async () => {
		const response = await fetch("/api/user/friends");
		const data = (await response.json()) as FriendsResponse;
		friends = data.friends;

		logged_in = document.cookie.includes("user=");
	});
</script>

{#if logged_in === false}
	<NotLoggedIn />
{:else if logged_in === true}
	<div class="container">
		<form action="/api/user/friends" method="POST">
			<input type="text" placeholder="Username" />
			<input type="submit" value="Add" />
		</form>

		{#each friends as friend}
			<!-- TODO(@TheBotlyNoob): add avatars -->
			<!-- <img src="x" alt="avatar" /> -->
			<div class="friend">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img class="av" src="./temp/av.png" alt="friend's image" />
				<span class="username">{friend.friend.username}</span>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 110px);
		width: 100vw;
		align-items: center;
		gap: 25px;

		form {
			margin-top: 30px;
			margin-bottom: 10px;
			display: inline-flex;
			align-items: center;
			gap: 10px;

			input[type="text"] {
				width: 390px;
				height: 50px;
				border-radius: 100px;
				font-size: 20px;
				padding-left: 15px;
				border: none;
				outline: none;
				box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				-webkit-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				-moz-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
			}

			input[type="submit"] {
				width: 50px;
				height: 50px;
				background: blue;
				border: none;
				color: white;
				border-radius: 100px;
				cursor: pointer;
				box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				-webkit-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
				-moz-box-shadow: 1px 2px 5px 0px rgba(22, 22, 22, 0.5);
			}
		}

		.friend {
			min-width: 450px;
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
	}
</style>
