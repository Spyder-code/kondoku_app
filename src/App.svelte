<script lang="ts">
  import { router, Router } from '../.routify/instance.default';
  import { onMount } from 'svelte';
  import Loading from './lib/component/Loading.svelte';
  import 'flatpickr/dist/flatpickr.css';
  import 'flatpickr/dist/themes/light.css';
  let loaded = false;
  onMount(() => {
      setTimeout(()=>{
          loaded = true
      },2000);
  });
</script>

<Router {router} />
{#if loaded}
{:else}
  <Loading/>
{/if}