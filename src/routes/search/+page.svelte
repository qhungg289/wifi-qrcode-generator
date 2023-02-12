<script lang="ts">
	import { deleteWifi, wifiList, type WifiInfo } from "$lib/store/wifiList";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import Heading from "$lib/component/Typography/Heading.svelte";
	import WifiOverview from "$lib/component/WifiOverview.svelte";
	import QrCodePreviewModal from "$lib/component/Modal/QRCodePreviewModal.svelte";

	let search = "";

	$: regex = new RegExp(`(${search})+`, "i");
	$: searchResults = $wifiList.filter((w) => regex.test(w.ssid));

	let selectedWifi: WifiInfo;
	let isQrPreviewShow = false;

	const setSelectedWifi = (wifi: WifiInfo) => (selectedWifi = wifi);

	onMount(() => {
		const savedFromLocal = localStorage.getItem("wifiList");
		if (savedFromLocal) {
			$wifiList = JSON.parse(savedFromLocal);
		}
	});
</script>

<Heading>
	<svelte:fragment slot="heading">Search</svelte:fragment>
</Heading>

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
{/if}

{#if isQrPreviewShow}
	<QrCodePreviewModal
		{selectedWifi}
		on:clickoutside={() => (isQrPreviewShow = false)}
		on:close={() => (isQrPreviewShow = false)}
		on:delete={() => {
			deleteWifi(selectedWifi);
			isQrPreviewShow = false;
		}}
	/>
{/if}
