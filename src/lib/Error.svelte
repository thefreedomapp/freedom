<script lang="ts">
	import { ErrorOutline } from "carbon-icons-svelte";
	import { error as errorStore } from "$lib/stores";

	let error: string | null;

	errorStore.subscribe((e) => (error = e));
</script>

{#if error != null}
	<div class="error">
		<ErrorOutline color="red" size={64} />
		<span>{error}</span>
	</div>
{/if}

<style lang="scss">
	.error {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
		min-width: 400px;
		max-width: 400px;
		align-self: center;
		justify-self: center;

		span {
			font-size: 28px;
			margin-left: 30px;
		}
	}
</style>
