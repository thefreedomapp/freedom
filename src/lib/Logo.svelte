<script lang="ts">
	export let birdLocation: "top" | "side" = "top";
	export let text = true;
	export let margin: number;
	export const svgSize = text
		? birdLocation === "side"
			? { width: 240, height: 40 }
			: { width: 195, height: 80 }
		: { width: 50, height: 40 };

	// just to get better syntax highlighting and types
	const matrix = (...args: [number, number, number, number, number, number]) => {
		return `matrix(${args.join(",")})`;
	};
</script>

{#if margin}
<svg style="margin: {margin}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {svgSize.width} {svgSize.height}" {...$$props}>
	<style>
		text {
			fill: white;
			font-family: Fonarto, sans-serif;
		}
		#bird {
			fill: url(#bird-gradient);
		}
		#bird-gradient {
			transform: rotate(24deg);
		}
	</style>

	{#if text}
		<text
			transform={birdLocation === "side"
				? matrix(2.7, 0, 0, 2.7, 65, 37)
				: matrix(2.7, 0, 0, 2.7, 0, 75)}>Freedom</text
		>
	{/if}

	<defs>
		<linearGradient id="bird-gradient">
			<stop offset="0%" stop-color="#D418EA" stop-opacity="1" />
			<stop offset="100%" stop-color="#ECD062" stop-opacity="1" />
		</linearGradient>
	</defs>

	<path
		id="bird"
		transform={text
			? birdLocation === "side"
				? matrix(0.5, 0, 0, 0.5, 0, -5)
				: matrix(0.5, 0, 0, 0.5, 40, -5)
			: matrix(0.5, 0, 0, 0.5, 0, -5)}
		d="M39.155 48.586s-19.267-1.801-9.147-13.734C40.122 22.92 39.2 21.557 39.2 21.557s5.079-16.006 6.459-9.322c1.37 6.685 10.837 22.737 10.837 22.737s-.024 1.435 1.471.721c1.488-.718 2.962-.836 6.745-4.845 3.788-4.019 9.154-.985 9.154-.985s4.957-1.711 5.519-1.553c.563.159-3.903 2.538-4.42 3.304-.52.761-3.245 7.729-3.106 9.665.132 1.933-3.091 6.937-4.01 7.208 0 0 8.862 4.627 10.527 8.658 0 0 8.979 5.264 10.146 9.465 1.173 4.195 18.996 15.741 7.799 20.47-11.189 4.733-28.113-4.365-29.362-5.319-1.239-.957-15.848-8.874-20.825-9.516-4.971-.646-7.331-5.709-4.055-11.687 0 0-5.225-.037-6.126.468-.904.504-14.253 13.422-15.281 14.12-1.034.694-13.442 12.968-18.24 4.185C-2.371 70.54 9.17 67.275 9.17 67.275s19.249-8.296 22.304-11.073c3.053-2.776 7.681-7.616 7.681-7.616z"
	/>
</svg>
{:else}
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {svgSize.width} {svgSize.height}" {...$$props}>
	<style>
		text {
			fill: white;
			font-family: Fonarto, sans-serif;
		}
		#bird {
			fill: url(#bird-gradient);
		}
		#bird-gradient {
			transform: rotate(24deg);
		}
	</style>

	{#if text}
		<text
			transform={birdLocation === "side"
				? matrix(2.7, 0, 0, 2.7, 65, 37)
				: matrix(2.7, 0, 0, 2.7, 0, 75)}>Freedom</text
		>
	{/if}

	<defs>
		<linearGradient id="bird-gradient">
			<stop offset="0%" stop-color="#D418EA" stop-opacity="1" />
			<stop offset="100%" stop-color="#ECD062" stop-opacity="1" />
		</linearGradient>
	</defs>

	<path
		id="bird"
		transform={text
			? birdLocation === "side"
				? matrix(0.5, 0, 0, 0.5, 0, -5)
				: matrix(0.5, 0, 0, 0.5, 40, -5)
			: matrix(0.5, 0, 0, 0.5, 0, -5)}
		d="M39.155 48.586s-19.267-1.801-9.147-13.734C40.122 22.92 39.2 21.557 39.2 21.557s5.079-16.006 6.459-9.322c1.37 6.685 10.837 22.737 10.837 22.737s-.024 1.435 1.471.721c1.488-.718 2.962-.836 6.745-4.845 3.788-4.019 9.154-.985 9.154-.985s4.957-1.711 5.519-1.553c.563.159-3.903 2.538-4.42 3.304-.52.761-3.245 7.729-3.106 9.665.132 1.933-3.091 6.937-4.01 7.208 0 0 8.862 4.627 10.527 8.658 0 0 8.979 5.264 10.146 9.465 1.173 4.195 18.996 15.741 7.799 20.47-11.189 4.733-28.113-4.365-29.362-5.319-1.239-.957-15.848-8.874-20.825-9.516-4.971-.646-7.331-5.709-4.055-11.687 0 0-5.225-.037-6.126.468-.904.504-14.253 13.422-15.281 14.12-1.034.694-13.442 12.968-18.24 4.185C-2.371 70.54 9.17 67.275 9.17 67.275s19.249-8.296 22.304-11.073c3.053-2.776 7.681-7.616 7.681-7.616z"
	/>
</svg>
{/if}
