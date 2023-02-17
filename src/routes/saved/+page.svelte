<script lang="ts">
	import {
		type Wifi,
		wifiList,
		deleteWifi,
		selectedWifiList,
		addToSelectedList,
		exportToJSON
	} from "$lib/store/wifiList";
	import { isListEdit } from "$lib/store/globalState";
	import { flip } from "svelte/animate";
	import Heading from "$lib/component/Typography/Heading.svelte";
	import WifiOverview from "$lib/component/WifiOverview.svelte";
	import QrCodePreviewModal from "$lib/component/Modal/QRCodePreviewModal.svelte";
	import QrCodeDeleteModal from "$lib/component/Modal/QRCodeDeleteModal.svelte";
	import { fade } from "svelte/transition";
	import { onDestroy } from "svelte";

	let selectedWifi: Wifi;
	let isQrPreviewShow = false;
	let isQrDeleteShow = false;

	const setSelectedWifi = (wifi: Wifi) => (selectedWifi = wifi);

	onDestroy(() => {
		$isListEdit = false;
		$selectedWifiList = [];
	});
</script>

<Heading heading="Saved" />

<div class="flex items-center justify-between mx-4 mb-4">
	<div class="flex items-center justify-between">
		<button
			disabled={$wifiList.length == 0}
			on:click={exportToJSON}
			class="bg-blue-600 hover:opacity-80 active:opacity-90 px-6 py-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
			>Export</button
		>
	</div>

	{#if $isListEdit}
		<span transition:fade|local class="text-sm">{$selectedWifiList.length} selected</span>
	{/if}
</div>

{#if $wifiList.length > 0}
	<div class="grid">
		{#each $wifiList as wifi (wifi)}
			<div animate:flip={{ duration: 200 }}>
				<WifiOverview
					{wifi}
					isEdit={$isListEdit}
					on:showqrcode={() => {
						setSelectedWifi(wifi);
						isQrPreviewShow = true;
					}}
					on:check={(e) => addToSelectedList(e, wifi)}
				/>
			</div>
		{/each}
	</div>
{:else}
	<div class="text-zinc-700 flex flex-col items-center gap-2 py-16 select-none">
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
				d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
			/>
		</svg>
		<p class="text-2xl">It's empty here!</p>
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
