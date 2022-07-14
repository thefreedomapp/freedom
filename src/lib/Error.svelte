<script lang="ts">
	import { onMount } from "svelte";

	export let error: string | undefined = undefined;
	if (error === undefined) {
		onMount(() => {
			window.location.search
				.substring(1)
				.split("&")
				.map((item) => {
					const [key, value] = item.split("=");
					if (key === "error") {
						error = decodeURI(value).replace(/^["'](.+(?=["']$))["']$/, "$1");
					}
				});
		});
	}
</script>

<p class="error">{error ?? ""}</p>

<!-- TODO(@mtgsquad): Create styles -->
<style lang="scss">
	.error {
		color: red;
		font-size: 32px;
		margin-top: 50px;
	}
</style>
