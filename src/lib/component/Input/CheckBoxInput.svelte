<script lang="ts">
	export let checked: boolean;
	export let name: string = "";
	export let label: string = "";
</script>

<fieldset>
	<label for={name} class="flex items-center gap-2 text-zinc-400">
		<input
			bind:checked
			type="checkbox"
			{name}
			id={name}
			class="bg-zinc-800 rounded border-zinc-700 transition-all"
		/>
		{label}
	</label>
</fieldset>
