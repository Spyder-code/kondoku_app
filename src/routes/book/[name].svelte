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
  import HeaderTitle from "../../lib/component/HeaderTitle.svelte";

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
    <!-- <HeaderTitle title={unit.name} back="property/{unit.slug}"/> -->
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
                <div class="input-group border-0" style="width: 40%; height:35px">
                    <input type="number" class="form-control text-center" bind:value={count} min=1 max=10 readonly style="font-size:.8rem">
                    <span class="input-group-text border-0" style="font-size:.7rem">/{duration}</span>
                </div>
                <div class="btn-group" style="width:20%; height:35px">
                    <button on:click={()=>{count++; check_out()}} class="no-attr">+</button>
                    <button on:click={()=>{count>1?count--:count=1; check_out()}} class="no-attr pb-2">-</button>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-2" style="gap: 10px;">
                <div>
                    <small>Checkin</small>
                    <Flatpickr class="text-center tgl" options={checkInOptions} bind:value={date_checkin} on:change={handleChangeCheckin} />
                </div>
                <div>
                    <small>Checkout</small>
                    <Flatpickr class="text-center tgl" options={checkOutOptions} bind:value={date_checkout} />
                </div>
            </div>
        </div>
        <div class="card-body border-top border-color">
            <div class="d-flex justify-content-between">
                Book {count} {duration}(s) <span class="text-theme"> {rupiah(price)}</span>
            </div>
            <!-- Button trigger modal -->
            <button on:click={()=>checkout()} class="mt-4 btn btn-sm w-100 btn-theme">
                Checkout
            </button>
            
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
    button.no-attr{
        width: 40px;
        border: 1px solid gray;
        background-color: transparent;
        font-size: 1.3rem;
    }
    button.no-attr:hover{
        background-color: #80D4FF;
    }
</style>