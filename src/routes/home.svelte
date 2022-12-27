<script lang="ts">
    import UnitSliderOne from '../lib/component/UnitSliderOne.svelte';
    import BottomMenu from '../lib/component/BottomMenu.svelte';
    import Header from '../lib/component/Header.svelte';
    import Apartment from '../lib/component/Apartment.svelte';
    import axios from 'axios';
    import { Preferences } from '@capacitor/preferences';
    import { search } from '../store';
    import { goto } from "@roxi/routify";

    let url = import.meta.env.VITE_ENDPOINT;
    let app_url = import.meta.env.VITE_APP_URL;
    let units = [];
    let units1 = [];
    let user;
    let name = '';
    axios.get(url+'unit')
    .then((res)=>{
        units = res.data;
    })
    axios.get(url+'unit?page=2')
    .then((res)=>{
        units1 = res.data;
    })

    async function getUser() {
        const ret = await Preferences.get({ key: 'user' });
        user = JSON.parse(ret.value);
    }

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

    getUser();
    
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
                    <!-- <div class="col-auto">
                        <div class="dropdown">
                            <a class="btn btn-link text-secondary py-0 dropdown-toggle no-caret" href="#" role="button" id="dropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg xmlns='http://www.w3.org/2000/svg' class="icon-size-16" viewBox='0 0 512 512'>
                                    <title>ionicons-v5-f</title>
                                    <circle cx='256' cy='256' r='32' style='fill:none;stroke:#999999;stroke-miterlimit:10;stroke-width:32px' />
                                    <circle cx='416' cy='256' r='32' style='fill:none;stroke:#999999;stroke-miterlimit:10;stroke-width:32px' />
                                    <circle cx='96' cy='256' r='32' style='fill:none;stroke:#999999;stroke-miterlimit:10;stroke-width:32px' />
                                </svg>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink2">
                                <a class="dropdown-item" href="#">Load more</a>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="card-body">
                <div class="row px-2">
                    <Apartment/>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid px-0 mt-4">
        <!-- Swiper -->
        <UnitSliderOne units={units} app_url={app_url}/>
    </div>

    <div class="container-fluid px-0 mt-2">
        <!-- Swiper -->
        <UnitSliderOne units={units1} app_url={app_url}/>
    </div>

    <div class="container-fluid px-0 mt-4 text-center">
        <a class="btn btn-sm btn-primary px-4" href="/list" style="width:200px">Load More</a>
    </div>

    <!-- PWA add to home display -->
    <div class="container mt-4">
        <div class="card" id="addtodevice">               
            <div class="card-body">
                <div class="row">
                    <div class="col-auto align-self-center">
                        <img src="img/logo/fav-icon.png" class="rounded mr-2 " alt="...">
                    </div>
                    <div class="col text-secondary pl-0">
                        <h6 class="text-dark">Join <span class="font-weight-bold">Property Agent</span></h6>
                        <p class=" text-secondary">Safe and reliable. Quick sell. Quick rent.</p>
                        <button class="btn btn-sm btn-primary px-4" id="addtohome">Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- PWA add to home display -->
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">
                <h6 class="text-dark">
                    <i class="bi bi-house"></i>
                    <span class="ml-2 vm">The Highlights</span>
                </h6>
            </div>
            <div class="card-body px-0 pt-0">
                <div class="list-group list-group-flush border-top border-color">
                    <a href="about.html" class="list-group-item list-group-item-action border-color">Apartment</a>
                    <a href="analytics.html" class="list-group-item list-group-item-action border-color">Unit 1 Bedroom</a>
                    <a href="bookings.html" class="list-group-item list-group-item-action border-color">Unit 2 Bedroom</a>
                    <a href="buynow.html" class="list-group-item list-group-item-action border-color">Unit 3 Bedroom</a>
                    <a href="error.html" class="list-group-item list-group-item-action border-color">Studio</a>
                    <!-- <a href="pages.html" class="list-group-item list-group-item-action border-color text-primary text-center">More 20+ pages</a> -->
                </div>
            </div>
        </div>
    </div>
    <div class="container my-4">
        <div class="card">
            <div class="card-body">
                <h6 class="text-secondary">KONDOKU</h6>
                <img src="img/logo/kondoku.png" alt="KONDOKU" class="img-fluid" style="max-height: 60px;">
                <p class="text-secondary mt-3 ml-2">Jalan Pakuwon Indah, Tokan C5, Waterplace Residence, Surabaya Jawa Timur, 60216.</p>
                <ul class="list-group">
                    <li class="list-group-item text-secondary">
                        <div class="d-flex justify-content-between">
                            <span><i class="mr-2 bi bi-telephone"></i> (031) 7393240</span>
                            <a href="tel:0317393240" style="font-size: .7rem; width:80px;" class="text-center rounded border border-primary px-3 py-1">Call</a>
                        </div>
                    </li>
                    <li class="list-group-item text-secondary">
                        <div class="d-flex justify-content-between">
                            <span><i class="mr-2 bi bi-phone"></i> 0812 3111 1179</span>
                            <a href="https://wa.me/6281231111179" style="font-size: .7rem; width:80px;" class="text-center rounded border border-primary px-3 py-1">Message</a>
                        </div>
                    </li>
                    <li class="list-group-item text-secondary">
                        <div class="d-flex justify-content-between">
                            <span><i class="mr-2 bi bi-envelope"></i> cs@kondoku.co.id</span>
                            <a href="mailto:cs@kondoku.co.id" style="font-size: .7rem; width:80px;" class="text-center rounded border border-primary px-3 py-1">Message</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</main>

<!-- footer -->
<BottomMenu/>

<!-- filter menu -->
<!-- <div class="filter">
    <div class="container filters-container">
        <button class="btn btn-danger small-btn filter-btn close text-white"><svg xmlns='http://www.w3.org/2000/svg' class="icon-size-24" viewBox='0 0 512 512'>
                <title>kondoku-icon</title>
                <line x1='368' y1='368' x2='144' y2='144' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                <line x1='368' y1='144' x2='144' y2='368' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
            </svg></button>

        <h5 class="mb-0">
            Filter Criteria
        </h5>

        <div class="form-group floating-form-group active">
            <select class="form-control floating-input">
                <option selected>Surabaya Barat</option>
                <option>Surabaya Timur</option>
            </select>
            <label class="floating-label">Select Location</label>
        </div>

        <div class="form-group floating-form-group active">
            <select class="form-control floating-input">
                <option selected>Orchard</option>
                <option>Tanglin</option>
                <option>Anderson</option>
                <option>Benson</option>
                <option>Waterplace</option>
            </select>
            <label class="floating-label">Select Apartment</label>
        </div>

        <div class="form-group floating-form-group active">
            <select class="form-control floating-input">
                <option selected>1 Bedroom</option>
                <option>2 Bedroom</option>
                <option>3 Bedroom</option>
                <option>Studio</option>
            </select>
            <label class="floating-label">Select Type</label>
        </div>

        <div class="form-group floating-form-group active">
            <select class="form-control floating-input">
                <option selected>Daily</option>
                <option>Montly</option>
                <option>Yearly</option>
            </select>
            <label class="floating-label">Select Duration</label>
        </div>

        <button class="btn btn-info btn-rounded btn-block">Search</button>
        <br>

    </div>
</div>
<div class="filter-backdrop"></div> -->