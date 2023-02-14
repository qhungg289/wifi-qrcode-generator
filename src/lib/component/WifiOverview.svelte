<script lang="ts">
	import type { WifiInfo } from "$lib/store/wifiList";
	import { createEventDispatcher } from "svelte";

	export let wifi: WifiInfo;

	const dispatch = createEventDispatcher();
</script>

<article
	on:click={() => dispatch("showqrcode")}
	on:keydown={() => dispatch("showqrcode")}
	class="bg-zinc-900 p-4 border-y border-zinc-800 space-y-8 flex items-center justify-between cursor-pointer"
>
	<div class="space-y-2">
		<h3 class="truncate w-40 sm:w-60 md:w-72">{wifi.ssid}</h3>
		<div class="font-mono text-xs text-zinc-300 flex gap-1">
			<p class="bg-zinc-800 py-1 px-2">
				Authentication: {wifi.encryption}
			</p>
			<p class="bg-zinc-800 py-1 px-2">
				Hidden: {wifi.hidden ? "Yes" : "No"}
			</p>
		</div>
	</div>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-6 h-6 text-zinc-400"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
	</svg>
</article>
