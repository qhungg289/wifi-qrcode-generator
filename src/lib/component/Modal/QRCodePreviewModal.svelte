<script lang="ts">
	import Portal from "svelte-portal";
	import { fade, fly } from "svelte/transition";
	import { quartInOut } from "svelte/easing";
	import type { Wifi } from "$lib/store/wifiList";
	import { createEventDispatcher } from "svelte";

	export let selectedWifi: Wifi;
	export let disableDeleteAction = false;

	const dispatch = createEventDispatcher();
</script>

<Portal target="#modal-container">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="fixed inset-0 flex flex-col items-center justify-end bg-black/80 z-20"
		on:click={() => dispatch("clickoutside")}
		in:fade
		out:fade={{ delay: 100 }}
	>
		<div
			on:click|stopPropagation
			class="w-full bg-zinc-900/50 backdrop-blur-md border-t border-zinc-800 p-4 flex flex-col items-center gap-6"
			in:fly={{ delay: 100, y: 500, easing: quartInOut }}
			out:fly={{ y: 500, easing: quartInOut }}
		>
			<div class="flex items-center justify-between w-full">
				<button
					class="text-rose-600 hover:underline transition-all"
					class:invisible={disableDeleteAction}
					on:click={() => dispatch("delete")}>Delete</button
				>
				<div class="text-center">
					<p class="font-bold truncate w-40 sm:w-60 md:w-72">{selectedWifi.ssid}</p>
				</div>
				<button
					on:click={() => dispatch("close")}
					class="text-blue-500 hover:underline transition-all">Done</button
				>
			</div>

			<div class="flex flex-col items-center bg-zinc-800 border border-zinc-700">
				<img src={selectedWifi.dataURL} alt="qr code" class="max-w-[15rem] sm:max-w-xs" />
			</div>

			<a
				download={`${selectedWifi.ssid.replace(/\s/g, "").toLowerCase()}.png`}
				class="bg-blue-600 hover:opacity-80 active:opacity-90 px-6 py-2 transition-all w-full text-center"
				role="button"
				href={selectedWifi.dataURL}>Download</a
			>
		</div>
	</div>
</Portal>
