<script lang="ts">
	import UnitCard from "../lib/component/UnitCard.svelte";
    import BottomMenu from "../lib/component/BottomMenu.svelte";
	import Header from "../lib/component/Header.svelte";
	import Layout from "../lib/component/Layout.svelte";
    import {onMount} from "svelte";
	import InfiniteScroll from "../lib/InfinityScroll.svelte";
    
    let url = import.meta.env.VITE_ENDPOINT;
    let app_url = import.meta.env.VITE_APP_URL;
        // if the api (like in this example) just have a simple numeric pagination
    let page = 1;
    // but most likely, you'll have to store a token to fetch the next page
    let nextUrl = '';
    // store all the data here.
    let data = [];
    // store the new batch of data here.
    let newBatch = [];
    
    async function fetchData() {
        const response = await fetch(`${url}unit?page=${page}`);
        newBatch = await response.json();
    };
    
    onMount(()=> {
        // load first batch onMount
        fetchData();
    })

    $: data = [
            ...data,
            ...newBatch
    ];
</script>

<Layout>
	<Header/>
	<div class="container mt-4">
        <div class="form-group mb-0">
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control search" placeholder="Search Property">
                </div>
                <div class="col-auto pl-0">
                    <button class="sqaure-btn btn btn-info text-white" type="button">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid my-4">
        <div class="d-flex flex-wrap justify-content-center" style="gap:3px; overflow-x: scroll; max-height: 620px">
            {#each data as unit}
                {#each unit.unit_rent as item}
                    {#if unit.image}
                        <UnitCard unit={unit} item={item} url={app_url}/>
                    {/if}
                {/each}
            {:else}
                <p>Tidak ada data!</p>
            {/each}
            <InfiniteScroll
                threshold={100}
                on:loadMore={() => {page++; fetchData()}} />
        </div>
    </div>

	<BottomMenu/>
</Layout>