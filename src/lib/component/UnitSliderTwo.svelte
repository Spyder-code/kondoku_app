<script lang="ts">
    export let units;
    export let url;
    // Import Swiper Svelte components
    import { Swiper, SwiperSlide } from 'swiper/svelte';
    // Import Swiper styles
    import 'swiper/css';
    function strlimit(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }
    const rupiah = (number)=>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
</script>

    <!-- Swiper -->
    <Swiper
        spaceBetween={0}
        slidesPerView='auto'
        pagination={false}
        class="swiper-container swiper-products">
        {#each units as unit}
            {#each unit.unit_rent as item}
                {#if unit.image}
                <SwiperSlide>
                    <div class="card product-card-large">
                        <div class="card-body p-0">
                            <div class="product-image-large">
                                <div class="background">
                                    <img src="{url+unit.image}" alt="{item.unit_name}" style="height: 230px; width:100%;">
                                </div>
                                <div class="tag-images-count text-white bg-dark">
                                    <svg xmlns='http://www.w3.org/2000/svg' class="icon-size-16 vm" viewBox='0 0 512 512'>
                                        <title>ionicons-v5-e</title>
                                        <path d='M432,112V96a48.14,48.14,0,0,0-48-48H64A48.14,48.14,0,0,0,16,96V352a48.14,48.14,0,0,0,48,48H80' style='fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px' />
                                        <rect x='96' y='128' width='400' height='336' rx='45.99' ry='45.99' style='fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px' />
                                        <ellipse cx='372.92' cy='219.64' rx='30.77' ry='30.55' style='fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px' />
                                        <path d='M342.15,372.17,255,285.78a30.93,30.93,0,0,0-42.18-1.21L96,387.64' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                        <path d='M265.23,464,383.82,346.27a31,31,0,0,1,41.46-1.87L496,402.91' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                    </svg>
                                    <span class="vm">{unit.unit_images.length}</span>
                                </div>
                                <button class="small-btn btn btn-danger text-white">
                                    <svg xmlns='http://www.w3.org/2000/svg' class="icon-size-16 vm" viewBox='0 0 512 512'>
                                        <title>ionicons-v5-f</title>
                                        <path d='M352.92,80C288,80,256,144,256,144s-32-64-96.92-64C106.32,80,64.54,124.14,64,176.81c-1.1,109.33,86.73,187.08,183,252.42a16,16,0,0,0,18,0c96.26-65.34,184.09-143.09,183-252.42C447.46,124.14,405.68,80,352.92,80Z' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <a href="property-details.html" class="card-footer">
                            <div class="row">
                                <div class="col">
                                    <p class="text-dark" style="font-size: .8rem;">{ strlimit(item.unit_name,50) }</p>
                                </div>
                                <div class="col-auto">
                                    <p class="small text-secondary">
                                        <svg xmlns='http://www.w3.org/2000/svg' class="icon-size-16" viewBox='0 0 512 512'>
                                            <title>kondoku-icon</title>
                                            <rect x='32' y='80' width='448' height='256' rx='16' ry='16' transform='translate(512 416) rotate(180)' style='fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px' />
                                            <line x1='64' y1='384' x2='448' y2='384' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                            <line x1='96' y1='432' x2='416' y2='432' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                            <circle cx='256' cy='208' r='80' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                            <path d='M480,160a80,80,0,0,1-80-80' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                            <path d='M32,160a80,80,0,0,0,80-80' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                            <path d='M480,256a80,80,0,0,0-80,80' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                            <path d='M32,256a80,80,0,0,1,80,80' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                        </svg>
                                    </p>
        
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p class="small vm">
                                        <span class=" text-secondary">{unit.large} m<sup>2</sup></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon-size-12 vm" viewBox="0 0 24 24">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path fill="#FFD500" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                        <span class=" text-secondary">| {unit.apartment}</span>
                                    </p>
                                </div>
                                <div class="col-auto">
                                    <p class="small text-secondary">{rupiah(item.price)}</p>
                                </div>
                            </div>
                        </a>
                        <div class="card-footer border-top border-color">
                            <div class="row">
                                <div class="col-auto text-dark text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zM176 288c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80z"/></svg>
                                    <p class="small"><small>Bedroom</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <svg xmlns='http://www.w3.org/2000/svg' class="icon-size-24" viewBox='0 0 512 512'>
                                        <title>ionicons-v5-n</title>
                                        <circle cx='256' cy='256' r='192' style='fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px' />
                                        <polygon points='256 175.15 179.91 238.98 200 320 256 320 312 320 332.09 238.98 256 175.15' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                        <polyline points='332.09 238.98 384.96 216.58 410.74 143.32' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                        <line x1='447' y1='269.97' x2='384.96' y2='216.58' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                        <polyline points='179.91 238.98 127.04 216.58 101.26 143.32' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                        <line x1='65' y1='269.97' x2='127.04' y2='216.58' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                        <polyline points='256 175.15 256 117.58 320 74.94' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                        <line x1='192' y1='74.93' x2='256' y2='117.58' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                        <polyline points='312 320 340 368 312 439' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                        <line x1='410.74' y1='368' x2='342' y2='368' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                        <polyline points='200 320 172 368 200.37 439.5' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                        <line x1='101.63' y1='368' x2='172' y2='368' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                                    </svg>
                                    <p class="small"><small>Sport</small></p>
                                </div>
                                <div class="col-auto text-dark text-center pl-0">
                                    <svg xmlns='http://www.w3.org/2000/svg' class="icon-size-24" viewBox='0 0 512 512'>
                                        <title>ionicons-v5-n</title>
                                        <path d='M215.08,156.92c-4.89-24-10.77-56.27-10.77-73.23A51.36,51.36,0,0,1,256,32h0c28.55,0,51.69,23.69,51.69,51.69,0,16.5-5.85,48.95-10.77,73.23' style='fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px' />
                                        <path d='M215.08,355.08c-4.91,24.06-10.77,56.16-10.77,73.23A51.36,51.36,0,0,0,256,480h0c28.55,0,51.69-23.69,51.69-51.69,0-16.54-5.85-48.93-10.77-73.23' style='fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px' />
                                        <path d='M355.08,215.08c24.06-4.91,56.16-10.77,73.23-10.77A51.36,51.36,0,0,1,480,256h0c0,28.55-23.69,51.69-51.69,51.69-16.5,0-48.95-5.85-73.23-10.77' style='fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px' />
                                        <path d='M156.92,215.07c-24-4.89-56.25-10.76-73.23-10.76A51.36,51.36,0,0,0,32,256h0c0,28.55,23.69,51.69,51.69,51.69,16.5,0,48.95-5.85,73.23-10.77' style='fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px' />
                                        <path d='M296.92,156.92c13.55-20.48,32.3-47.25,44.37-59.31a51.35,51.35,0,0,1,73.1,0h0c20.19,20.19,19.8,53.3,0,73.1-11.66,11.67-38.67,30.67-59.31,44.37' style='fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px' />
                                        <path d='M156.92,296.92c-20.48,13.55-47.25,32.3-59.31,44.37a51.35,51.35,0,0,0,0,73.1h0c20.19,20.19,53.3,19.8,73.1,0,11.67-11.66,30.67-38.67,44.37-59.31' style='fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px' />
                                        <path d='M355.08,296.92c20.48,13.55,47.25,32.3,59.31,44.37a51.35,51.35,0,0,1,0,73.1h0c-20.19,20.19-53.3,19.8-73.1,0-11.69-11.69-30.66-38.65-44.37-59.31' style='fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px' />
                                        <path d='M215.08,156.92c-13.53-20.43-32.38-47.32-44.37-59.31a51.35,51.35,0,0,0-73.1,0h0c-20.19,20.19-19.8,53.3,0,73.1,11.61,11.61,38.7,30.68,59.31,44.37' style='fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px' />
                                        <circle cx='256' cy='256' r='64' style='fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px' />
                                    </svg>
                                    <p class="small"><small>Garden</small></p>
                                </div>
                                <div class="col-auto ml-auto">
                                    <p class="small text-secondary">
                                        3BHK House<br>2400 sq. ft.
                                    </p>
                                </div>
        
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/if}
            {/each}
        {/each}
    </Swiper>