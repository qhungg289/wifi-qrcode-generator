<script lang="ts">
	import { intersectionObserverAction } from "$lib/action/intersectionObserverAction";
	import { headerText, isHeaderIntersect } from "$lib/store/globalState";
	import { onMount } from "svelte";

	export let heading = "";
	export let subHeading = "";

	const actionCallback = (entries: IntersectionObserverEntry[], _observer: IntersectionObserver) => {
		entries.forEach((e) => {
			if (e.isIntersecting == false) {
				$isHeaderIntersect = true;
				return;
			}

			$isHeaderIntersect = false;
		});
	};

	onMount(() => {
		$headerText = heading;

		return () => ($headerText = "");
	});
</script>

<hgroup
	use:intersectionObserverAction={{
		callback: actionCallback,
		options: { rootMargin: "0px", threshold: 1.0 }
	}}
	class="px-4 py-4 sm:py-8 space-y-2 sm:space-y-4"
>
	<h1 class="font-bold text-4xl">{heading}</h1>

	{#if subHeading}
		<h2 class="text-base sm:text-lg text-zinc-400">{subHeading}</h2>
	{/if}
</hgroup>
