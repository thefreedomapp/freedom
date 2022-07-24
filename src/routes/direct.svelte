<script lang="ts">
	import type { FriendsResponse } from "$lib/common";
	import { onMount } from "svelte";

	let friends: FriendsResponse["friends"] = [];

	onMount(async () => {
		const response = await fetch("/api/user/friends");
		const data = await response.json();
		friends = data.friends;
	});
</script>

<div class="dms">
	<div class="sidebar">
		{#each friends as friend}
			<div class="chat-user">
				<!-- TODO(@TheBotlyNoob): add avatars -->
				<img src="x" alt="avatar" />
				<div class="username">
					{friend.friend.username}
				</div>
			</div>
		{/each}
	</div>
	<div>
		<span>test</span>
	</div>
</div>

<style lang="scss">
	.dms {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100vw;

		.sidebar {
			margin: 20px;
			height: 75vh;
			width: 300px;
			border: none;
			border-right: 2px solid gray;
			border-radius: 0px;
			padding: 10px;

			.chat-user {
				align-items: center;
				padding: 5px;
				width: 300px;
				height: 90px;
				display: flex;
				flex-direction: row;
				background: #292929;
				border: none;
				cursor: pointer;
				border-radius: 25px;
				gap: 15px;
				transition: 400ms ease-in-out;

				img {
					border-radius: 50px;
					height: 70px;
					width: 70px;
				}

				.username {
					color: white;
					font-size: 24px;
				}

				&:hover {
					background: #242424;
				}
			}

			// .hidden {
			// 	display: none;
			// }
		}
	}
</style>
