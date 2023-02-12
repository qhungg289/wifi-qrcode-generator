<script lang="ts">
	import Portal from "svelte-portal";
	import { fade, fly } from "svelte/transition";
	import type { WifiInfo } from "$lib/store/wifiList";
	import { createEventDispatcher } from "svelte";

	export let selectedWifi: WifiInfo;

	const dispatch = createEventDispatcher();
</script>

<Portal target="#modal-container">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="fixed inset-0 flex flex-col items-center justify-end bg-zinc-900/80 z-20"
		on:click={() => dispatch("clickoutside")}
		in:fade
		out:fade={{ delay: 100 }}
	>
		<div
			on:click|stopPropagation
			class="w-full bg-zinc-800 rounded-tl-3xl rounded-tr-3xl border border-zinc-700 p-4 flex flex-col items-center gap-6"
			in:fly={{ delay: 100, y: 500 }}
			out:fly={{ y: 500 }}
		>
			<div class="flex justify-between w-full">
				<button
					class="p-2 rounded text-rose-500 hover:bg-zinc-700 transition-all"
					on:click={() => dispatch("delete")}>Delete</button
				>
				<button
					on:click={() => dispatch("close")}
					class="p-2 rounded text-blue-500 hover:bg-zinc-700 transition-all">Done</button
				>
			</div>

			<div class="flex flex-col items-center bg-zinc-700 border border-zinc-600 rounded">
				<img src={selectedWifi.dataURL} alt="qr code" class="max-w-[15rem] sm:max-w-xs rounded" />
				<p class="py-2 truncate w-48 sm:w-60 md:w-72 text-center">
					{selectedWifi.ssid}
				</p>
			</div>

			<a
				download={`${selectedWifi.ssid.replace(/\s/g, "").toLowerCase()}.png`}
				class="bg-blue-600 border border-blue-500 hover:opacity-80 active:opacity-90 rounded px-6 py-2 transition-all w-full text-center"
				role="button"
				href={selectedWifi.dataURL}>Download</a
			>

			<!-- <button
					class="bg-rose-700 rounded py-2 px-6 border border-rose-600 hover:opacity-80 active:opacity-90 transition-all w-full text-center"
					on:click={() => dispatch("delete")}>Delete</button
				> -->
		</div>
	</div>
</Portal>
