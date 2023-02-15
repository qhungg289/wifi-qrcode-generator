<script lang="ts">
	import { wifiList, deleteWifi, type WifiInfo } from "$lib/store/wifiList";
	import { flip } from "svelte/animate";
	import Heading from "$lib/component/Typography/Heading.svelte";
	import WifiOverview from "$lib/component/WifiOverview.svelte";
	import QrCodePreviewModal from "$lib/component/Modal/QRCodePreviewModal.svelte";
	import QrCodeDeleteModal from "$lib/component/Modal/QRCodeDeleteModal.svelte";
	import Portal from "svelte-portal";
	import { fade, fly } from "svelte/transition";
	import { quartInOut } from "svelte/easing";

	let selectedWifi: WifiInfo;
	let selectedWifiList: WifiInfo[] = [];
	let isQrPreviewShow = false;
	let isQrDeleteShow = false;
	let isQrDeleteAllShow = false;
	let isEdit = false;

	const setSelectedWifi = (wifi: WifiInfo) => (selectedWifi = wifi);

	const addToSelectedList = (e: CustomEvent<any>, wifi: WifiInfo) => {
		if (e.detail == true) {
			selectedWifiList = [...selectedWifiList, wifi];
			return;
		}

		selectedWifiList = selectedWifiList.filter((w) => w !== wifi);
	};

	const deleteAllSelected = () => {
		selectedWifiList.forEach((w) => {
			deleteWifi(w);
		});

		selectedWifiList = [];
	};

	const exportToJSON = () => {
		let savedList;

		if (selectedWifiList.length > 0) {
			savedList = JSON.stringify(selectedWifiList);
		} else {
			savedList = localStorage.getItem("wifiList");
		}

		if (!savedList) {
			return;
		}

		const cleanedUpList: WifiInfo[] = JSON.parse(savedList);
		cleanedUpList.forEach((w) => {
			delete w.dataURL;
		});

		const a = document.createElement("a");
		a.href = URL.createObjectURL(
			new Blob([JSON.stringify(cleanedUpList)], { type: "application/json" })
		);
		a.download = "wifi.json";
		a.click();
	};
</script>

<Heading>
	<svelte:fragment slot="heading">Saved wifi</svelte:fragment>
	<svelte:fragment slot="sub-heading"
		>Previously created QR code saved locally on your machine.</svelte:fragment
	>
</Heading>

<div class="flex items-center justify-between mx-4 mb-4">
	<div class="flex items-center justify-between">
		<button
			disabled={$wifiList.length == 0}
			on:click={exportToJSON}
			class="bg-blue-600 border border-blue-500 hover:opacity-80 active:opacity-90 px-6 py-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
			>Export</button
		>

		<button
			disabled={$wifiList.length == 0}
			on:click={() => (isEdit = !isEdit)}
			class="text-blue-400 hover:opacity-80 active:opacity-90 px-6 py-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
			>{isEdit ? "Done" : "Edit"}</button
		>
	</div>

	{#if isEdit}
		<span transition:fade|local class="text-sm">{selectedWifiList.length} selected</span>
	{/if}
</div>

{#if $wifiList.length > 0}
	<div class="grid">
		{#each $wifiList as wifi (wifi)}
			<div animate:flip={{ duration: 200 }}>
				<WifiOverview
					{wifi}
					{isEdit}
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
	<div class="text-zinc-800 flex flex-col items-center gap-2 py-16 select-none">
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

{#if isQrDeleteAllShow}
	<QrCodeDeleteModal
		on:clickoutside={() => (isQrDeleteAllShow = false)}
		on:close={() => (isQrDeleteAllShow = false)}
		on:delete={() => {
			deleteAllSelected();
			isQrDeleteAllShow = false;
		}}
	/>
{/if}

{#if isEdit && selectedWifiList.length > 0}
	<Portal>
		<div class="pointer-events-none h-screen fixed inset-0 flex flex-col items-center justify-end">
			<div transition:fly={{ y: 200, easing: quartInOut }} class="mb-20 space-x-2">
				<button
					disabled={$wifiList.length == 0}
					on:click={exportToJSON}
					class="pointer-events-auto bg-blue-600 border border-blue-500 hover:opacity-80 active:opacity-90 px-6 py-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
					>Export ({selectedWifiList.length})</button
				>

				<button
					on:click={() => (isQrDeleteAllShow = true)}
					disabled={selectedWifiList.length == 0}
					class="pointer-events-auto bg-rose-600 border border-rose-500 hover:opacity-80 active:opacity-90 px-6 py-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
					>Delete ({selectedWifiList.length})</button
				>
			</div>
		</div>
	</Portal>
{/if}
