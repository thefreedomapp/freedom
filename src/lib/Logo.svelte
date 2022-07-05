<script lang="ts">
	export let textColor: "white" | "black" = "white";
	export let location: "top" | "side" = "top";
	export let width: number;
	export let height: number;
</script>

<object
	type="image/svg+xml"
	data="logos/bird-on-{location}-{textColor}-text.svg"
	title="logo on {location} with {textColor} text"
	{width}
	{height}
/>
