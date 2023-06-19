<script lang="ts">
    import { isActive, url, goto } from "@roxi/routify";
    import { Preferences } from '@capacitor/preferences';
    import axios from "axios";
    import { onMount } from "svelte";
    import ModalSearch from "./ModalSearch.svelte";

    let isModalSearch = false;
    export let isSearch = false;

    const changeIsModalSearch = ()=> {
        isModalSearch = !isSearch;
    }

    let endpoint = import.meta.env.VITE_ENDPOINT;
    let user = null;
    let count = 0;
    async function getUser() {
        const ret = await Preferences.get({ key: 'user' });
        user = JSON.parse(ret.value);
        if(user){
            getData();
        }
    }

    const getData = ()=>{
        axios.post(endpoint+'bills',{user_id:user.id})
            .then((res)=>{
                let data = res.data;
                count = data.length;
            })
    }

    onMount(()=>{
        getUser();
    })
</script>

<footer class="">
    <div class="footer px-4 py-2 d-flex justify-content-between">
      <a href="{$url('/home')}" class="text-center {$isActive('/home')?'text-theme':''}">
        <i class="bi bi-house"></i>
        <div style="font-size: .7rem;">Home</div>
      </a>
      <!-- <a href="{$url('/home')}" class="text-center {$isActive('/home')?'text-theme':''}">
        <i class="bi bi-heart"></i>
        <div style="font-size: .7rem;">Favorite</div>
      </a> -->
      <a href="{$url('/list')}" class="text-center {$isActive('/list')?'text-theme':''}">
        <i class="bi bi-binoculars"></i>
        <div style="font-size: .7rem;">Units</div>
      </a>
      <a href="{$url('/filter')}" class="text-center {$isActive('/filter')?'text-theme':''}">
        <i class="bi bi-calendar-date"></i>
        <div style="font-size: .7rem;">Rent</div>
      </a>
      <a href="{$url('/cart')}" class="text-center {$isActive('/cart')?'text-theme':''}">
        <i class="bi bi-calendar-event"></i>
        <div style="font-size: .7rem;">Book</div>
      </a>
      <a href="{$url('/bills')}" class="text-center {count>0?'jello-horizontal':''} {$isActive('/bills')?'text-theme':''}">
        <i class="bi bi-cash"></i>
        <div style="font-size: .7rem;">Bills</div>
      </a>
      <a href="{$url('/account')}" class="text-center {$isActive('/account')?'text-theme':''}">
        <i class="bi bi-person"></i>
        <div style="font-size: .7rem;">Account</div>
      </a>
    </div>
  </footer>

<!-- <footer class="footer">
    <div class="container">
        <ul class="nav nav-pills nav-justified">
            <li class="nav-item">
                <a class="nav-link {$isActive('/home')?'active':''}" href="{$url('/home')}">
                    <span>
                        <i class="nav-icon bi bi-house"></i>
                        <span class="nav-text">Home</span>
                    </span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {$isActive('/list')||$isActive('/search')||$isActive('/property/[name]')||$isActive('/book/[name]')?'active':''}" href="{$url('/list')}">
                    <span>
                        <i class="nav-icon bi bi-binoculars"></i>
                        <span class="nav-text">Units</span>
                    </span>
                </a>
            </li>

            <li class="nav-item centerbutton">
                <button on:click={()=>$goto('/filter')} type="button" class="nav-link" id="centermenubtn" style="outline: none;">
                    <span class="theme-radial-gradient">
                        <i class="bi bi-grid" style="font-size:22px;"></i>
                    </span>
                </button>
            </li>
            <li class="nav-item centerbutton">
                <button on:click={()=>changeIsModalSearch()} type="button" class="nav-link" data-toggle="modal" data-target="#menumodal" id="centermenubtn" style="outline: none;">
                    <span class="theme-radial-gradient">
                        <i class="bi bi-grid" style="font-size:22px;"></i>
                    </span>
                </button>
            </li>

            <li class="nav-item">
                <a class="nav-link {$isActive('/cart')?'active':''}" href="{$url('/cart')}">
                    <span>
                        <i class="nav-icon bi bi-bag"></i>
                        <span class="nav-text">Cart</span>
                    </span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {$isActive('/account')?'active':''}" href="{$url('/account')}">
                    <span>
                        <i class="nav-icon bi bi-person"></i>
                        <span class="nav-text">Account</span>
                    </span>
                </a>
            </li>
        </ul>
    </div>
</footer>

<ModalSearch bind:isActiveModal={isModalSearch}/> -->