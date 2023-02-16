import { writable, get } from "svelte/store";

export type Wifi = {
	ssid: string;
	encryption: string;
	password: string;
	hidden: boolean;
	dataURL?: string;
};

export const wifiList = writable<Wifi[]>([]);
export const selectedWifiList = writable<Wifi[]>([]);

export const addNewWifi = (wifi: Wifi) => {
	wifiList.update((l) => [...l, wifi]);
	localStorage.setItem("wifiList", JSON.stringify(get(wifiList)));
};

export const deleteWifi = (wifi: Wifi) => {
	wifiList.update((l) => l.filter((w) => w !== wifi));
	localStorage.setItem("wifiList", JSON.stringify(get(wifiList)));
};

export const addToSelectedList = (e: CustomEvent<any>, wifi: Wifi) => {
	if (e.detail == true) {
		selectedWifiList.update((l) => [...l, wifi]);
		return;
	}

	selectedWifiList.update((l) => l.filter((w) => w !== wifi));
};

export const deleteAllFromSelectedList = () => {
	get(selectedWifiList).forEach((w) => deleteWifi(w));

	selectedWifiList.set([]);
};

export const exportToJSON = () => {
	let JSONList: Wifi[] = [];
	if (get(selectedWifiList).length > 0) {
		JSONList = structuredClone(get(selectedWifiList));
	} else {
		JSONList = structuredClone(get(wifiList));
	}

	JSONList.forEach((w) => {
		delete w.dataURL;
	});

	const a = document.createElement("a");
	a.href = URL.createObjectURL(new Blob([JSON.stringify(JSONList)], { type: "application/json" }));
	a.download = "wifi.json";
	a.click();
};
