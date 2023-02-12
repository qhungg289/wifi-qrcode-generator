<script lang="ts">
	import { page } from "$app/stores";
	import Heading from "$lib/component/Typography/Heading.svelte";
</script>

<Heading>
	<svelte:fragment slot="heading">{$page.status}</svelte:fragment>
	<svelte:fragment slot="sub-heading">{$page.error?.message}</svelte:fragment>
</Heading>
