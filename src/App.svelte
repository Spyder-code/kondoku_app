<script lang="ts">
  import { router, Router } from '../.routify/instance.default';
  import { onMount } from 'svelte';
  import Loading from './component/Loading.svelte';
  let loaded = false;
  onMount(() => {
      setTimeout(()=>{
          loaded = true
      },2000);
  });
</script>

{#if loaded}
  <Router {router} />
{:else}
  <Loading/>
{/if}