<script>
  import Unit from "./Unit.svelte";
  import InfiniteScroll from "../InfinityScroll.svelte";
  import {onMount} from "svelte";
  import Empty from "./Empty.svelte";

  let url = import.meta.env.VITE_ENDPOINT;
  let app_url = import.meta.env.VITE_APP_URL;
  export let max_page = null;
  let page = 1;
  let data = [];
  let newBatch = [];
  let loaded = false;

  async function fetchData() {
    const response = await fetch(`${url}unit?page=${page}`);
    newBatch = await response.json();
  };

  const loadMore = ()=>{
    page+=1;
    fetchData();
  }

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

</script>

{#each data as unit}
    <div class="col-6 col-sm-4 col-md-3 col-lg-2 p-1 d-flex justify-content-center">
        <Unit unit={unit}/>
    </div>
{:else}
    <div class="col-12">
        <Empty/>
        <div class="text-center">
            <p class="text-center">Empty</p>
        </div>
    </div>
{/each}
{#if max_page>=page}
  <button type="button" class="btn btn-theme btn-sm text-center mt-2" on:click={loadMore}>Load More</button>
{/if}
<InfiniteScroll 
  threshold={100} 
  on:loadMore={() => {
    page++; 
    if (!max_page || page<=max_page) {
      fetchData()
    }
    }
  } 
/>