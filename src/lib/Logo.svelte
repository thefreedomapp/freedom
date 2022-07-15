<script lang="ts">
	export let birdLocation: "top" | "side" = "top";
	export const svgSize =
		birdLocation === "top" ? { width: 195, height: 80 } : { width: 260, height: 50 };
</script>

<object data="logos/bird-on-{birdLocation}.svg" title="logo on the {birdLocation}" {...$$props} />
