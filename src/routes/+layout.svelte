<script lang="ts">
	import "../app.css";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import {
		wifiList,
		selectedWifiList,
		deleteAllFromSelectedList,
		exportToJSON
	} from "$lib/store/wifiList";
	import { isListEdit, toggleIsListEdit } from "$lib/store/globalState";
	import { fade } from "svelte/transition";
	import { quartInOut } from "svelte/easing";
	import QrCodeDeleteModal from "$lib/component/Modal/QRCodeDeleteModal.svelte";

	let isDeleteAllFromSelectedShow = false;

	onMount(() => {
		const savedFromLocal = localStorage.getItem("wifiList");
		if (savedFromLocal) {
			$wifiList = JSON.parse(savedFromLocal);
		}
	});
</script>

<svelte:head>
	<title>Wifi2QR</title>
	<meta
		name="description"
		content="Create a QR code with your wifi information to share with others."
	/>
</svelte:head>

<header class="fixed w-full bg-zinc-900 px-4 py-2 border-b border-zinc-800 z-10">
	<div class="flex items-center justify-between">
		<p class="text-lg">Wifi2QR</p>
		{#if $page.url.pathname === "/saved"}
			<button
				disabled={$wifiList.length == 0}
				on:click={toggleIsListEdit}
				class="text-blue-400 hover:opacity-80 active:opacity-90 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
				>{$isListEdit ? "Done" : "Edit"}</button
			>
		{/if}
	</div>
</header>

<main>
	<div class="pt-12 mb-36">
		<slot />
	</div>
</main>

<div class="fixed bottom-0 inset-x-0">
	{#if $isListEdit && $selectedWifiList.length > 0}
		<div
			transition:fade|local={{ easing: quartInOut }}
			class="px-4 py-2 bg-zinc-900 border-t border-zinc-800 pointer-events-auto flex items-center justify-between z-0"
		>
			<div class="flex items-center justify-between gap-6">
				<button
					on:click={exportToJSON}
					class="pointer-events-auto text-blue-600 hover:opacity-80 active:opacity-90 py-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
					>Export ({$selectedWifiList.length})</button
				>
				<button
					on:click={() => (isDeleteAllFromSelectedShow = true)}
					class="pointer-events-auto text-rose-600 hover:opacity-80 active:opacity-90 py-2 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
					>Delete ({$selectedWifiList.length})</button
				>
				{#if isDeleteAllFromSelectedShow}
					<QrCodeDeleteModal
						on:clickoutside={() => (isDeleteAllFromSelectedShow = false)}
						on:close={() => (isDeleteAllFromSelectedShow = false)}
						on:delete={() => {
							deleteAllFromSelectedList();
							isDeleteAllFromSelectedShow = false;
						}}
					/>
				{/if}
			</div>

			<span class="text-sm">{$selectedWifiList.length} selected</span>
		</div>
	{/if}
	<nav
		class="py-1 flex items-center justify-around bg-zinc-900 text-zinc-400 text-[0.65rem] border-t border-zinc-800 z-10"
	>
		<a
			class="flex flex-col items-center gap-[0.15rem] w-full"
			class:text-blue-500={$page.url.pathname === "/"}
			href="/"
		>
			{#if $page.url.pathname === "/"}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
						clip-rule="evenodd"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.75"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			{/if}
			<span>Create</span>
		</a>
		<a
			class="flex flex-col items-center gap-[0.15rem] w-full"
			class:text-blue-500={$page.url.pathname === "/saved"}
			href="/saved"
		>
			{#if $page.url.pathname === "/saved"}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
						clip-rule="evenodd"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.75"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
					/>
				</svg>
			{/if}
			<span>Saved</span></a
		>
		<a
			class="flex flex-col items-center gap-[0.15rem] w-full"
			class:text-blue-500={$page.url.pathname === "/search"}
			href="/search"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.75"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg><span>Search</span>
		</a>
	</nav>
</div>

<div id="modal-container" />
