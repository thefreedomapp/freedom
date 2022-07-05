<script lang="ts">
	export let textColor: "white" | "black" = "white";
	export let location: "top" | "side" = "top";
	export let width: number;
	export let height: number;
</script>

<img
	src="logos/bird-on-{location}-{textColor}-text.svg"
	alt="logo on {location} with {textColor} text"
	{width}
	{height}
/>
