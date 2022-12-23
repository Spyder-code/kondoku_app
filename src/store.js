import { writable } from 'svelte/store';

export const book = writable({
    checkin:null,
    checkout:null,
    count:null,
    duration:null,
    unitId:null,
    unitRentId:null,
});

export const search = writable({
    duration:null,
    apartment:null,
    bedroom:null,
    typeAll:null,
    typeStudio:null,
    startDate:null,
    endDate:null,
})