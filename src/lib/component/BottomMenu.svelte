<script lang="ts">
    import { isActive, url, goto } from "@roxi/routify";
    import axios from "axios";
    import 'boxicons'
    import moment from "moment";
    import { search } from "../../store";

    let duration = 'days';
    let apartments = null;
    let apartment = 'all';
    let type = ['all'];
    let bedroom = [];
    let typeAll = true;
    let typeStudio = false;
    let checkin = moment(Date.now()).format('YYYY-MM-DD');
    let checkout = moment(checkin).add(1,'days').format('YYYY-MM-DD');
    let endpoint = import.meta.env.VITE_ENDPOINT;

    axios.get(endpoint+'apartment')
    .then((res:any)=>{
        apartments = res.data;
    })

    const changeDuration = (type: any = duration)=>{
        duration = type;
        checkout = moment(checkin).add(1,type).format('YYYY-MM-DD');
    }

    const updateType = (name:any)=>{
        let array = type;
        array.indexOf(name) === -1 ? array.push(name) : array.splice(array.indexOf(name), 1);
        typeAll = !!type.find((str) => str === 'all');
        typeStudio = !!type.find((str) => str === 'studio');
        if (name!='studio'&&name!='all') {
            let bed = bedroom;
            bed.indexOf(name) === -1 ? bed.push(name) : bed.splice(bed.indexOf(name), 1);
            bedroom = bed;
        }
        if (name=='all') {
            type = ['all'];
            typeAll = true;
        }else{
            typeAll ? array.splice(array.indexOf('all'), 1):'';
            type = array;
            typeAll = false;
        }
    }

    const searchSubmit = ()=>{
        let slice = duration.slice(0, -1);
        let isApartment = apartment=='all'?0:apartment;
        let isBedroom = bedroom.length>0?bedroom:0;
        search.set({
            duration:slice,
            apartment:isApartment,
            bedroom:isBedroom,
            typeAll:typeAll?typeAll:0,
            typeStudio:typeStudio?typeStudio:0,
            startDate:checkin,
            endDate:checkout,
        });

        $goto('/list');
    }
</script>

<footer class="footer">
    <div class="container">
        <ul class="nav nav-pills nav-justified">
            <li class="nav-item">
                <a class="nav-link {$isActive('/home')?'active':''}" href="{$url('/home')}">
                    <span>
                        <i class="nav-icon bi bi-house"></i>
                        <span class="nav-text">Home</span>
                    </span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {$isActive('/list')||$isActive('/property/[name]')||$isActive('/book/[name]')?'active':''}" href="{$url('/list')}">
                    <span>
                        <i class="nav-icon bi bi-binoculars"></i>
                        <span class="nav-text">Find Unit</span>
                    </span>
                </a>
            </li>

            <li class="nav-item centerbutton">
                <button type="button" class="nav-link" data-toggle="modal" data-target="#menumodal" id="centermenubtn" style="outline: none;">
                    <span class="theme-radial-gradient">
                        <i class="bi bi-grid" style="font-size:22px;"></i>
                    </span>
                </button>
            </li>

            <li class="nav-item">
                <a class="nav-link {$isActive('/cart')?'active':''}" href="{$url('/cart')}">
                    <span>
                        <i class="nav-icon bi bi-bag"></i>
                        <span class="nav-text">My Cart</span>
                    </span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="wallet.html">
                    <span>
                        <i class="nav-icon bi bi-person"></i>
                        <span class="nav-text">Account</span>
                    </span>
                </a>
            </li>
        </ul>
    </div>
</footer>

<!-- Menu Modal -->
<div class="modal fade" id="menumodal" tabindex="-1" aria-hidden="true" data-backdrop="false">
    <div class="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content shadow">
            <div class="modal-body">
                <div class="d-flex justify-content-between">
                    <h6><span class="fw-bold">Rent Property Hassle-Free!</span></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <hr>
                <div class="text-center d-flex mb-4" style="justify-content: center;">
                    <div class="d-flex justify-content-centar" style="gap:5px">
                        <button on:click={()=>{changeDuration('days')}} class="text-center btn py-0 label-duration {duration=='days'?'label-duration-active':''}">
                            <div class="rounded" style="font-size:.6rem">Daily</div>
                        </button>
                        <button on:click={()=>{changeDuration('months')}} class="text-center btn py-0 label-duration {duration=='months'?'label-duration-active':''}">
                            <div class="rounded" style="font-size:.6rem">Monthly</div>
                        </button>
                        <button on:click={()=>{changeDuration('years')}} class="text-center btn py-0 label-duration {duration=='years'?'label-duration-active':''}">
                            <div class="rounded" style="font-size:.6rem">Yearly</div>
                        </button>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-5 px-0 pl-4">
                        <input type="date" on:change={()=>changeDuration()} bind:value={checkin} class="input-date" min="{checkin}">
                    </div>
                    <div class="col-2 px-1">
                        <p class="text-center" style="font-size: .7rem;">s/d</p>
                    </div>
                    <div class="col-5 px-0 pr-3">
                        <input type="date" bind:value={checkout} class="input-date" min="{checkout}">
                    </div>
                </div>
                <div class="d-flex mb-3">
                    <box-icon class="mt-1 mr-3 px-2" size="17px" name="building-house" style="border-right: 1px solid black;"></box-icon>
                    <select class="apartment-select" bind:value={apartment}>
                        <option value="all">All</option>
                        {#if apartments}
                            {#each apartments as item}
                                <option value="{item.value}">{item.label}</option>
                            {/each}
                        {/if}
                    </select>
                </div>
                <div class="d-flex mb-4">
                    <box-icon class="mt-1 mr-3 px-2" size="17px" name="bed" style="border-right: 1px solid black;"></box-icon>
                    <button on:click={()=>updateType('all')} class="text-center label-duration btn px-0 py-0 mx-1 {!!type.find((str) => str === 'all')?'label-duration-active':''}">
                        <div class="rounded" style="font-size:.6rem">All</div>
                    </button>
                    <button on:click={()=>updateType('studio')} class="text-center label-duration btn px-0 py-0 mx-1 {!!type.find((str) => str === 'studio')?'label-duration-active':''}">
                        <div class="rounded" style="font-size:.6rem">STUDIO</div>
                    </button>
                    <button on:click={()=>updateType('1')} class="text-center label-duration btn px-0 py-0 mx-1 {!!type.find((str) => str === '1')?'label-duration-active':''}">
                        <div class="rounded" style="font-size:.6rem">1 BR</div>
                    </button>
                    <button on:click={()=>updateType('2')} class="text-center label-duration btn px-0 py-0 mx-1 {!!type.find((str) => str === '2')?'label-duration-active':''}">
                        <div class="rounded" style="font-size:.6rem">2 BR</div>
                    </button>
                    <button on:click={()=>updateType('3')} class="text-center label-duration btn px-0 py-0 mx-1 {!!type.find((str) => str === '3')?'label-duration-active':''}">
                        <div class="rounded" style="font-size:.6rem">3 BR</div>
                    </button>
                </div>
                <button on:click={()=>searchSubmit()} class="btn btn-success btn-sm w-100">Search</button>
            </div>
        </div>
    </div>
</div>

<style>
    .label-duration{
        width: 100px;
        background-color: antiquewhite;
        border-radius: 20px;
        color: rgb(0, 0, 0);
        font-size: .7rem;
    }
    .label-duration-active{
        background-color: #80D4FF;
        color: white;
    }
    .apartment-select{
        width: 100%;
        text-decoration: none;
        border: none;
        border-bottom: 1px solid violet;
        font-size: .8rem;
    }
    .input-date{
        width: 100%;
        text-decoration: none;
        border: none;
        border-bottom: 1px solid violet;
        font-size: .7rem;
        outline: none;
        text-align: center;
    }
    ::-webkit-calendar-picker-indicator{
        background-color: #ffffff;
        padding: 5px;
        cursor: pointer;
        border-radius: 3px;
    }
</style>