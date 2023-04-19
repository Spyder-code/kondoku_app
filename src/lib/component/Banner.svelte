<script>
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';
  import 'swiper/css/autoplay';
</script>

<Swiper
  modules={[Pagination, Scrollbar, Navigation, Autoplay]} 
  pagination={{ clickable: true }}
  scrollbar={{ draggable: true }}
  navigation
  loop={true}
  autoplay={true}
  class="swiper-container swiper-products">
    <SwiperSlide>
      <div class="banner"></div>
    </SwiperSlide>
    <SwiperSlide>
      <div class="banner"></div>
    </SwiperSlide>
    <SwiperSlide>
      <div class="banner"></div>
    </SwiperSlide>
</Swiper>