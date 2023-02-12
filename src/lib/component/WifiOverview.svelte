<script lang="ts">
	import type { WifiInfo } from "$lib/store/wifiList";
	import { createEventDispatcher } from "svelte";

	export let wifi: WifiInfo;

	const dispatch = createEventDispatcher();
</script>

<article class="bg-zinc-800 p-4 rounded-md border border-zinc-700 space-y-8">
	<div class="space-y-2">
		<h3 class="text-xl font-bold truncate w-40 sm:w-60 md:w-72">{wifi.ssid}</h3>
		<div class="font-mono text-xs text-zinc-300 flex gap-1">
			<p class="bg-zinc-700 rounded-full py-1 px-2 border border-zinc-600">
				Authentication: <strong>{wifi.encryption}</strong>
			</p>
			<p class="bg-zinc-700 rounded-full py-1 px-2 border border-zinc-600">
				Hidden: <strong>{wifi.hidden ? "Yes" : "No"}</strong>
			</p>
		</div>
	</div>
	<div class="flex justify-end gap-2">
		<button
			on:click={() => dispatch("showqrcode")}
			class="bg-zinc-700 rounded py-2 px-6 border border-zinc-600 hover:opacity-80 active:opacity-90 transition-all"
			>Open</button
		>
	</div>
</article>
