<script lang="ts">
	import UnitCard from "../lib/component/UnitCard.svelte";
    import BottomMenu from "../lib/component/BottomMenu.svelte";
	import Header from "../lib/component/Header.svelte";
	import Layout from "../lib/component/Layout.svelte";
    import {onMount} from "svelte";
	import InfiniteScroll from "../lib/InfinityScroll.svelte";
    import { App } from '@capacitor/app';

    App.addListener('appUrlOpen', data => {
        alert('Back Press');
    });
    
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

    <div class="container-fluid my-4">
        <div class="row" style="overflow-x: scroll; max-height: 620px">
            {#each data as unit}
                <div class="col-6 col-sm-4 col-md-3 col-lg-2 p-1">
                    <UnitCard unit={unit} url={app_url}/>
                </div>
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