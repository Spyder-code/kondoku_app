<script>
    import {onMount} from "svelte";
    import BottomMenu from "../lib/component/BottomMenu.svelte";
    import Layout from "../lib/component/Layout.svelte";
    import { Images } from "svelte-images";
    import {params} from '@roxi/routify'
    import Header from "../lib/component/Header.svelte";
    let url = import.meta.env.VITE_ENDPOINT;
    let images = [];
    let unit_id = $params.unit_id;
    let unit_name = $params.unit_name;

    async function fetchData() {
        const response = await fetch(`${url}unit-images/${unit_id}`);
        images = await response.json();
    };
    
    onMount(()=> {
        // load first batch onMount
        fetchData();
    })


</script>

<style>
    .gallery {
      display: flex;
      flex-flow: row wrap;
    }
  
    img {
      width: 100%;
      height: auto !important;
      cursor: pointer;
    }
    img:hover {
      opacity: 0.5;
      filter: grayscale(0.5) blur(1px);
    }
    main{
        padding-top: 0px !important;
    }
  </style>

<a class="back" href="#">
    <i class="bi bi-arrow-left"></i>
</a>
<Layout>
    <Header/>
    <div class="container">
        <div class="row justify-content-center d-flex">
            <div class="col-12">
                <p>{unit_name}</p>
                <Images numCols={2} {images} gutter={2} />
            </div>
            <div class="col-12">
                <div class="container-fluid px-0 mt-4 text-center">
                    <a class="btn btn-sm btn-success px-4" href="/property/{unit_name}" style="width:200px">Info Unit</a>
                </div>
            </div>
        </div>
    </div>
    <BottomMenu/>
</Layout>
