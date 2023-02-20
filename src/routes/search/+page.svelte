<script lang="ts">
	import { deleteWifi, wifiList, type Wifi } from "$lib/store/wifiList";
	import { fade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import Heading from "$lib/component/Typography/Heading.svelte";
	import WifiOverview from "$lib/component/WifiOverview.svelte";
	import QRCodePreviewModal from "$lib/component/Modal/QRCodePreviewModal.svelte";
	import QRCodeDeleteModal from "$lib/component/Modal/QRCodeDeleteModal.svelte";
	import SearchInput from "$lib/component/Input/SearchInput.svelte";

	let search = "";

	$: regex = new RegExp(`(${search})+`, "i");
	$: searchResults = $wifiList.filter((w) => regex.test(w.ssid));

	const clearSearch = () => {
		search = "";
	};

	let selectedWifi: Wifi;
	let isQRPreviewShow = false;
	let isQRDeleteShow = false;

	const setSelectedWifi = (wifi: Wifi) => (selectedWifi = wifi);
</script>

<svelte:head>
	<title>Search | Wifi2QR</title>
</svelte:head>

<Heading heading="Search" />

<SearchInput bind:value={search} on:clear={clearSearch} />

{#if search && searchResults.length !== 0}
	<div transition:fade|local class="grid">
		{#each searchResults as wifi (wifi)}
			<div animate:flip={{ duration: 200 }}>
				<WifiOverview
					{wifi}
					on:showqrcode={() => {
						setSelectedWifi(wifi);
						isQRPreviewShow = true;
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

{#if isQRPreviewShow}
	<QRCodePreviewModal
		{selectedWifi}
		on:clickoutside={() => (isQRPreviewShow = false)}
		on:close={() => (isQRPreviewShow = false)}
		on:delete={() => {
			isQRDeleteShow = true;
		}}
	/>
{/if}

{#if isQRDeleteShow}
	<QRCodeDeleteModal
		{selectedWifi}
		on:clickoutside={() => (isQRDeleteShow = false)}
		on:close={() => (isQRDeleteShow = false)}
		on:delete={() => {
			deleteWifi(selectedWifi);
			isQRDeleteShow = false;
			isQRPreviewShow = false;
		}}
	/>
{/if}
