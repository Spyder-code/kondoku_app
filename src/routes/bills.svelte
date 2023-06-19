<script>
  import TagihanItem from "../lib/component/TagihanItem.svelte";
  import BottomMenu from "../lib/component/BottomMenu.svelte";
  import Layout from "../lib/component/Layout.svelte";
  import HeaderTitle from "../lib/component/HeaderTitle.svelte";
    import { Preferences } from '@capacitor/preferences';
    import axios from "axios";
    import { onMount } from "svelte";
  import Empty from "../lib/component/Empty.svelte";

  let endpoint = import.meta.env.VITE_ENDPOINT;
  let user = null;
  let data = [];
  async function getUser() {
      const ret = await Preferences.get({ key: 'user' });
      user = JSON.parse(ret.value);
      if(user){
          getData();
      }
  }

  const getData = ()=>{
    axios.post(endpoint+'bills',{user_id:user.id})
        .then((res)=>{
            data = res.data
        })
  }

  onMount(()=>{
    getUser();
  })
      
  </script>
  <HeaderTitle title="Bills"/>
  <Layout>
    <div class="container mt-3">
      <div class="row">
        {#each data as item}
          <TagihanItem bind:item={item}/>
        {:else}
          <Empty/>
          <p class="text-center fw-bold">Empty</p>
        {/each}
      </div>
    </div>
  </Layout>
  <BottomMenu/>