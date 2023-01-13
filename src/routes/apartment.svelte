<script>
    import BottomMenu from "../lib/component/BottomMenu.svelte";
    import Header from "../lib/component/Header.svelte";
    import Apartment from "../lib/component/Apartment.svelte";
    import { search } from '../store';
    import { goto } from "@roxi/routify";

    let name = '';
    const searchName = ()=>{
        search.set({
            duration:0,
            apartment:0,
            apartmentName:0,
            bedroom:0,
            typeAll:true,
            typeStudio:0,
            startDate:0,
            endDate:0,
            name:name,
        });
        $goto('/list');
    }
</script>

<main class="flex-shrink-0">
    <Header/>

    <!-- page content start -->
    <div class="container mt-4">
        <div class="form-group mb-0">
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control search" placeholder="Search Property" bind:value={name}>
                </div>
                <div class="col-auto pl-0">
                    <button class="sqaure-btn btn btn-info text-white" type="button" on:click={searchName}>
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="container mt-4">
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col">
                        <h6 class="text-dark my-1">
                            <svg xmlns='http://www.w3.org/2000/svg' class="icon-size-16 vm" viewBox='0 0 512 512'>
                                <title>kondoku-icon</title>
                                <path d='M80,212V448a16,16,0,0,0,16,16h96V328a24,24,0,0,1,24-24h80a24,24,0,0,1,24,24V464h96a16,16,0,0,0,16-16V212' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                <path d='M480,256,266.89,52c-5-5.28-16.69-5.34-21.78,0L32,256' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                <polyline points='400 179 400 64 352 64 352 133' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                            </svg>
                            <span class="vm ml-2">Apartment</span>
                        </h6>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row px-2">
                    <Apartment slice={false}/>
                </div>
            </div>
        </div>
    </div>
</main>

<!-- footer -->
<BottomMenu/>