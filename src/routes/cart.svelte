<script>
    import UnitCart from "../lib/component/UnitCart.svelte";
    import BottomMenu from "../lib/component/BottomMenu.svelte";
    import Header from "../lib/component/Header.svelte";
    import Layout from "../lib/component/Layout.svelte";
    import ModalLogin from "../lib/component/ModalLogin.svelte";
    import { url } from '@roxi/routify'
    import { Preferences } from '@capacitor/preferences';
    import 'izitoast/dist/css/iziToast.css'
    import axios from "axios";
    import HeaderTitle from "../lib/component/HeaderTitle.svelte";
    import Empty from "../lib/component/Empty.svelte";
    
    let endpoint = import.meta.env.VITE_ENDPOINT;
    let user = null;
    let count = 0;
    let data = [];
    let isLogin = user?false:true;
    async function getUser() {
        const ret = await Preferences.get({ key: 'user' });
        user = JSON.parse(ret.value);
        if(user){
            getBooking();
        }
    }

    const login = ()=>{
        isLogin = !isLogin;
    }

    const getBooking = ()=>{
        axios.post(endpoint+'data-booking',{user_id:user.id})
            .then((res)=>{
                console.log(res);
                data = res.data
                count = data.length
            })
    }
    getUser();
</script>
<!-- <HeaderTitle title="My Cart" /> -->
<div class="container-fluid mt-3" style="padding-bottom: 100px;">
    {#if !user}
        <Empty/>
        <button on:click={()=>login()} class="text-center text-white btn btn-sm btn-warning w-100">Login</button>
        <ModalLogin bind:isActive={isLogin} bind:user={user}/>
    {:else}
        <p class="text-secondary text-center">
            <span class="text-dark">{count} Transaction</span> found<br>
        </p>
        <!-- {#each data as booking}
            <UnitCart bind:booking={booking} bind:transaction={booking.transaction} bind:unit={booking.unit}>
                {#if booking.transaction.transaction_status_id>3}
                    <a href="{$url('/pay',{transaction:booking.transaction.id})}" class="text-center btn btn-warning text-white mt-2 btn-sm w-100">Pay Now</a>
                {/if}
                {#if booking.unit.unit_status_id==3}
                    <a href="/booking/{booking.id}" class="text-center btn btn-theme text-white mt-2 btn-sm w-100">Order Service</a>
                {/if}
            </UnitCart>
        {:else}
            <Empty/>
        {/each} -->
    {/if}
</div>
<BottomMenu/>