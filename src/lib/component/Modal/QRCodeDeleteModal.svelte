<script lang="ts">
	import Portal from "svelte-portal";
	import { fade, scale } from "svelte/transition";
	import type { WifiInfo } from "$lib/store/wifiList";
	import { createEventDispatcher } from "svelte";
	import { quartInOut } from "svelte/easing";

	export let selectedWifi: WifiInfo;

	const dispatch = createEventDispatcher();
</script>

<Portal target="#modal-container">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="fixed inset-0 flex items-center justify-center bg-black/80 z-20"
		on:click={() => dispatch("clickoutside")}
		in:fade
		out:fade={{ delay: 100 }}
	>
		<div
			on:click|stopPropagation
			class="bg-zinc-900 border border-zinc-800 flex flex-col items-center"
			in:scale={{ delay: 100, easing: quartInOut }}
			out:scale={{ easing: quartInOut }}
		>
			<div class="p-8 text-center">
				<p class="text-lg truncate w-52 sm:w-60 md:w-72">
					Delete <span class="font-bold">{selectedWifi.ssid}</span>?
				</p>
			</div>

			<div class="flex w-full">
				<button
					class="py-2 px-6 border-t border-r border-zinc-800 hover:opacity-80 active:opacity-90 transition-opacity w-full"
					on:click={() => dispatch("close")}>Cancel</button
				>
				<button
					on:click={() => dispatch("delete")}
					class="py-2 px-6 text-rose-600 border-t border-l border-zinc-800 hover:opacity-80 active:opacity-90 transition-opacity w-full"
					>Delete</button
				>
			</div>
		</div>
	</div>
</Portal>
