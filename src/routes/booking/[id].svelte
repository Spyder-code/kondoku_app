<script>
  import TagihanItem from "../../lib/component/TagihanItem.svelte";
  import BottomMenu from "../../lib/component/BottomMenu.svelte";
  import Layout from "../../lib/component/Layout.svelte";
  import HeaderTitle from "../../lib/component/HeaderTitle.svelte";
  import Empty from "../../lib/component/Empty.svelte";
  import { url } from '@roxi/routify'
    
</script>
<HeaderTitle title="Order Service"/>
<Layout>
  <div class="container mt-3">
    <div class="row">
      <div class="col-12 col-md-6 col-lg-6">
        <!-- <div class="card product-card-small mb-3 shadow">
            <div class="card-body">
                <div class="row">
                    <div class="col pl-0">
                        <div class="row">
                            <div class="col">
                                <p class="small text-dark">Complaint</p>
                            </div>
                            <div class="col-auto ml-3 text-right">
                                <p class="small vm">
                                    <span class=" text-secondary">Status:</span>
                                </p>
                            </div>
                        </div>
                        <div class="row no-gutters">
                            <div class="col">
                                <small class="small text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
                            </div>
                            <div class="col-auto ml-3 text-right">
                                <b class="small text-primary"><small style="text-transform: uppercase;">VERIFY</small></b>
                            </div>
                        </div>
                        <button class="btn btn-theme mt-2 btn-sm w-100">Deta</button>
                    </div>
                </div>
            </div>
        </div> -->
        <Empty/>
        <a href="{$url('/order/create')}" class="btn btn-theme btn-sm w-100 mt-3">Add Order</a>
      </div>
    </div>
  </div>
</Layout>
<BottomMenu/>