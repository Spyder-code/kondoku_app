<script>
    import UnitCart from "../lib/component/UnitCart.svelte";
    import BottomMenu from "../lib/component/BottomMenu.svelte";
    import Header from "../lib/component/Header.svelte";
    import Layout from "../lib/component/Layout.svelte";
    import ModalLogin from "../lib/component/ModalLogin.svelte";
    import iziToast from 'izitoast'
    import { Preferences } from '@capacitor/preferences';
    import 'izitoast/dist/css/iziToast.css'
    
    let user = null;
    let count = 0;
    let isLogin = user?false:true;
    async function getUser() {
        const ret = await Preferences.get({ key: 'user' });
        user = JSON.parse(ret.value);
    }

    const login = ()=>{
        isLogin = !isLogin;
    }
    getUser();
</script>
<Layout>
    <Header bind:user={user}/>
        <div class="container-fluid mt-3">
            {#if !user}
                <img src="img/empty.png" alt="empty" class="img-fluid">
                <button on:click={()=>login()} class="text-center text-white btn btn-sm btn-warning w-100">Login</button>
                <ModalLogin bind:isActive={isLogin} bind:user={user}/>
            {:else}
                <p class="text-secondary text-center">
                    <span class="text-dark">{count} Cart</span> found<br>
                </p>
                <UnitCart/>
            {/if}
        </div>
        <BottomMenu/>
</Layout>