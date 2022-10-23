<script lang="ts">
    // Import Swiper Svelte components
    import { Swiper, SwiperSlide } from 'swiper/svelte';
    // Import Swiper styles
    import 'swiper/css';
</script>

<Swiper
    spaceBetween={0}
    slidesPerView='auto'
    pagination={false}
    class="swiper-container swiper-products">
    <SwiperSlide>
        <div class="card product-card-large">
            <div class="card-body p-0">
                <div class="product-image-large">
                    <div class="background">
                        <img src="img/image-4.jpg" alt="">
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
                        <span class="vm">10</span>
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
                        <p class="text-dark">Devine villa </p>
                    </div>
                    <div class="col-auto">
                        <p class="small text-secondary">$ 12.5 lacs</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="small vm">
                            <span class=" text-secondary">4.5</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-size-12 vm" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path fill="#FFD500" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                            <span class=" text-secondary">| Canada</span>
                        </p>
                    </div>
                    <div class="col-auto">
                        <p class="small text-secondary">3BHK House, 2400 sq. ft.</p>
                    </div>
                </div>
            </a>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div class="card product-card-large">
            <div class="offers">
                <p class="mb-0 font-weight-medium">10% Off</p>
                <p class="small ">4 EMI Off</p>
            </div>
            <div class="card-body p-0">
                <div class="product-image-large">
                    <div class="background">
                        <img src="img/image-2.jpg" alt="">
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
                        <span class="vm">10</span>
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
                        <p class="text-dark">Devine villa </p>
                    </div>
                    <div class="col-auto">
                        <p class="small text-secondary">$ 12.5 lacs</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="small vm">
                            <span class=" text-secondary">4.5</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-size-12 vm" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path fill="#FFD500" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                            <span class=" text-secondary">| Canada</span>
                        </p>
                    </div>
                    <div class="col-auto">
                        <p class="small text-secondary">3BHK House, 2400 sq. ft.</p>
                    </div>
                </div>
            </a>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div class="card product-card-large">
            <div class="card-body p-0">
                <div class="product-image-large">
                    <div class="background">
                        <img src="img/image-4.jpg" alt="">
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
                        <span class="vm">10</span>
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
                        <p class="text-dark">Devine villa </p>
                    </div>
                    <div class="col-auto">
                        <p class="small text-secondary">$ 12.5 lacs</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="small vm">
                            <span class=" text-secondary">4.5</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-size-12 vm" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path fill="#FFD500" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                            <span class=" text-secondary">| Canada</span>
                        </p>
                    </div>
                    <div class="col-auto">
                        <p class="small text-secondary">3BHK House, 2400 sq. ft.</p>
                    </div>
                </div>
            </a>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div class="card product-card-large">
            <div class="card-body p-0">
                <div class="product-image-large">
                    <div class="background">
                        <img src="img/image-4.jpg" alt="">
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
                        <span class="vm">10</span>
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
                        <p class="text-dark">Devine villa </p>
                    </div>
                    <div class="col-auto">
                        <p class="small text-secondary">$ 12.5 lacs</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p class="small vm">
                            <span class=" text-secondary">4.5</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-size-12 vm" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path fill="#FFD500" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                            <span class=" text-secondary">| Canada</span>
                        </p>
                    </div>
                    <div class="col-auto">
                        <p class="small text-secondary">3BHK House, 2400 sq. ft.</p>
                    </div>
                </div>
            </a>
        </div>
    </SwiperSlide>
</Swiper>