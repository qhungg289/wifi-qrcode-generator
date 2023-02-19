<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { fade } from "svelte/transition";

	export let value: string;

	const dispatch = createEventDispatcher();
</script>

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
			bind:value
			class="bg-zinc-900 border-x-0 border-y-2 border-transparent focus:ring-0 focus:border-b-blue-500 focus:border-t-transparent w-full pl-12"
			placeholder="Search your saved wifi..."
		/>
	</div>
	{#if value}
		<button
			transition:fade|local
			on:click={() => dispatch("clear")}
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
