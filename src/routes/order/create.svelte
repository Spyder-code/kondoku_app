<script>
  import TagihanItem from "../../lib/component/TagihanItem.svelte";
  import BottomMenu from "../../lib/component/BottomMenu.svelte";
  import Layout from "../../lib/component/Layout.svelte";
  import HeaderTitle from "../../lib/component/HeaderTitle.svelte";
  import axios from "axios";
  import { onMount } from "svelte";

  let endpoint = import.meta.env.VITE_ENDPOINT;
  let data_service = [];
  let service = {};
  let service_id = 1;
  let is_file = false;

  const getDataService  = ()=>{
    axios.get(endpoint+'service')
      .then((res)=>{
        data_service = res.data;
        service = data_service[0];
        service_id = service.id;
      });
  }

  const changeService = ()=>{
    axios.get(endpoint+'service/'+service_id)
      .then((res)=>{
        service = res.data;
      });

    if(service_id==2||service_id==4||service_id==5||service_id==8){
      is_file = true;
    }else{
      is_file = false;
    }
  }

  onMount(()=>{
    getDataService();
  });
      
  </script>
  <HeaderTitle title="Order Service"/>
  <Layout>
    <div class="container mt-3">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-6">
          <div class="card product-card-small mb-3 shadow p-2">
            <div class="mb-2">
              <label for="service_id">Service</label>
              <select name="service_id" id="service_id" bind:value={service_id} on:change={changeService} class="form-controls w-100 my-2 py-1 border">
                {#each data_service as item}
                  <option value="{item.id}">{item.name}</option>
                {/each}
              </select>
            </div>
            <div class="text-justify">
              <small style="font-size: .8rem;" class="text-secondary">{@html service.description ?? ''}</small>
            </div>
            {#if is_file}
                <div class="mb-2">
                  <label for="file">File</label>
                  <input type="file" name="file" id="file" multiple>
                </div>
            {/if}
            <div class="mb-2">
              <label for="note">Noted</label>
              <textarea name="note" id="note" cols="30" rows="3" class="form-control border"></textarea>
            </div>
            <div class="mb-2">
              <button class="btn btn-sm btn-theme w-100">Order</button>
            </div>
          </div>
      </div>
    </div>
  </Layout>
  <BottomMenu/>