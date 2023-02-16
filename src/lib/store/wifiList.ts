import { writable, get } from "svelte/store";

export type Wifi = {
	ssid: string;
	encryption: string;
	password: string;
	hidden: boolean;
	dataURL?: string;
};

export const wifiList = writable<Wifi[]>([]);

export const addNewWifi = (wifi: Wifi) => {
	wifiList.update((l) => [...l, wifi]);
	localStorage.setItem("wifiList", JSON.stringify(get(wifiList)));
};

export const deleteWifi = (wifi: Wifi) => {
	wifiList.update((l) => l.filter((w) => w !== wifi));
	localStorage.setItem("wifiList", JSON.stringify(get(wifiList)));
};
