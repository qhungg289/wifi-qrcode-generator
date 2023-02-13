<script lang="ts">
	import QRCode from "qrcode";
	import { addNewWifi } from "$lib/store/wifiList";
	import Heading from "$lib/component/Typography/Heading.svelte";
	import TextInput from "$lib/component/Input/TextInput.svelte";
	import RadioGroup from "$lib/component/Input/RadioGroupInput.svelte";
	import PasswordInput from "$lib/component/Input/PasswordInput.svelte";
	import CheckBoxInput from "$lib/component/Input/CheckBoxInput.svelte";
	import QrCodePreviewModal from "$lib/component/Modal/QRCodePreviewModal.svelte";

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
</script>

<Heading>
	<svelte:fragment slot="heading">Create a new QR code</svelte:fragment>
	<svelte:fragment slot="sub-heading"
		>Your WiFi information stays in your machine and did not send to any server.</svelte:fragment
	>
</Heading>

<div class="">
	<form on:submit|preventDefault={handleFormSubmit} class="space-y-4">
		<TextInput bind:value={ssid} name="ssid" label="SSID" placeholder="Your WiFi name" required />

		<RadioGroup
			bind:group={encryption}
			legend="Encryption"
			values={[
				{ label: "WPA/WPA2/WPA3", name: "wpa", value: "WPA" },
				{ label: "WEP", name: "wep", value: "WEP" },
				{ label: "None", name: "nopass", value: "nopass" }
			]}
		/>

		<PasswordInput
			bind:value={password}
			disabled={isPasswordFieldUnavailable}
			required={encryption !== "nopass"}
			label="Password"
			name="password"
			placeholder="Your WiFi password"
		/>

		<CheckBoxInput bind:checked={hidden} name="hidden" label="Hidden" />

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
	<QrCodePreviewModal
		selectedWifi={{ ssid, encryption, password, hidden, dataURL: qrSrc }}
		on:clickoutside={() => (isQrPreviewShow = false)}
		on:close={() => (isQrPreviewShow = false)}
	/>
{/if}
