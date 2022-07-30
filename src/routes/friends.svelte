<script lang="ts">
	import type { FriendsResponse } from "$lib/common";
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
<h2 class="notloggedin">You are not logged in!</h2>
{:else if logged_in === true}
<div class="container">
	<form action="/api/user/friends" method="POST">
		<input type="text" name="username" placeholder="username" />
		<input type="submit" value="Add" />
	</form>
	
	{#each friends as friend}
		<!-- TODO(@TheBotlyNoob): add avatars -->
		<!-- <img src="x" alt="avatar" /> -->
		<div class="friend">
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img class="av" src="./temp/av.png" alt="friend's image">
			<span class="username">{friend.friend.username}</span>
		</div>
	{/each}
</div>
{/if}

<style lang="scss">
	.notloggedin {
		font-size: 56px;
		margin-top: 50px;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 110px);
		width: 100vw;
		align-items: center;
		gap: 25px;

		form {
			margin: 30px;
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
