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
<main class="flex-shrink-0">
    <div class="container pb-5">
        <Swiper modules={[Pagination]} pagination={{ clickable: true }} class="swiper-container pb-4">
            <SwiperSlide>
                <div class="image-circle">
                    <figure class="background" style="background-image: url('img/image-2.jpg');"></figure>
                    <div class="icon icon-100 text-white">
                        <img src="img/logo/fav-icon.png" alt="">
                    </div>
                </div>
                <h4 class="mt-0 mb-3 text-center">Best Apartment</h4>
                <div class="row mb-3">
                    <div class="col-10 mx-auto">
                        <p class="small-font text-secondary text-center">Luxury Apartment For Rent & Sale.</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="image-circle">
                    <figure class="background" style="background-image: url('img/banner.jpg');"></figure>
                    <div class="icon icon-100 text-white">
                        <img src="img/logo/fav-icon.png" alt="">
                    </div>
                </div>
                <h4 class="mt-0 mb-3 text-center">Best Houses</h4>
                <div class="row mb-3">
                    <div class="col-10 mx-auto">
                        <p class="small-font text-secondary text-center">Best Home For Family-friendly</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="image-circle">
                    <figure class="background" style="background-image: url('img/image-5.jpg');"></figure>
                    <div class="icon icon-100 text-white">
                        <img src="img/logo/fav-icon.png" alt="">
                    </div>
                </div>
                <h4 class="mt-0 mb-3 text-center">Book Now</h4>
                <div class="row mb-3">
                    <div class="col-10 mx-auto">
                        <p class="small-font text-secondary text-center">Start Book and Get Best Offer.</p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</main>

<footer class="footer mt-auto py-3">
    <div class="container">
        <div class="row">
            <div class="col">
                <a href="{$url('/login')}" class="btn btn-block btn-info btn-lg">Sign In</a>
            </div>
            <div class="col">
                <a href="{$url('/register')}" class="btn btn-block btn-danger btn-lg">Sign Up</a>
            </div>
        </div>
    </div>
</footer>
{/if}