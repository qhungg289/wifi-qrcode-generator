<script lang="ts">
	import { deleteWifi, wifiList, type WifiInfo } from "$lib/store/wifiList";
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
	import { flip } from "svelte/animate";
	import Portal from "svelte-portal";

	let search = "";

	$: regex = new RegExp(`(${search})+`, "i");
	$: searchResults = $wifiList.filter((w) => regex.test(w.ssid));

	let selectedWifi: WifiInfo;
	let isQrPreviewShow = false;
	let isDeleteModalShow = false;

	const setSelectedWifi = (wifi: WifiInfo) => (selectedWifi = wifi);

	onMount(() => {
		const savedFromLocal = localStorage.getItem("wifiList");
		if (savedFromLocal) {
			$wifiList = JSON.parse(savedFromLocal);
		}
	});
</script>

<hgroup class="py-8 space-y-4">
	<h1 class="font-bold text-4xl">Search</h1>
</hgroup>

<div class="relative">
	<input
		type="text"
		bind:value={search}
		class="bg-zinc-800 rounded-full border border-zinc-700 w-full pl-12"
		placeholder="Search your saved wifi..."
	/>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-6 h-6 text-zinc-400 absolute top-2 left-4"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
		/>
	</svg>
</div>

{#if search}
	<div transition:fade|local class="grid md:grid-cols-2 gap-4 mt-4">
		{#each searchResults as wifi (wifi)}
			<article
				animate:flip={{ duration: 200 }}
				class="bg-zinc-800 p-4 rounded-md border border-zinc-700 space-y-8"
			>
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
						class="bg-rose-700/20 rounded py-2 px-6 border border-rose-600/20 text-rose-600 hover:opacity-80 active:opacity-90 transition-all"
						on:click={() => {
							setSelectedWifi(wifi);
							isDeleteModalShow = true;
						}}>Delete</button
					>
					<button
						on:click={() => {
							setSelectedWifi(wifi);
							isQrPreviewShow = true;
						}}
						class="bg-blue-700/20 rounded py-2 px-6 border border-blue-600/20 text-blue-300 hover:opacity-80 active:opacity-90 transition-all"
						>Show QR code</button
					>
				</div>
			</article>
		{/each}
	</div>
{/if}

{#if isQrPreviewShow}
	<Portal target="#modal-container">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="fixed inset-0 flex items-center justify-center bg-zinc-900/80"
			on:click={() => (isQrPreviewShow = false)}
			in:fade
			out:fade={{ delay: 100 }}
		>
			<div
				on:click|stopPropagation
				class="bg-zinc-800 rounded-md border border-zinc-700 p-4 flex flex-col items-center gap-8"
				in:fly={{ delay: 100, y: -500 }}
				out:fly={{ y: -500 }}
			>
				<div class="flex justify-end w-full">
					<button
						on:click={() => (isQrPreviewShow = false)}
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
				<img src={selectedWifi.dataURL} alt="qr code" class="max-w-[18rem] sm:max-w-xs rounded" />
				<p
					class="text-xl font-bold py-2 px-4 bg-zinc-700 border border-zinc-600 rounded-full truncate w-48 sm:w-60 md:w-72 text-center"
				>
					{selectedWifi.ssid}
				</p>
				<a
					download="wifi-qrcode.png"
					class="bg-blue-600 border border-blue-500 hover:opacity-80 active:opacity-90 rounded px-6 py-2 transition-all w-full text-center"
					role="button"
					href={selectedWifi.dataURL}>Download</a
				>
			</div>
		</div>
	</Portal>
{/if}

{#if isDeleteModalShow}
	<Portal target="#modal-container">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="fixed inset-0 flex items-center justify-center bg-zinc-900/80"
			on:click={() => (isDeleteModalShow = false)}
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
						on:click={() => (isDeleteModalShow = false)}
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
					on:click={() => {
						deleteWifi(selectedWifi);
						isDeleteModalShow = false;
					}}
					class="bg-rose-700 rounded py-2 px-6 border border-rose-600 hover:opacity-80 active:opacity-90 transition-all w-full"
					>Delete</button
				>
			</div>
		</div>
	</Portal>
{/if}
