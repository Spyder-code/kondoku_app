<script lang="ts">
    import {params, url} from '@roxi/routify'
    import axios from 'axios';
    import UnitCart from '../lib/component/UnitCart.svelte';
    import Loading from '../lib/component/Loading.svelte';
    import Midtrans from '../lib/component/Midtrans.svelte';

    let endpoint = import.meta.env.VITE_ENDPOINT;
    let app_url = import.meta.env.VITE_APP_URL;
    let transaction_id = $params.transaction
    let transaction = null;
    let isLoading = false;

    const getTransaction = ()=>{
        isLoading = true;
        setTimeout(() => {
            axios.get(endpoint+'transaction/'+transaction_id)
            .then((res)=>{
                transaction=res.data
                onLoaded();
            })
            isLoading = false;
        }, 1000);
    }

    function onLoaded() {
        snap.pay(transaction.token_midtrans, {
            // Optional
            onSuccess: function(result){
            /* You may add your own js here, this is just example */ document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            },
            // Optional
            onPending: function(result){
            /* You may add your own js here, this is just example */ document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            },
            // Optional
            onError: function(result){
            /* You may add your own js here, this is just example */ document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
            }
        });
    }

    const resetPayment = ()=>{
        axios.get(app_url+'sync/payment-token/'+transaction.booking_id)
            .then((res)=>{
                transaction = res.data.transaction;
                onLoaded();
            });
    }

    getTransaction();
</script>

<Midtrans url="https://app.midtrans.com/snap/snap.js" />

<main class="flex-shrink-0 px-2">
    <header class="header">
        <div class="row">
            <div class="col-auto px-0">
                <a href="{$url('/cart')}" class="btn btn-link text-dark">
                    <svg xmlns='http://www.w3.org/2000/svg' class="icon-size-24" viewBox='0 0 512 512'>
                        <title>ionicons-v5-a</title>
                        <polyline points='244 400 100 256 244 112' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px' />
                        <line x1='120' y1='256' x2='412' y2='256' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px' />
                    </svg>
                </a>
            </div>
            <div class="text-left col align-self-center">
                <h5>Transaction</h5>
            </div>
        </div>
    </header>
    {#if transaction}
        <div class="my-3 alert alert-info">
            <p style="font-size: .7rem;"><strong style="text-transform:uppercase">{transaction.status.name}</strong>. {transaction.status.description}</p>
        </div>
        <UnitCart bind:transaction={transaction} bind:unit={transaction.unit} bind:booking={transaction.booking}>
            {#if transaction.transaction_status_id==4}
                <button class="text-center btn btn-success btn-sm w-100" on:click={onLoaded}>Pay Now</button>
                <button class="text-center btn btn-primary mt-2 btn-sm w-100" on:click={resetPayment}>Reset Payment Link</button>
                <button class="text-center btn btn-warning text-white mt-2 btn-sm w-100" on:click={getTransaction} id="pay-button">Check Payment Status</button>
            {/if}
            {#if transaction.transaction_status_id==7}
                <button class="text-center btn btn-primary mt-2 btn-sm w-100" on:click={resetPayment}>Reset Payment Link</button>
            {/if}
        </UnitCart>
    {/if}
</main>

{#if isLoading}
    <Loading/>
{/if}