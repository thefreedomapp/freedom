<script lang="ts">
	import type { SerializedUser } from "$lib/common";
	import { onMount } from "svelte";

	let friends: SerializedUser[] = [];

	onMount(async () => {
		const response = await fetch("/api/user/friends");
		const data = await response.json();
		friends = data.friends;
		console.log(friends);
	});
</script>

<form action="/api/user/friends" method="POST">
	<input type="text" name="username" placeholder="username" />
	<input type="submit" value="Add" />
</form>

{#each friends as friend}
	<!-- TODO(@TheBotlyNoob): add avatars -->
	<img src="x" alt="avatar" />
	<div class="username">
		{friend.username}
	</div>
{/each}

<style lang="scss">
</style>
