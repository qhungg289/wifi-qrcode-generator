import { writable } from "svelte/store";

export const isListEdit = writable(false);

export const headerText = writable("");
export const isHeaderIntersect = writable(false);
