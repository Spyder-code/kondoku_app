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

    App.addListener('appUrlOpen', data => {
        alert('Back Press');
    });
    
    let url = import.meta.env.VITE_ENDPOINT;
    let app_url = import.meta.env.VITE_APP_URL;
    let page = 1;
    let data = [];
    let newBatch = [];
    let isSearch = false;

    async function fetchData() {
        if($search.duration){
            isSearch = true;
            let data = {
                duration:$search.duration,
                apartment:$search.apartment,
                is_all:$search.typeAll,
                bedroom:$search.bedroom,
                studio:$search.typeStudio,
                start_date:$search.startDate,
                end_date:$search.endDate,
                page:page
            };
            axios.get(url+'unit-filter', {params:data}).then((res)=>{
                newBatch = res.data
            })
            
        }else{
            isSearch = false;
            const response = await fetch(`${url}unit?page=${page}`);
            newBatch = await response.json();
        }
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
        <div class="row" style="overflow-x: scroll; max-height: 680px">
            {#each data as unit}
                <div class="col-6 col-sm-4 col-md-3 col-lg-2 p-1">
                    <UnitCard unit={unit} url={app_url}/>
                </div>
            {:else}
                <Loading/>
            {/each}
            <InfiniteScroll
                threshold={100}
                on:loadMore={() => {page++; fetchData()}} />
        </div>
    </div>

	<BottomMenu/>
</Layout>