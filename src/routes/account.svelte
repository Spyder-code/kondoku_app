<script lang="ts">
    import BottomMenu from "../lib/component/BottomMenu.svelte";
    import Layout from "../lib/component/Layout.svelte";
    import { Preferences } from '@capacitor/preferences';
    import ModalLogin from "../lib/component/ModalLogin.svelte";
    
    let isLogin = false;
    let user = null;

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
    <header class="header">
        <div class="row">
            <div class="col-auto px-0">
                <a href="index.html" class="btn menu-btn btn-link text-dark">
                    
                </a>
            </div>
            <div class="text-left col align-self-center">
                <h5>Settings</h5>
            </div>
            <div class="ml-auto col-auto align-self-center">

            </div>
        </div>
    </header>


    <div class="container mt-4 text-center">
        <div class="icon icon-100 position-relative">
            <figure class="background">
                <img src="img/user-1.jpg" alt="">
            </figure>
        </div>
    </div>
    <div class="container mt-4">
        {#if user}
        <div class="card mt-3 mb-4">
            <div class="card-body">
                <div class="row mt-">
                    <div class="col-12 col-md-6">
                        <div class="form-group floating-form-group">
                            <input type="text" class="form-control floating-input" bind:value={user.name} placeholder="Full Name">
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group floating-form-group">
                            <input type="text" class="form-control floating-input" bind:value={user.email} placeholder="Email">
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group floating-form-group">
                            <input type="text" class="form-control floating-input" bind:value={user.phone} placeholder="Phone">
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group floating-form-group active mb-0">
                            <input type="file" class="form-control floating-input">
                            <label for="sa" class="floating-label">Change photo</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h6 class="mt-3">Change Password</h6>
        <div class="card mt-3 mb-4">
            <div class="card-body">
                <div class="row ">
                    <div class="col-12 col-md-6">
                        <div class="form-group floating-form-group">
                            <input type="password" class="form-control floating-input">
                            <label for="sa" class="floating-label">Current Password</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group floating-form-group">
                            <input type="password" class="form-control floating-input">
                            <label for="sa" class="floating-label">New Password</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="form-group floating-form-group mb-0">
                            <input type="password" class="form-control floating-input">
                            <label for="sa" class="floating-label">Confirm New Password</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-sm btn-success w-100 mt-2">Update</button>
                    </div>
                </div>
            </div>
        </div>
        {:else}
            <button on:click={()=>login()} class="text-center text-white btn btn-sm btn-warning w-100">Login</button>
            <ModalLogin bind:isActive={isLogin} bind:user={user}/>
        {/if}
    </div>
	<BottomMenu/>
</Layout>