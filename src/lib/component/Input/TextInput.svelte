<script lang="ts">
	export let value: string;
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let placeholder: string = "";
	export let label: string = "";
	export let name: string;
</script>

<label for={name} class="flex flex-col gap-1 text-zinc-400">
	{label}
	<input
		bind:value
		type="text"
		{name}
		id={name}
		{placeholder}
		{required}
		{disabled}
		class="bg-zinc-800 text-zinc-100 rounded border-zinc-700 disabled:opacity-75 disabled:cursor-not-allowed"
	/>
</label>
