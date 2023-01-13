<script lang="ts">
    import { book } from "../../store";
    import { goto } from '@roxi/routify'
    import moment from 'moment';
    import axios from "axios";
    import { Preferences } from '@capacitor/preferences';
    import ModalLogin from "../../lib/component/ModalLogin.svelte";
    import { onMount } from "svelte";
    import Loading from "../../lib/component/Loading.svelte";

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
{#if unitRent && user}
    <main class="flex-shrink-0">
        <!-- Fixed navbar -->
        <header class="header">
            <div class="row">
                <div class="col-auto px-0">
                    <a href="../book/{unit.slug}" class="btn btn-link text-dark">
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

        <!-- page content start -->
        <div class="container mt-4">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="form-group floating-form-group active">
                        <p class="form-text">{user.name}</p>
                        <label class="floating-label">Name</label>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group floating-form-group active">
                        <p class="form-text">{user.email}</p>
                        <label class="floating-label">Email Address</label>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="form-group floating-form-group active">
                        <p class="form-text">{user.phone ?? 'xxx xxxx xxxx'}</p>
                        <label class="floating-label">Phone Number</label>
                    </div>

                </div>
                <div class="col-12 col-md-6">
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group floating-form-group active">
                                <p class="form-text">{checkin}</p>
                                <label class="floating-label">Checkin</label>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group floating-form-group active">
                                <p class="form-text">{checkout}</p>
                                <label class="floating-label">Checkout</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12 col-md-6 col-lg-4 mx-auto">  
                    <div class="card text-center text-white bg-info-gradient mb-4">
                        <div class="card-body-wrap">
                            <div class="card-body">{ unit?unit.name:'Loading...' }</div>
                        </div>
                    </div>
                    
                    {#if $book.duration=='year'}
                    <div class="form-group">
                        <label class="floating-label">Service Charge Pay</label>
                        <select class="form-control" bind:value={selected} on:change={() => {scCount=selected; hitung()}}>
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
            <div class="row my-4">
                <div class="col-12 col-md-6 col-lg-4 mx-auto">                    
                    <button on:click={()=>pay()} class="btn btn-block btn-danger btn-lg">Pay Now</button>
                </div>
            </div>
        </div>
    </main>
    {:else}
        <div class="container mt-4">
            <div class="row mt-3">
                <div class="col-12 col-md-6 col-lg-4 mx-auto">  
                    <div class="card text-center text-white bg-info-gradient mb-4">
                        <div class="card-body-wrap">
                            <div class="card-body">{ unit?unit.name:'Loading...' }</div>
                        </div>
                    </div>
                    
                    {#if $book.duration=='year'}
                    <div class="form-group">
                        <label class="floating-label">Service Charge Pay</label>
                        <select class="form-control" bind:value={selected} on:change={() => {scCount=selected; hitung()}}>
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
        <button on:click={()=>login()} class="text-center text-white btn btn-sm btn-warning w-100">Login</button>
        {#if unit}
        <a href="../book/{unit.slug}" class="text-center text-white btn btn-sm btn-primary mt-2 w-100">Back</a>
        {/if}
        <ModalLogin bind:isActive={isLogin} bind:user={user}/>
    {/if}
{/if}

<style>
    tr td{
        font-size: .8rem;
    }
</style>