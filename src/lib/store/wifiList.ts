import { writable, get } from "svelte/store";

export type WifiInfo = {
	ssid: string;
	encryption: string;
	password: string;
	hidden: boolean;
	dataURL?: string;
};

export const wifiList = writable<WifiInfo[]>([]);

export const addNewWifi = (wifi: WifiInfo) => {
	wifiList.update((l) => [...l, wifi]);
	localStorage.setItem("wifiList", JSON.stringify(get(wifiList)));
};

export const deleteWifi = (wifi: WifiInfo) => {
	wifiList.update((l) => l.filter((w) => w !== wifi));
	localStorage.setItem("wifiList", JSON.stringify(get(wifiList)));
};
