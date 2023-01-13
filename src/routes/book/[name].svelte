<script lang="ts">
    import BottomMenu from "../../lib/component/BottomMenu.svelte";
    import Layout from "../../lib/component/Layout.svelte";
    import {params} from '@roxi/routify'
    import axios from "axios";
    import Loading from "../../lib/component/Loading.svelte";
    import Flatpickr from 'svelte-flatpickr'
    import iziToast from 'izitoast'
    import 'izitoast/dist/css/iziToast.css'
    import { goto } from '@roxi/routify'
    import { book } from "../../store";

    let co;
    let count = 1;
    let price = 0;
    let duration = null;
    let date_checkin = null;
    let date_checkout = null;
    let url = import.meta.env.VITE_ENDPOINT;
    let unit = null;
    let unitRentId = null;
    let unitRents = [];
    let checkInOptions = {
        altInput: true,
        altFormat: "d/m/Y",
        dateFormat: "Y-m-d",
        minDate: "today",
        disableMobile: true,
    };
    let checkOutOptions = {
        altInput: true,
        altFormat: "d/m/Y",
        dateFormat: "Y-m-d",
        clickOpens: false,
        disableMobile: true,
    };
    

    axios.get(url+'get-unit/'+$params.name)
    .then((res)=>{
        unit = res.data.unit;
        let unitRent = res.data.unit_rents;
        unitRents = unitRent;
        unitRent.map(item=>{
            if(item.price>0){
                duration = item.duration;
                price = item.price;
                unitRentId = item.id;
                check_out();
            }
        })
        axios.get(url+'unit/'+unit.id+'/disabled-date')
        .then((res)=>{
            checkInOptions = {
                altInput: true,
                altFormat: "d/m/Y",
                dateFormat: "Y-m-d",
                minDate: "today",
                disableMobile: true,
                disable: res.data,
            };
            
        })
    })

    const rupiah = (number)=>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
    const changeDuration = (id,name,rp) =>{
        unitRentId = id;
        duration = name;
        price = rp;
        check_out();
    }

    function handleChangeCheckin(event) {
		const [ selectedDates, dateStr ] = event.detail;
        date_checkin = dateStr; 
        check_out();
		// console.log({ selectedDates, dateStr });
	}

    function check_out() {
        if (date_checkin) {
            if(duration=='day'){
                var a = new Date(date_checkin);
                co = a.addDays(count);
            }
            if(duration=='month'){
                var a = new Date(date_checkin);
                co = a.addMonths(count);
            }
            if(duration=='year'){
                var a = new Date(date_checkin);
                co = a.addYears(count);
            }
            const params = {
                start: date_checkin,
                end: co,
                unit_id: unit.id
            };

            axios.post(url+'check-min-date',{checkin: date_checkin,
                    type: duration,
                    count: count,
                    unit_id: unit.id})
                .then((res)=>{
                    let response = res.data;
                    if(response>0){
                        count = response
                        iziToast.show({
                            title: 'Info!',
                            theme: 'light',
                            color: 'red',
                            position: 'topRight',
                            message: 'Min book '+response+' day(s)'
                        });
                        check_out();
                    }
                })
            axios.post(url+'get-price',{checkin: date_checkin,
                type: duration,
                count: count,
                unit_id: unit.id})
            .then((res)=>{
                console.log(res);
                
                let response = res.data;
                price = response
            })

            axios.get(url+'check-booking-date',{params})
                .then((res)=>{
                    let response = res.data;
                    if (response.length>0) {
                        for (let i = 0; i < response.length; i++) {
                            const item = response[i];
                            if(co!=item){
                                i = response.length
                                iziToast.show({
                                    title: 'Info!',
                                    theme: 'light',
                                    color: 'red',
                                    position: 'topRight',
                                    message: 'The date already booked!'
                                });
                            }else{
                                date_checkout = co;
                            }
                        }
                    }else{
                        date_checkout = co;
                    }
                })
        }
    }

    const checkout = ()=>{
        
        book.set({
            checkin:date_checkin,
            checkout:date_checkout,
            duration:duration,
            count:count,
            unitId:unit.id,
            unitRentId:unitRentId,
            price:price
        });
        $goto('/book/confirm');
    }
    
    Date.isLeapYear = function (year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    };

    Date.getDaysInMonth = function (year, month) {
        return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    };

    Date.prototype.isLeapYear = function () {
        return Date.isLeapYear(this.getFullYear());
    };

    Date.prototype.getDaysInMonth = function () {
        return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
    };

    Date.prototype.addMonths = function (value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, this.getDaysInMonth()));
        return this;
    };

    Date.prototype.minusMonths = function (value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() - value);
        this.setDate(Math.min(n, this.getDaysInMonth()));
        return this;
    };

    Date.prototype.addYears = function (value) {
        var n = this.getDate();
        this.setDate(1);
        this.setFullYear(this.getFullYear() + value);
        this.setDate(Math.min(n, this.getDaysInMonth()));
        return this;
    };

    Date.prototype.addDays = function (value) {
        var n = this.getDate();
        this.setDate(n + value);
        return this;
    };
</script>

<Layout>
    <!-- <Header/> -->
    {#if unit}
    <header class="header">
        <div class="row">
            <div class="col-auto px-0">
                <a href="../property/{unit.slug}" class="btn btn-link text-dark">
                    <svg xmlns='http://www.w3.org/2000/svg' class="icon-size-24" viewBox='0 0 512 512'>
                        <title>ionicons-v5-a</title>
                        <polyline points='244 400 100 256 244 112' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px' />
                        <line x1='120' y1='256' x2='412' y2='256' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px' />
                    </svg>
                </a>
            </div>
            <div class="text-left col align-self-center">
                <h5>Book room</h5>
            </div>
        </div>
    </header>
    <div class="product-image-top">
        <div class="background" style="background-image: url('{unit.image}');">
            <img src="{unit.image}" alt="" style="display: none;">
        </div>
        <a href="/image/{unit.slug}" class="tag-images-count text-white bg-dark " >
            <i class="bi bi-image"></i>
            <span class="vm">{unit.unit_images.length}</span>
        </a>
    </div>
    <!-- page content start -->
    <div class="container-fluid top-30">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <p>{unit.name}</p>
                    </div>
                    <div class="col-auto">
                        <p class="small text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-size-16" viewBox="0 0 512 512">
                                <title>ionicons-v5-l</title>
                                <rect x="32" y="80" width="448" height="256" rx="16" ry="16" transform="translate(512 416) rotate(180)" style="fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px"></rect>
                                <line x1="64" y1="384" x2="448" y2="384" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></line>
                                <line x1="96" y1="432" x2="416" y2="432" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></line>
                                <circle cx="256" cy="208" r="80" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></circle>
                                <path d="M480,160a80,80,0,0,1-80-80" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path>
                                <path d="M32,160a80,80,0,0,0,80-80" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path>
                                <path d="M480,256a80,80,0,0,0-80,80" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path>
                                <path d="M32,256a80,80,0,0,1,80,80" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path>
                            </svg>
                        </p>

                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="small vm">
                            <span class=" text-secondary">{unit.large} m<sup>2</sup></span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-size-12 vm" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path fill="#FFD500" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                            </svg>
                            <span class=" text-secondary">| {unit.apartment.name}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="card-body border-top border-color">
                <div class="d-flex justify-content-center rounded" style="gap: 10px;">
                    {#each unitRents as rent}
                        {#if rent.price>0}
                            {#if duration == rent.duration}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <label for="duration-{rent.duration}" class="text-center label-radio label-active" on:click={changeDuration(rent.id,rent.duration,rent.price)}>
                                    <input type="radio" name="duration" id="duration-{rent.duration}"> {rent.duration[0].toUpperCase() + rent.duration.substring(1)}
                                </label>
                            {:else}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <label for="duration-{rent.duration}" class="text-center label-radio" on:click={changeDuration(rent.id,rent.duration,rent.price)}>
                                    <input type="radio" name="duration" id="duration-{rent.duration}"> {rent.duration[0].toUpperCase() + rent.duration.substring(1)}
                                </label>
                            {/if}
                        {/if}
                        {:else}
                        <p>Waiting...</p>
                    {/each}
                </div>
                <div class="d-flex justify-content-center mt-2" style="gap: 10px;">
                    <div class="input-group" style="width: 40%;">
                        <input type="number" class="form-control p-0 text-center" bind:value={count} min=1 max=10 readonly style="font-size:.8rem">
                        <div class="input-group-append">
                            <span class="input-group-text" style="font-size:.7rem">/{duration}</span>
                        </div>
                    </div>
                    <div class="btn-group" style="width:20%">
                        <button on:click={()=>{count++; check_out()}} class="btn btn-sm" style="font-size: 30pt;">+</button>
                        <button on:click={()=>{count>1?count--:count=1; check_out()}} class="btn btn-sm pb-2" style="font-size: 30pt;">-</button>
                    </div>
                </div>
                <div class="d-flex justify-content-center mt-2" style="gap: 10px;">
                    <div>
                        <small>Checkin</small>
                        <Flatpickr class="text-center" options={checkInOptions} bind:value={date_checkin} on:change={handleChangeCheckin} />
                    </div>
                    <div>
                        <small>Checkout</small>
                        <Flatpickr class="text-center" options={checkOutOptions} bind:value={date_checkout} />
                    </div>
                </div>
            </div>
            <div class="card-body border-top border-color">
                <div class="d-flex justify-content-between">
                    Book {count} {duration}(s) <span> {rupiah(price)}</span>
                </div>
                <!-- Button trigger modal -->
                <button on:click={()=>checkout()} class="mt-4 btn btn-info btn-block btn-lg">
                    Checkout
                </button>
                
            </div>
        </div>
    </div>
    {:else}
        <Loading/>
    {/if}
    <BottomMenu/>
</Layout>

<style>
    .label-radio{
        width: 100px;
        padding: 10px 0;
        background-color: antiquewhite;
        border-radius: 20px;
        color: rgb(0, 0, 0);
        font-size: .7rem;
    }
    input[type=radio]{
        display: none;
    }
    .label-active{
        background-color: #80D4FF;
        color: white;
    }
</style>