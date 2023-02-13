<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import "../app.css";
	import { wifiList } from "$lib/store/wifiList";

	onMount(() => {
		const savedFromLocal = localStorage.getItem("wifiList");
		if (savedFromLocal) {
			$wifiList = JSON.parse(savedFromLocal);
		}
	});
</script>

<svelte:head>
	<title>WiFi2QR</title>
	<meta
		name="description"
		content="Create a QR code with your WiFi information to share with others."
	/>
</svelte:head>

<header class="fixed top-0 inset-x-0 py-2 bg-zinc-800 border-b border-zinc-700 z-10">
	<div class="container flex items-center justify-between">
		<p class="text-lg">WiFi2QR</p>
	</div>
</header>

<main>
	<div class="container mb-32 mt-16">
		<slot />
	</div>
</main>

<nav
	class="fixed bottom-0 inset-x-0 py-2 flex items-center justify-around bg-zinc-800 text-zinc-400 text-xs font-bold border-t border-zinc-700 z-10"
>
	<a
		class="flex flex-col items-center gap-1 w-full"
		class:text-blue-400={$page.url.pathname === "/"}
		href="/"
	>
		{#if $page.url.pathname === "/"}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-5 h-5"
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
				stroke-width="2"
				stroke="currentColor"
				class="w-5 h-5"
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
		class="flex flex-col items-center gap-1 w-full"
		class:text-blue-400={$page.url.pathname === "/saved"}
		href="/saved"
	>
		{#if $page.url.pathname === "/saved"}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="w-5 h-5"
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
				stroke-width="2"
				stroke="currentColor"
				class="w-5 h-5"
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
		class="flex flex-col items-center gap-1 w-full"
		class:text-blue-400={$page.url.pathname === "/search"}
		href="/search"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			class="w-5 h-5"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
			/>
		</svg><span>Search</span>
	</a>
</nav>

<div id="modal-container" />
