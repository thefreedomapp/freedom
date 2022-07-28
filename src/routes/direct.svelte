<script lang="ts">
	import type { FriendsResponse } from "$lib/common";
	import { onMount } from "svelte";

	let friends: FriendsResponse["friends"] = [];

	let current: string;

	onMount(async () => {
		const response = await fetch("/api/user/friends");
		const data = await response.json();
		friends = data.friends;
		console.log(friends);
	});
</script>

<div class="dms">
	<div class="sidebar">
		{#each friends as friend}
			<div class="chat-user" on:click={() => current = friend.friend.username} data-username={friend.friend.username}>
				<!-- TODO(@TheBotlyNoob): add avatars -->
				<img src="temp/av.png" alt="avatar" />
				<span class="username">
					{friend.friend.username}
				</span>
			</div>
		{/each}
	</div>
	{#each friends as friend}
		<div class="chat {current !== friend.friend.username ? 'hidden' : ''}">
			<div class="messages">
				{#each friend.direct.messages as message}
					{console.log(message)}
					<!-- <span class="message">
						{message.message}
					</span> -->
				{/each}
			</div>

			<form action="/api/chat/{friend.direct._id}/messages" method="POST">
				<input type="text" name="message" />
				<input type="submit" value="Send" />
			</form>
		</div>
	{/each}
</div>

<style lang="scss">
	.dms {
		width: 100vw;
		height: calc(100vh - 110px);
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: row;

		.sidebar {
			border-right: 2px solid grey;
			width: 370px;
			height: calc(100vh - 135px);
			align-self: center;
			padding-left: 20px;
			padding-right: 20px;

			.chat-user {
				width: 300px;
				border-radius: 15px;
				height: 80px;
				transition: 300ms ease-in-out;
				padding: 10px;
				display: flex;
				align-items: center;
				flex-direction: row;
				gap: 15px;

				img {
					height: 70px;
					width: 70px;
				}

				.username {
					font-size: 24px;
				}

				&:hover {
					background: rgb(37, 37, 37);
				}
			}
		}

		.chat {
			display: flex;
			width: calc(100vw - 350px);
			flex-direction: row;
			gap: 25px;
		}
	}
	.hidden {
		display: none;
	}
</style>
