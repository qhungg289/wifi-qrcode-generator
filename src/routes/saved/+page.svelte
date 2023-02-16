<script lang="ts">
	import { wifiList, deleteWifi, type Wifi } from "$lib/store/wifiList";
	import { flip } from "svelte/animate";
	import Heading from "$lib/component/Typography/Heading.svelte";
	import WifiOverview from "$lib/component/WifiOverview.svelte";
	import QrCodePreviewModal from "$lib/component/Modal/QRCodePreviewModal.svelte";
	import QrCodeDeleteModal from "$lib/component/Modal/QRCodeDeleteModal.svelte";
	import Portal from "svelte-portal";
	import { fade, fly } from "svelte/transition";
	import { quartInOut } from "svelte/easing";

	let selectedWifi: Wifi;
	let selectedWifiList: Wifi[] = [];
	let isQrPreviewShow = false;
	let isQrDeleteShow = false;
	let isQrDeleteAllShow = false;
	let isEdit = false;

	const setSelectedWifi = (wifi: Wifi) => (selectedWifi = wifi);

	const addToSelectedList = (e: CustomEvent<any>, wifi: Wifi) => {
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

		const cleanedUpList: Wifi[] = JSON.parse(savedList);
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
	<!-- <svelte:fragment slot="sub-heading"
		>Previously created QR code saved locally on your machine.</svelte:fragment
	> -->
</Heading>

<div class="flex items-center justify-between mx-4 mb-4">
	<div class="flex items-center justify-between">
		<button
			disabled={$wifiList.length == 0}
			on:click={exportToJSON}
			class="bg-blue-600 hover:opacity-80 active:opacity-90 px-6 py-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
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
	<Portal target="#modal-container">
		<div class="pointer-events-none h-screen fixed inset-0 flex flex-col items-center justify-end">
			<div
				transition:fly|local={{ y: 200, easing: quartInOut }}
				class="flex items-center justify-between gap-2 bg-zinc-900 w-full border-t border-t-zinc-800 px-4 pt-4 pb-20"
			>
				<div class="flex items-center justify-between gap-2">
					<button
						disabled={$wifiList.length == 0}
						on:click={exportToJSON}
						class="pointer-events-auto bg-blue-600 hover:opacity-80 active:opacity-90 px-6 py-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
						>Export ({selectedWifiList.length})</button
					>

					<button
						on:click={() => (isQrDeleteAllShow = true)}
						disabled={selectedWifiList.length == 0}
						class="pointer-events-auto bg-rose-600 hover:opacity-80 active:opacity-90 px-6 py-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
					</button>
				</div>

				<span class="text-sm">{selectedWifiList.length} selected</span>
			</div>
		</div>
	</Portal>
{/if}
