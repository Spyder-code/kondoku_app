<script lang="ts">
	import UnitCard from "../lib/component/UnitCard.svelte";
    import BottomMenu from "../lib/component/BottomMenu.svelte";
	import Header from "../lib/component/Header.svelte";
	import Layout from "../lib/component/Layout.svelte";
    import {onMount} from "svelte";
	import InfiniteScroll from "../lib/InfinityScroll.svelte";
    import { App } from '@capacitor/app';
    import Loading from "../lib/component/Loading.svelte";
    import { search } from "../store";
    import axios from "axios";
    import moment from "moment";
    import { goto } from "@roxi/routify";

    App.addListener('appUrlOpen', data => {
        alert('Back Press');
    });
    
    let url = import.meta.env.VITE_ENDPOINT;
    let app_url = import.meta.env.VITE_APP_URL;
    let page = 1;
    let data = [];
    let newBatch = [];
    let loaded = false;


    async function fetchData() {
        if($search.duration || $search.apartment || $search.name || $search.bedroom || $search.typeStudio){
            let data = {
                duration:$search.duration,
                apartment:$search.apartment,
                is_all:$search.typeAll,
                bedroom:$search.bedroom,
                studio:$search.typeStudio,
                start_date:$search.startDate,
                end_date:$search.endDate,
                name:$search.name,
                page:page
            };
            axios.get(url+'unit-filter', {params:data}).then((res)=>{
                newBatch = res.data
            })
            
        }else{
            const response = await fetch(`${url}unit?page=${page}`);
            newBatch = await response.json();
        }
    };
    
    
    onMount(() => {
        setTimeout(()=>{
            loaded = true;
            fetchData()
        },2000);
    });
    
    $: data = [
            ...data,
            ...newBatch
    ];

    const clearFilter = ()=>{
        search.set({
            duration:null,
            apartment:null,
            apartmentName:null,
            bedroom:null,
            typeAll:null,
            typeStudio:null,
            startDate:null,
            endDate:null,
            name:null,
        });

        $goto('/list');
    }
</script>

{#if loaded}
<Layout>
	<Header/>

    <div class="container-fluid my-4">
        {#if $search.duration && !$search.name}
            <div class="d-flex flex-wrap mb-2" style="gap: 5px;">
                <span class="filter-item">Checkin: {moment($search.startDate).format('DD/MM/YYYY')}</span>
                <span class="filter-item">Checkout: {moment($search.endDate).format('DD/MM/YYYY')}</span>
                <span class="filter-item">Duration: {$search.duration}</span>
                <span class="filter-item">{$search.apartmentName=='all'?'Apartment: all':$search.apartmentName}</span>
                <span class="filter-item">Type: {$search.typeStudio?'Studio':($search.bedroom>0?$search.bedroom+' BR':'All')}</span>
                <button type="button" on:click={()=>clearFilter()} class="clear-filter">Clear Filter</button>
            </div>
        {/if}
        {#if $search.apartment && !$search.duration}
            <div class="d-flex flex-wrap mb-2" style="gap: 5px;">
                <span class="filter-item">{$search.apartmentName}</span>
                <button type="button" on:click={()=>clearFilter()} class="clear-filter">Clear Filter</button>
            </div>
        {/if}
        {#if ($search.bedroom || $search.typeStudio) && !$search.duration}
            <div class="d-flex flex-wrap mb-2" style="gap: 5px;">
                <span class="filter-item">Type: {$search.typeStudio?'Studio':($search.bedroom>0?$search.bedroom+' BR':'All')}</span>
                <button type="button" on:click={()=>clearFilter()} class="clear-filter">Clear Filter</button>
            </div>
        {/if}
        <div class="row" style="overflow-x: scroll; max-height: 680px">
        {#if $search.name}
            <div class="d-flex flex-wrap mb-2" style="gap: 5px;">
                <span class="filter-item">Title : {$search.name}</span>
                <button type="button" on:click={()=>clearFilter()} class="clear-filter">Clear Filter</button>
            </div>
        {/if}
        <div class="row" style="overflow-x: scroll; max-height: 680px">
            {#each data as unit}
                <div class="col-6 col-sm-4 col-md-3 col-lg-2 p-1">
                    <UnitCard unit={unit} url={app_url} bind:duration={$search.duration}/>
                </div>
            {:else}
                <div class="col-12">
                    <img src="img/empty.png" alt="empty" class="img-fluid">
                    <div class="text-center">
                        <p class="text-center">Empty</p>
                    </div>
                </div>
            {/each}
            <InfiniteScroll
                threshold={100}
                on:loadMore={() => {page++; fetchData()}} />
        </div>
    </div>

	<BottomMenu/>
</Layout>
{:else}
    <Loading/>
{/if}

<style>
    .filter-item{
        font-size: .6rem;
        padding: 2px 5px;
        background-color: #80bdff;
        border-radius: 20px;
        color:white;
    }
    .clear-filter{
        font-size: .6rem;
        padding: 2px 5px;
        background-color: #fb4646;
        border-radius: 20px;
        color:white;
        border: none;
        outline: none;
    }
</style>