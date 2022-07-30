<script lang="ts">
	import type { FriendsResponse } from "$lib/common";
	import { onMount } from "svelte";

	let friends: FriendsResponse["friends"] = [];

	onMount(async () => {
		const response = await fetch("/api/user/friends");
		const data = (await response.json()) as FriendsResponse;
		friends = data.friends;
	});
</script>

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

<style lang="scss">
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
			background-color: white;
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
				color: black;
				font-size: 24px;
				margin-right: 25px;
			}
		}
	}
</style>
