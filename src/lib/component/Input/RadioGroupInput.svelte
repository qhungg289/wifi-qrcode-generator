<script lang="ts">
	type Radio = {
		name: string;
		value: "WPA" | "WEP" | "nopass";
		label: string;
	};

	export let group: "WPA" | "WEP" | "nopass";
	export let legend: string = "";
	export let values: Radio[];
</script>

<fieldset class="flex flex-col gap-1">
	<legend class="text-zinc-400">{legend}</legend>

	{#each values as radio}
		<label for={radio.name} class="flex items-center gap-2 text-zinc-400 transition-all">
			<input
				bind:group
				type="radio"
				name={radio.name}
				id={radio.name}
				value={radio.value}
				class="bg-zinc-800 border-zinc-700"
			/>
			{radio.label}
		</label>
	{/each}
</fieldset>
