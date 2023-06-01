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
                data = res.data
                count = data.length
                console.log(data);
            })
    }
    getUser();
</script>
<!-- <HeaderTitle title="My Cart" /> -->
<div class="container-fluid mt-3">
    {#if !user}
        <img src="img/empty.png" alt="empty" class="img-fluid">
        <button on:click={()=>login()} class="text-center text-white btn btn-sm btn-warning w-100">Login</button>
        <ModalLogin bind:isActive={isLogin} bind:user={user}/>
    {:else}
        <p class="text-secondary text-center">
            <span class="text-dark">{count} Cart</span> found<br>
        </p>
        {#each data as booking}
            <UnitCart bind:booking={booking} bind:transaction={booking.transaction} bind:unit={booking.unit}>
                {#if booking.transaction.transaction_status_id>3}
                    <a href="{$url('/pay',{transaction:booking.transaction.id})}" class="text-center btn btn-warning text-white mt-2 btn-sm w-100">Pay Now</a>
                {/if}
            </UnitCart>
        {:else}
            <img src="img/empty.png" alt="empty" class="img-fluid">
        {/each}
    {/if}
</div>
<BottomMenu/>