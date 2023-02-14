<script lang="ts">
	export let value: string;
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let placeholder: string = "";
	export let label: string = "";
	export let name: string;
</script>

<label for={name} class="flex items-center gap-4 bg-zinc-900 border border-zinc-800 text-zinc-400">
	<span class="pl-4">{label}</span>
	<input
		bind:value
		type="text"
		{name}
		id={name}
		{placeholder}
		{required}
		{disabled}
		class="w-full bg-zinc-900 text-zinc-100 border-none disabled:opacity-75 disabled:cursor-not-allowed"
	/>
</label>
