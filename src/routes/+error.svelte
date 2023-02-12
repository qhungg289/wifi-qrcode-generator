<script lang="ts">
	import { page } from "$app/stores";
</script>

<hgroup class="py-8 space-y-4">
	<h1 class="font-bold text-4xl">{$page.status}</h1>
	<h2 class="text-lg text-zinc-400">{$page.error?.message}</h2>
</hgroup>
