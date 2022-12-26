<script lang="ts">
    import { url, goto } from "@roxi/routify";
    import { Preferences } from '@capacitor/preferences';

    export let user = null;

    const logout = async ()=>{
        await Preferences.remove({ key: 'user' });
        $goto('/');
    }

    async function getUser() {
        const ret = await Preferences.get({ key: 'user' });
        user = JSON.parse(ret.value);
    }

    getUser();
</script>

<header class="header">
    <div class="row">
        <div class="col-auto px-0">
            <!-- <button class="menu-btn btn btn-link-default ml-3 mt-2" type="button">
                <i class="bi bi-heart" style="font-size: 1.5rem; color:rgb(244, 66, 66);"><span style="font-size: 1rem;">13</span></i>
            </button> -->
        </div>
        <div class="text-center col">
            <a class="navbar-brand" href="/detail">
                <img src="img/logo/kondoku1.png" alt="KONDOKU" style="height: 60px;">
                <!-- <h4>KONDOKU</h4> -->
            </a>
        </div>
        <div class="ml-auto col-auto">
            <div class="dropdown">
                <a class="icon icon-44 shadow-sm" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <figure class="m-0 background">
                        <img src="img/logo/fav-icon.png" class="img-fluid" alt="KONDOKU">
                    </figure>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {#if user}
                        <a class="dropdown-item px-0 py-1" style="font-size: .8rem;" href="{$url('/account')}"> <i class="mr-2 bi bi-person"></i> My Account</a>
                        <a class="dropdown-item px-0 py-1" style="font-size: .8rem;" href="{$url('/account')}"> <i class="mr-2 bi bi-key"></i> Change Password</a>
                        <div class="dropdown-divider"></div>
                        <button on:click={()=>logout()} class="dropdown-item px-0 py-1" style="font-size: .8rem;"> <i class="mr-2 bi bi-door-open"></i> Logout</button>
                        {:else}
                        <a class="dropdown-item px-0 py-1" style="font-size: .8rem;" href="{$url('/login')}"> <i class="mr-2 bi bi-person"></i> Login</a>
                        <a class="dropdown-item px-0 py-1" style="font-size: .8rem;" href="{$url('/register')}"> <i class="mr-2 bi bi-book"></i> Register</a>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</header>