<script lang="ts">
    import BottomMenu from "../../lib/component/BottomMenu.svelte";
    import Layout from "../../lib/component/Layout.svelte";
    import {params, url} from '@roxi/routify'
    import axios from "axios";
    import Loading from "../../lib/component/Loading.svelte";

    let endpoint = import.meta.env.VITE_ENDPOINT;
    let app_url = import.meta.env.VITE_APP_URL;
    let unit = null;
    let apartment_facilities = null;
    let unit_facilities = null;
    axios.get(endpoint+'get-unit/'+$params.name)
        .then((res)=>{
            unit = res.data.unit;
            apartment_facilities = res.data.apartment_facilities;
            unit_facilities = res.data.unit_facilities;
        })
    const rupiah = (number)=>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
</script>

<Layout>
    <!-- <Header/> -->
    {#if unit}
    <div style="height: 200px; ">
        <div class="product-image-top" style="background-image: url('{unit.image}');">
            <div >
                <!-- <img src="{unit.image}" alt="" class="img-fluid"> -->
            </div>
        </div>
        <a href="/image/{unit.slug}" class="tag-images-count text-white bg-dark " >
            <i class="bi bi-image"></i>
            <span class="vm">{unit.unit_images.length}</span>
        </a>
    </div>
    <!-- page content start -->
    <div class="card-description pb-5">
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <p class="text-theme">{unit.name}</p>
                </div>
                <div class="col-auto">
                    <p class="small text-secondary">
                    </p>

                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p class="small vm">
                        <span class=" text-secondary">{unit.large} m<sup>2</sup></span>
                        <span class="text-warning"><i class="bi bi-star-fill"></i></span>
                        <span class=" text-secondary">| {unit.apartment.name}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="card-body border-top border-color">
            <div class="row">
                <div class="col-auto text-dark text-center">
                    <i class="bi bi-car-front-fill"></i>
                    <p class="small"><small>Parking</small></p>
                </div>
                <div class="col-auto text-dark text-center pl-0">
                    <i class="bi bi-water"></i>
                    <p class="small"><small>Poll</small></p>
                </div>
                <div class="col-auto text-dark text-center pl-0">
                    <i class="bi bi-flower1"></i>
                    <p class="small"><small>Garden</small></p>
                </div>
                <div class="col-auto ml-auto">
                    <p class="small text-secondary lists">
                        <span><i class="fas fa-bed"></i> {unit.bedroom} Bedroom</span> <br> 
                        <span><i class="fas fa-bathtub"></i> {unit.bathroom} Bathroom</span>
                    </p>
                </div>

            </div>
        </div>
        <div class="card-body border-top border-color">
            <p class="small text-secondary lists">{unit.apartment.address}</p>
            <!-- map -->
            <h6>Apartment Facilities</h6>
            <ul class="text-secondary small lists">
                {#each apartment_facilities as facility}
                    <li>{facility.name}</li>
                {:else}
                    <p>Tidak ada data</p>
                {/each}
            </ul>

            <h6>Unit Facilities</h6>
            <div class="row">
                <div class="col-6 text-secondary small lists">
                    <ul class="text-secondary small lists">
                        {#each unit_facilities.slice(0,Math.ceil(unit_facilities.length/2)) as facility}
                            <li>{facility.name}</li>
                        {/each}
                    </ul>
                </div>
                <div class="col-6">
                    <ul class="text-secondary small lists">
                        {#each unit_facilities.slice(Math.ceil(unit_facilities.length/2),unit_facilities.length) as facility}
                            <li>{facility.name}</li>
                        {/each}
                    </ul>
                </div>
            </div>


            <h6>Information</h6>
            <div class="text-secondary" style="font-size: .8rem;">
                {@html unit.description ?? 'Tidak Ada informasi'}
            </div>
            
            <!-- Button trigger modal -->
            <a href="../book/{unit.slug}" class="mt-4 btn btn-theme btn-sm w-100">
                Book Now
            </a>
            
        </div>
    </div>
    {:else}
        <Loading/>
    {/if}
    <BottomMenu/>
</Layout>