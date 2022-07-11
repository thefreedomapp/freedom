<script lang="ts">
	export let textColor: "white" | "black" = "white";
	export let birdLocation: "top" | "side" = "top";
</script>

<img
	src="logos/bird-on-{birdLocation}-{textColor}-text.svg"
	alt="logo on {birdLocation} with {textColor} text"
	{...$$props}
/>
