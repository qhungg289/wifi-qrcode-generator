<script lang="ts">
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
	import Portal from "svelte-portal";
	import { fade } from "svelte/transition";

	export let onScreenTime = 3000;

	const dispatch = createEventDispatcher();

	onMount(() => {
		const t = setTimeout(() => {
			dispatch("disappear");
		}, onScreenTime);

		return () => clearTimeout(t);
	});
</script>

<Portal target="#modal-container">
	<div
		class="pointer-events-none fixed inset-0 h-screen flex flex-col items-center justify-end z-20"
	>
		<div transition:fade|local class="bg-zinc-800 px-6 py-2 mb-20 text-sm">
			<slot />
		</div>
	</div>
</Portal>
