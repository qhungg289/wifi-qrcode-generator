<script lang="ts">
	import { deleteWifi, wifiList, type Wifi } from "$lib/store/wifiList";
	import { fade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import Heading from "$lib/component/Typography/Heading.svelte";
	import WifiOverview from "$lib/component/WifiOverview.svelte";
	import QrCodePreviewModal from "$lib/component/Modal/QRCodePreviewModal.svelte";
	import QrCodeDeleteModal from "$lib/component/Modal/QRCodeDeleteModal.svelte";

	let search = "";

	$: regex = new RegExp(`(${search})+`, "i");
	$: searchResults = $wifiList.filter((w) => regex.test(w.ssid));

	const clearSearch = () => (search = "");

	let selectedWifi: Wifi;
	let isQrPreviewShow = false;
	let isQrDeleteShow = false;

	const setSelectedWifi = (wifi: Wifi) => (selectedWifi = wifi);
</script>

<svelte:head>
	<title>Search | Wifi2QR</title>
</svelte:head>

<Heading heading="Search" />

<div class="relative">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-5 h-5 text-zinc-400 absolute top-3 left-4"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
		/>
	</svg>
	<div class="border-y border-zinc-800">
		<input
			type="text"
			bind:value={search}
			class="bg-zinc-900 border-x-0 border-y-2 border-transparent focus:ring-0 focus:border-b-blue-500 focus:border-t-transparent w-full pl-12"
			placeholder="Search your saved wifi..."
		/>
	</div>
	{#if search}
		<button
			transition:fade|local
			on:click={clearSearch}
			class="absolute top-3 right-4 text-zinc-300"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-5 h-5"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	{/if}
</div>

{#if search && searchResults.length !== 0}
	<div transition:fade|local class="grid">
		{#each searchResults as wifi (wifi)}
			<div animate:flip={{ duration: 200 }}>
				<WifiOverview
					{wifi}
					on:showqrcode={() => {
						setSelectedWifi(wifi);
						isQrPreviewShow = true;
					}}
				/>
			</div>
		{/each}
	</div>
{:else}
	<div
		in:fade|local={{ delay: 500 }}
		class="text-zinc-700 flex flex-col items-center gap-2 pt-28 select-none"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-32 h-32"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
			/>
		</svg>
		<p class="text-2xl">No results found</p>
	</div>
{/if}

{#if isQrPreviewShow}
	<QrCodePreviewModal
		{selectedWifi}
		on:clickoutside={() => (isQrPreviewShow = false)}
		on:close={() => (isQrPreviewShow = false)}
		on:delete={() => {
			isQrDeleteShow = true;
		}}
	/>
{/if}

{#if isQrDeleteShow}
	<QrCodeDeleteModal
		{selectedWifi}
		on:clickoutside={() => (isQrDeleteShow = false)}
		on:close={() => (isQrDeleteShow = false)}
		on:delete={() => {
			deleteWifi(selectedWifi);
			isQrDeleteShow = false;
			isQrPreviewShow = false;
		}}
	/>
{/if}
