<script lang="ts">
	export let textColor: "white" | "black" = "white";
	export let location: "top" | "side" = "top";
</script>

<img
	src="logos/bird-on-{location}-{textColor}-text.svg"
	alt="logo on {location} with {textColor} text"
	{...$$props}
/>
