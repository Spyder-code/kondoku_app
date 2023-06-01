<script>
    import {onMount} from "svelte";
    import BottomMenu from "../../lib/component/BottomMenu.svelte";
    import Layout from "../../lib/component/Layout.svelte";
    import { Images } from "svelte-images";
    import {params, url} from '@roxi/routify'
    import Header from "../../lib/component/Header.svelte";
  import HeaderTitle from "../../lib/component/HeaderTitle.svelte";

    let endpoint = import.meta.env.VITE_ENDPOINT;
    let images = [];
    let unit_name = titleize($params.name);

    async function fetchData() {
        const response = await fetch(`${endpoint}unit-images/${$params.name}`);
        images = await response.json();
    };
    
    onMount(()=> {
        // load first batch onMount
        fetchData();
    })

    function titleize(slug) {
        var words = slug.split("-");
        return words.map(function(word) {
            return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
        }).join(' ');
    }


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

<HeaderTitle title={unit_name} back="/property/{$params.name}"/>
<Layout>
    <div class="container-fluid mt-3 pb-3">
        <div class="row justify-content-center">
            <div class="col-12 text-center" style="height: 450px; overflow:scroll">
                <Images numCols={2} {images} gutter={2} />
            </div>
            <div class="col-12 pb-5">
                <div class="container-fluid px-0 mt-4 text-center">
                    <a class="btn btn-sm btn-primary px-4 my-1 w-100" href="/property/{$params.name}">Detail Unit</a>
                    <a class="btn btn-sm btn-success px-4 my-1 w-100" href="/book/{$params.name}">Booking Unit</a>
                </div>
            </div>
        </div>
    </div>
    <BottomMenu/>
</Layout>
