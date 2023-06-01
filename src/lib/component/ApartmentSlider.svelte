<script>
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import {goto} from '@roxi/routify'
  import 'swiper/css';
  import 'swiper/css/autoplay';
  import axios from 'axios';
  import { Autoplay } from 'swiper';
  import { search } from '../../store';

  let apartments = [];
  let endpoint = import.meta.env.VITE_ENDPOINT;
  let app_url = import.meta.env.VITE_APP_URL;
  axios.get(endpoint+'apartment')
    .then((res)=>{
        apartments = res.data;
    })

    const title = (name)=>{
      return name.toLocaleUpperCase();
    }

    const apartmentFilter = (id,name)=>{
        search.set({
            duration:0,
            apartment:id,
            apartmentName:name,
            bedroom:0,
            typeAll:true,
            typeStudio:0,
            startDate:0,
            endDate:0,
            name:0,
        });

        $goto('/list');
    }
</script>

{#if apartments.length > 0}
  <Swiper
    modules={[Autoplay]}
    spaceBetween={10}
    slidesPerView='auto'
    autoplay={true}
    class="swiper-container">
      {#each apartments as apartment}
        <SwiperSlide style="width:320px">
          <button on:click={apartmentFilter(apartment.value,apartment.label)} class="card card-background" style="background-image: url({app_url+apartment.image}); height: 200px; width:320px">
            <p class="text-white" style="font-size:.7rem; text-shadow: rgba(29, 29, 29, 0.25) 4px 4px 4px;">{title(apartment.label)}</p>
          </button>
        </SwiperSlide>
      {/each}
</Swiper>
{:else}
  <div class="card card-background" style="background-image: url('https://www.adhyaksapersada.co.id/wp-content/uploads/2019/05/apartemen-1nd.png'); height: 200px;"></div>
{/if}