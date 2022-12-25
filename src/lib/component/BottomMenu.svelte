<script lang="ts">
    import { isActive, url, goto } from "@roxi/routify";
    import ModalSearch from "./ModalSearch.svelte";

    let isModalSearch = false;
    export let isSearch = false;

    const changeIsModalSearch = ()=> {
        isModalSearch = !isSearch;
    }
</script>

<footer class="footer">
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

<ModalSearch bind:isActiveModal={isModalSearch}/>