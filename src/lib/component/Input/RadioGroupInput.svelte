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

<div class="flex flex-col gap-2 pl-4">
	<p class="text-zinc-400">{legend}</p>

	<div class="space-y-1">
		{#each values as radio}
			<label for={radio.name} class="flex items-center gap-2 text-zinc-400 transition-all">
				<input
					bind:group
					type="radio"
					name={radio.name}
					id={radio.name}
					value={radio.value}
					class="bg-zinc-900 border-zinc-800"
				/>
				{radio.label}
			</label>
		{/each}
	</div>
</div>
