<script lang="ts">
    import { Swiper, SwiperSlide } from 'swiper/svelte';
    import { Pagination } from 'swiper';
    import { url, goto } from "@roxi/routify";
    import { Preferences } from '@capacitor/preferences';
    import 'swiper/css';
    import 'swiper/css/pagination';
    let user = null;

    // JSON "get" example
    async function getUser() {
        const ret = await Preferences.get({ key: 'user' });
        user = JSON.parse(ret.value);
        if (user) {
            $goto('/home');
        }
    }

    getUser();

</script>

{#if !user}
    <!-- Fixed navbar -->
<header class="header">
    <div class="row">
        <div class="col-auto px-0">

        </div>
        <div class="text-left col">

        </div>
        <div class="ml-auto col-auto px-0">
            <a href="{$url('/home')}" class="btn btn-link text-secondary">Skip</a>
        </div>
    </div>
</header>


<!-- Begin page content -->
<main class="bg-white" style="height: 100vh;">
    <div class="container pb-5">
        <Swiper modules={[Pagination]} pagination={{ clickable: true }} class="swiper-container pb-4" style="height:500px">
            <SwiperSlide>
                <div class="image-circle text-center">
                    <figure class="background" style="background-image: url('img/image-2.jpg');"></figure>
                    <div class="icon icon-100 text-white">
                        <img src="img/logo/fav-icon.png" alt="">
                    </div>
                </div>
                <div style="position: relative; top:60px">
                    <h4 class="mt-0 mb-3 text-center">Best Apartment</h4>
                    <div class="row mb-3">
                        <div class="col-10 mx-auto">
                            <p class="small-font text-secondary text-center">Luxury Apartment For Rent & Sale.</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="image-circle text-center">
                    <figure class="background" style="background-image: url('img/banner.jpg');"></figure>
                    <div class="icon icon-100 text-white">
                        <img src="img/logo/fav-icon.png" alt="">
                    </div>
                </div>
                <div style="position: relative; top:60px">
                    <h4 class="mt-0 mb-3 text-center">Best Houses</h4>
                    <div class="row mb-3">
                        <div class="col-10 mx-auto">
                            <p class="small-font text-secondary text-center">Best Home For Family-friendly</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="image-circle text-center">
                    <figure class="background" style="background-image: url('img/image-5.jpg');"></figure>
                    <div class="icon icon-100 text-white">
                        <img src="img/logo/fav-icon.png" alt="">
                    </div>
                </div>
                <div style="position: relative; top:60px">
                    <h4 class="mt-0 mb-3 text-center">Book Now</h4>
                    <div class="row mb-3">
                        <div class="col-10 mx-auto">
                            <p class="small-font text-secondary text-center">Start Book and Get Best Offer.</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</main>

<footer class="footer mt-auto py-3">
    <div class="container">
        <div class="row">
            <div class="col text-center">
                <a href="{$url('/login')}" class="link">Already Have an Account?</a>
            </div>
        </div>
    </div>
</footer>
{/if}

<style>
    .image-circle > figure {
        height: 300px;
        width: 300px;
        display: inline-block;
        margin: 0 auto;
        border-radius: 150px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
        -webkit-box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
        -ms-box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
        vertical-align: top;
    }
    .background {
        background-position: center center;
        background-size: cover;
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .icon {
        border-radius: 50%;
        display: inline-block;
        position: relative;
        overflow: hidden;
        text-align: center;
        vertical-align: middle;
    }
    .image-circle > .icon {
        position: absolute;
        bottom: 170px;
        left: 0;
        right: 0;
        margin: 0 auto -40px auto;
    }
    .menu-overlay .main-menu .menu-container > .icon {
        margin: 0 auto;
        margin-top: -90px;
        border: 2px solid #ffffff;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        -webkit-box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
        -moz-box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
        -ms-box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
    }
</style>