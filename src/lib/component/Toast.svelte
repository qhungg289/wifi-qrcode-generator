<script lang="ts">
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
	import Portal from "svelte-portal";
	import { quartInOut } from "svelte/easing";
	import { fly } from "svelte/transition";

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
	<div class="pointer-events-none fixed inset-0 flex flex-col items-center justify-start z-20">
		<div
			transition:fly|local={{ y: -100, easing: quartInOut }}
			class="bg-zinc-800 px-6 py-4 mt-4 text-sm"
		>
			<slot />
		</div>
	</div>
</Portal>
