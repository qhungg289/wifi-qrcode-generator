import { writable } from "svelte/store";

export const isListEdit = writable(false);

export const toggleIsListEdit = () => {
	isListEdit.update((i) => !i);
};
