<script lang="ts">
	export let birdLocation: "top" | "side" = "top";
	export let text: "text" | "notext" = "text";
	export const svgSize =
		birdLocation === "top" ? { width: 195, height: 80 } : { width: 173, height: 33 };
</script>

<object data="logos/bird-on-{birdLocation}-{text}.svg" title="logo on the {birdLocation}" {...$$props} />
