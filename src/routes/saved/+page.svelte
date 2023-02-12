<script lang="ts">
	import { wifiList, deleteWifi, type WifiInfo } from "$lib/store/wifiList";
	import { onMount } from "svelte";
	import { flip } from "svelte/animate";
	import Heading from "$lib/component/Typography/Heading.svelte";
	import WifiOverview from "$lib/component/WifiOverview.svelte";
	import QrCodePreviewModal from "$lib/component/Modal/QRCodePreviewModal.svelte";

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
	<svelte:fragment slot="heading">Saved wifi</svelte:fragment>
	<svelte:fragment slot="sub-heading"
		>Previously created QR code saved locally on your machine.</svelte:fragment
	>
</Heading>

{#if $wifiList.length > 0}
	<div class="grid md:grid-cols-2 gap-4">
		{#each $wifiList as wifi (wifi)}
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
			deleteWifi(selectedWifi);
			isQrPreviewShow = false;
		}}
	/>
{/if}
