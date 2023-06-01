<script>
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';
  import 'swiper/css/autoplay';
  import { onMount } from 'svelte';
  import axios from 'axios';

    let url = import.meta.env.VITE_ENDPOINT;
    let app_url = import.meta.env.VITE_APP_URL;
    let data = [];

    
  onMount(()=>{
    axios.get(url+'banners')
    .then((res)=>{
        data = res.data;
    })
  })
</script>

<Swiper
  modules={[Pagination, Scrollbar, Navigation, Autoplay]} 
  pagination={{ clickable: true }}
  scrollbar={{ draggable: true }}
  navigation
  loop={true}
  autoplay={true}
  class="swiper-container swiper-products">
  {#each data as banner}
    <SwiperSlide>
      <div class="banner" style="background-image: url('{app_url+banner.path}');"></div>
    </SwiperSlide>
  {/each}
</Swiper>