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
		class="fixed inset-0 flex items-center justify-center bg-zinc-900/80 z-20"
		on:click={() => dispatch("clickoutside")}
		in:fade
		out:fade={{ delay: 100 }}
	>
		<div
			on:click|stopPropagation
			class="bg-zinc-800 rounded-md border border-zinc-700 p-4 flex flex-col items-center gap-8"
			in:fly={{ delay: 100, y: -500 }}
			out:fly={{ y: -500 }}
		>
			<div class="flex items-center gap-8">
				<p class="text-lg truncate w-48 sm:w-60 md:w-72">
					Delete <span class="font-bold">{selectedWifi.ssid}</span>?
				</p>

				<button
					on:click={() => dispatch("close")}
					class="p-2 rounded hover:bg-zinc-700 transition-all"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<button
				on:click={() => dispatch("delete")}
				class="bg-rose-700 rounded py-2 px-6 border border-rose-600 hover:opacity-80 active:opacity-90 transition-all w-full"
				>Delete</button
			>
		</div>
	</div>
</Portal>
