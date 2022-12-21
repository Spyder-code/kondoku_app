import { writable } from 'svelte/store';

export const book = writable({
    checkin:null,
    checkout:null,
    count:null,
    duration:null,
    unitId:null,
    unitRentId:null,
});