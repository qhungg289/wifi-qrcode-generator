<script lang="ts">
	import QRCode from "qrcode";
	import Portal from "svelte-portal";
	import { fade, fly } from "svelte/transition";
	import { wifiList, addNewWifi } from "$lib/store/wifiList";
	import { onMount } from "svelte";

	let ssid = "";
	let encryption: "WPA" | "WEP" | "nopass" = "WPA";
	let password = "";
	let hidden = false;
	let qrSrc = "";

	let isQrPreviewShow = false;

	$: isPasswordFieldUnavailable = encryption === "nopass";

	const formatToQR = () => {
		const encryptionString = `T:${encryption};`;
		const ssidString = `S:${ssid};`;
		const paswordString = password ? `P:${password};` : "";
		const hiddenString = hidden ? `H:${hidden};` : "";

		const wifiInfoString = `WIFI:${encryptionString}${ssidString}${paswordString}${hiddenString};`;

		QRCode.toDataURL(wifiInfoString, { scale: 50, margin: 3 }, (err, url) => {
			if (err) console.error(err);

			qrSrc = url;
		});
	};

	const handleFormSubmit = () => {
		formatToQR();

		addNewWifi({ ssid, encryption, password, hidden, dataURL: qrSrc });
	};

	onMount(() => {
		const savedFromLocal = localStorage.getItem("wifiList");
		if (savedFromLocal) {
			$wifiList = JSON.parse(savedFromLocal);
		}
	});
</script>

<hgroup class="py-8 space-y-4">
	<h1 class="font-bold text-4xl">Create a new QR code</h1>
	<h2 class="text-lg text-zinc-400">
		Your WiFi information stays in your machine and did not send to any server.
	</h2>
</hgroup>

<div class="bg-zinc-800 px-4 py-8 rounded-md border border-zinc-700">
	<form on:submit|preventDefault={handleFormSubmit} class="space-y-4">
		<label for="ssid" class="flex flex-col gap-1 text-zinc-300">
			SSID
			<input
				bind:value={ssid}
				type="text"
				name="ssid"
				id="ssid"
				placeholder="Your WiFi name"
				required
				class="bg-zinc-900 rounded border-zinc-700 disabled:opacity-75 disabled:cursor-not-allowed"
			/>
		</label>

		<fieldset class="flex flex-col gap-1">
			<legend class="text-zinc-300">Encryption</legend>
			<label for="wpa" class="flex items-center gap-2 text-zinc-300">
				<input
					bind:group={encryption}
					type="radio"
					name="wpa"
					id="wpa"
					value="WPA"
					class="bg-zinc-900 border-zinc-700"
				/>
				WPA/WPA2/WPA3
			</label>
			<label for="wep" class="flex items-center gap-2 text-zinc-300">
				<input
					bind:group={encryption}
					type="radio"
					name="wep"
					id="wep"
					value="WEP"
					class="bg-zinc-900 border-zinc-700"
				/>
				WEP
			</label>
			<label for="nopass" class="flex items-center gap-2 text-zinc-300">
				<input
					bind:group={encryption}
					type="radio"
					name="nopass"
					id="nopass"
					value="nopass"
					class="bg-zinc-900 border-zinc-700"
				/>
				None
			</label>
		</fieldset>

		<label for="password" class="flex flex-col gap-1 text-zinc-300">
			Password
			<input
				bind:value={password}
				disabled={isPasswordFieldUnavailable}
				type="password"
				name="password"
				id="password"
				placeholder="Your WiFi password"
				required={encryption !== "nopass"}
				class="bg-zinc-900 rounded border-zinc-700 disabled:opacity-75 disabled:cursor-not-allowed"
			/>
		</label>

		<fieldset>
			<label for="hidden" class="flex items-center gap-2 text-zinc-300">
				<input
					bind:checked={hidden}
					type="checkbox"
					name="hidden"
					id="hidden"
					class="bg-zinc-900 rounded border-zinc-700"
				/>
				Hidden
			</label>
		</fieldset>

		<div class="flex justify-end gap-2">
			{#if qrSrc}
				<button
					class="bg-zinc-700 rounded py-2 px-6 border border-zinc-600 hover:opacity-80 active:opacity-90 transition-all"
					on:click|preventDefault={() => (isQrPreviewShow = !isQrPreviewShow)}
					>{isQrPreviewShow ? "Hide QR code" : "Show QR code"}</button
				>
			{/if}
			<button
				type="submit"
				class="bg-blue-600 border border-blue-500 hover:opacity-80 active:opacity-90 rounded px-6 py-2 transition-all"
				>Create</button
			>
		</div>
	</form>
</div>

{#if isQrPreviewShow}
	<Portal target="#modal-container">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="fixed inset-0 flex items-center justify-center bg-zinc-900/80"
			on:click={() => (isQrPreviewShow = false)}
			in:fade
			out:fade={{ delay: 100 }}
		>
			<div
				on:click|stopPropagation
				class="bg-zinc-800 rounded-md border border-zinc-700 p-4 flex flex-col items-center gap-8"
				in:fly={{ delay: 100, y: -500 }}
				out:fly={{ y: -500 }}
			>
				<div class="flex justify-end w-full">
					<button
						on:click={() => (isQrPreviewShow = false)}
						class="p-2 rounded hover:bg-zinc-700 transition-all"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<img src={qrSrc} alt="qr code" class="max-w-[18rem] sm:max-w-xs rounded" />
				<p
					class="text-xl font-bold py-2 px-4 bg-zinc-700 border border-zinc-600 rounded-full truncate w-48 sm:w-60 md:w-72 text-center"
				>
					{ssid}
				</p>
				<a
					download="wifi-qrcode.png"
					class="bg-blue-600 border border-blue-500 hover:opacity-80 active:opacity-90 rounded px-6 py-2 transition-all w-full text-center"
					role="button"
					href={qrSrc}>Download</a
				>
			</div>
		</div>
	</Portal>
{/if}
