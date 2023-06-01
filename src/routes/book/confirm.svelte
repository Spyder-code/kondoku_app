<script lang="ts">
    import { book } from "../../store";
    import { goto } from '@roxi/routify'
    import moment from 'moment';
    import axios from "axios";
    import { Preferences } from '@capacitor/preferences';
    import ModalLogin from "../../lib/component/ModalLogin.svelte";
    import { onMount } from "svelte";
    import Loading from "../../lib/component/Loading.svelte";
  import HeaderTitle from "../../lib/component/HeaderTitle.svelte";

    let url = import.meta.env.VITE_ENDPOINT;
    let checkin = moment($book.checkin).format('DD/MM/YYYY');
    let checkout = moment($book.checkout).format('DD/MM/YYYY');
    let transaction = null;
    let user = null;
    let unit = null;
    let unitRent = null;
    let scCount:number = $book.duration=='day'?0:($book.duration=='month'?$book.count:3);
    let unitPrice:number = 0;
    let scPrice:number = 0;
    let pbbPrice:number = 0;
    let depositePrice:number = 0;
    let total:number = 0;
    let selected:number = 3;
    let scOptions = [];
    let isLogin = user?false:true;
    let isLoading = false;

    if ($book.unitId) {
        axios.get(url+'unit/'+$book.unitId)
        .then((res)=>{
            unit=res.data.data;
            console.log(unit);
            
            axios.get(url+'unit-rent/'+$book.unitRentId)
            .then((res)=>{
                unitRent=res.data.data;
                hitung();
            });
        });
    }else{
        $goto('/')
    }

    const rupiah = (number)=>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    const login = ()=>{
        isLogin = !isLogin;
    }

    function isFloat(n){
        return Number(n) === n && n % 1 !== 0;
    }

    const hitung = ()=>{
        unitPrice = $book.price;
        depositePrice = unitRent.deposite;
        if ($book.duration=='day') {
            total = parseInt(unitPrice) + parseInt(depositePrice);
        }else if($book.duration=='month'){
            scPrice = parseInt(unit.service_charge) * parseInt(scCount);
            total = parseInt(unitPrice) + parseInt(depositePrice) + parseInt(scPrice);
        }else if($book.duration=='year'){
            scPrice = parseInt(unit.service_charge) * parseInt(scCount);
            pbbPrice = parseInt(unitRent.tax);
            total = parseInt(unitPrice) + parseInt(depositePrice) + parseInt(scPrice) + parseInt(pbbPrice);
            scOptions = [];
            for (let i = 4*parseInt($book.count); i >0 ; i--) {
                var c = (12*parseInt($book.count))/i;
                if (isFloat(c)==false) {
                    scOptions.push({
                        label: i+' Time(s)',
                        value: c
                    })
                }
            }
        }
    }

    const pay = ()=>{
        isLoading = true;
        let day;
        let sc;
        if ($book.duration=='day') {
            day = 'harian';
            sc = 0;
        }else if($book.duration=='month'){
            day = 'bulanan';
            sc = unit.service_charge;
        }else if($book.duration=='year'){
            day = 'tahunan';
            sc = unit.service_charge;
        }
        var data = {
            unit_rent_id:unitRent.id,
            unit_id:unit.id,
            user_id:user.id,
            check_in:moment($book.checkin).format('YYYY-MM-DD'),
            check_out:moment($book.checkout).format('YYYY-MM-DD'),
            type:day,
            count:$book.count,
            unit_price:unitRent.price,
            unit_total_price:unitPrice,
            owner_price:unitPrice,
            unit_deposite_price:depositePrice,
            unit_service_charge_price:sc,
            unit_service_charge_count:scCount,
            unit_tax_price:pbbPrice,
            total_price:total
        }

        axios.post(url+'booking-app',data)
        .then((res)=>{
            transaction = res.data;
            $goto('/pay',{
                transaction:transaction.id
            });
        });
    }

    onMount(async () => {
        const ret = await Preferences.get({ key: 'user' });
        user = JSON.parse(ret.value);
	});

</script>

{#if isLoading}
    <Loading/>
{:else}
{#if unit}
<HeaderTitle title="Payment Confirm" back="/book/{unit.slug}"/>
{/if}
    {#if unitRent && user}
        <main>
            <div class="container bg-white mt-4 pb-5" style="border-top-right-radius: 20px; border-top-left-radius: 20px; box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;">
                <div class="row py-3">
                    <div class="col-12">
                        <span class="text-theme"><i class="bi bi-info-circle"></i> Apartment Information</span>
                        <hr>
                        {#if unit}
                            <h6 style="font-size: .9rem;">{unit?unit.name:'-'}</h6>
                            <p class="small vm" style="font-size: .7rem;">
                                <span class=" text-secondary">{unit.large} m<sup>2</sup></span>
                                <span class="text-warning"><i class="bi bi-star-fill"></i></span>
                                <span class=" text-secondary">| {unit.apartment}</span>
                            </p>
                            <div class="row justify-content-center">
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="bi bi-water"></i>
                                    <p class="small"><small>Poll</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="bi bi-flower1"></i>
                                    <p class="small"><small>Garden</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="bi bi-box"></i>
                                    <p class="small"><small>{unit.furnish_type}</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="fas fa-bath"></i>
                                    <p class="small"><small>{unit.bathroom} Bathroom</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="fas fa-bed"></i>
                                    <p class="small"><small>{unit.bathroom} Bedroom</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="fas fa-calendar-check"></i>
                                    <p class="small"><small>Checkin: {checkin}</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="fas fa-calendar-alt"></i>
                                    <p class="small"><small>Checkout: {checkout}</small></p>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
                <span class="text-theme"><i class="bi bi-info-circle"></i> Account Information</span>
                <hr>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="form-group floating-form-group active">
                            <label class="floating-label">Name</label>
                            <p class="form-text">{user.name}</p>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group floating-form-group active">
                            <label class="floating-label">Email Address</label>
                            <p class="form-text">{user.email}</p>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group floating-form-group active">
                            <label class="floating-label">Phone Number</label>
                            <p class="form-text">{user.phone ?? 'xxx xxxx xxxx'}</p>
                        </div>
                    </div>
                </div>
                <span class="text-theme"><i class="bi bi-info-circle"></i> Transaction</span>
                <hr>
                <div class="row mt-3">
                    <div class="col-12 col-md-6 col-lg-4 mx-auto">  
                        {#if $book.duration=='year'}
                        <div class="form-group">
                            <label class="floating-label" style="font-size: .8rem;">Service Charge Pay</label>
                            <select class="w-100 py-1 px-3" style="font-size: .8rem;" bind:value={selected} on:change={() => {scCount=selected; hitung()}}>
                                {#each scOptions as item}
                                    <option value="{item.value}">{item.label}</option>
                                {:else}
                                    Loading...
                                {/each}
                            </select>
                        </div>
                        {/if}
                        
                        <table class="table no-border mb-0">
                            <tbody class="font-weight-medium">
                                <tr>
                                    <td>Book {$book.count} {$book.duration}(s)</td>
                                    <td class="text-right">{ rupiah(unitPrice) }</td>
                                </tr>
                                <tr>
                                    <td>Deposite</td>
                                    <td class="text-right">{ rupiah(depositePrice) }</td>
                                </tr>
                                {#if $book.duration!='day'}
                                <tr>
                                    <td>Service Charge {scCount} month(s) </td>
                                    <td class="text-right">{ rupiah(scPrice) }</td>
                                </tr>
                                {/if}
                                {#if $book.duration=='year'}
                                <tr>
                                    <td>PBB </td>
                                    <td class="text-right">{ rupiah(pbbPrice) }</td>
                                </tr>
                                {/if}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total</td>
                                    <td class="text-right">{ rupiah(total) }</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="bottom-fix">
                    <div class="d-flex gap-2 justify-content-center">
                        <div>
                            <button on:click={()=>pay()} class="text-center text-white btn btn-sm btn-theme" style="width:250px">Pay Now</button>
                        </div>
                    </div>
                </div> 
            </div>
        </main>
    {:else}
        <main>
            <div class="container mt-4 bg-white pb-5" style="border-top-right-radius: 20px; border-top-left-radius: 20px; box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;">
                <div class="row py-3">
                    <div class="col-12">
                        <span class="text-theme"><i class="bi bi-info-circle"></i> Apartment Information</span>
                        <hr>
                        {#if unit}
                            <h6 style="font-size: .9rem;">{unit?unit.name:'-'}</h6>
                            <p class="small vm" style="font-size: .7rem;">
                                <span class=" text-secondary">{unit.large} m<sup>2</sup></span>
                                <span class="text-warning"><i class="bi bi-star-fill"></i></span>
                                <span class=" text-secondary">| {unit.apartment}</span>
                            </p>
                            <div class="row justify-content-center">
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="bi bi-water"></i>
                                    <p class="small"><small>Poll</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="bi bi-flower1"></i>
                                    <p class="small"><small>Garden</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="bi bi-box"></i>
                                    <p class="small"><small>{unit.furnish_type}</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="fas fa-bath"></i>
                                    <p class="small"><small>{unit.bathroom} Bathroom</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="fas fa-bed"></i>
                                    <p class="small"><small>{unit.bathroom} Bedroom</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="fas fa-calendar-check"></i>
                                    <p class="small"><small>Checkin: {checkin}</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <i class="fas fa-calendar-alt"></i>
                                    <p class="small"><small>Checkout: {checkout}</small></p>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4 mx-auto">  
                        <span class="text-theme"><i class="bi bi-info-circle"></i> Transaction</span>
                        <hr>    
                        {#if $book.duration=='year'}
                        <div class="py-2">
                            <label class="floating-label" style="font-size: .8rem;">Service Charge Pay</label>
                            <select class="w-100 py-1 px-3" style="font-size: .8rem;" bind:value={selected} on:change={() => {scCount=selected; hitung()}}>
                                {#each scOptions as item}
                                    <option value="{item.value}">{item.label}</option>
                                {:else}
                                    Loading...
                                {/each}
                            </select>
                        </div>
                        {/if}
                        
                        <table class="table no-border mb-0">
                            <tbody class="font-weight-medium">
                                <tr>
                                    <td>Book {$book.count} {$book.duration}(s)</td>
                                    <td class="text-right">{ rupiah(unitPrice) }</td>
                                </tr>
                                <tr>
                                    <td>Deposite</td>
                                    <td class="text-right">{ rupiah(depositePrice) }</td>
                                </tr>
                                {#if $book.duration!='day'}
                                <tr>
                                    <td>Service Charge {scCount} month(s) </td>
                                    <td class="text-right">{ rupiah(scPrice) }</td>
                                </tr>
                                {/if}
                                {#if $book.duration=='year'}
                                <tr>
                                    <td>PBB </td>
                                    <td class="text-right">{ rupiah(pbbPrice) }</td>
                                </tr>
                                {/if}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total</td>
                                    <td class="text-right">{ rupiah(total) }</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <div class="bottom-fix">
                <div class="d-flex gap-2 justify-content-center">
                    <div>
                        <button on:click={()=>login()} class="text-center text-white btn btn-sm btn-warning" style="width:150px">Login</button>
                    </div>
                    {#if unit}
                    <div>
                        <a href="../book/{unit.slug}" class="text-center text-white btn btn-sm btn-primary" style="width:150px">Back</a>
                    </div>
                    {/if}
                </div>
            </div>  
        </main>
        <ModalLogin bind:isActive={isLogin} bind:user={user}/>
    {/if}
{/if}

<style>
    tr td{
        font-size: .8rem;
    }
</style>