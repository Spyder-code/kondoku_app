<script>
    export let unit;
    export let url;
    function strlimit(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }
    const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
        }).format(number);
    }
    const name = (name)=>{
        return name.length > 34 ? strlimit(name.toUpperCase(),30) : name.toUpperCase();
    }
</script>
<div class="card product-card-large" style="max-width:100%; height:250px;">
    <div class="card-body p-0">
        <div class="product-image-large" style="height: 110px;">
            <div class="background">
                <img src="{url+unit.image}" alt="{unit.name}" style="height: 110px; width:100%;">
            </div>
            <!-- <button class="small-btn btn btn-danger text-white">
                <svg xmlns='http://www.w3.org/2000/svg' class="icon-size-16 vm" viewBox='0 0 512 512'>
                    <title>ionicons-v5-f</title>
                    <path d='M352.92,80C288,80,256,144,256,144s-32-64-96.92-64C106.32,80,64.54,124.14,64,176.81c-1.1,109.33,86.73,187.08,183,252.42a16,16,0,0,0,18,0c96.26-65.34,184.09-143.09,183-252.42C447.46,124.14,405.68,80,352.92,80Z' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px' />
                </svg>
            </button> -->
        </div>
    </div>
    <a href="property/{unit.slug}" class="card-footer">
        <div class="row">
            <div class="col">
                <p class="text-dark" style="font-size: .8rem;">{ name(unit.name) }</p>
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
                    <span class=" text-secondary">| {unit.apartment ?? '-'}</span>
                </p>
            </div>
        </div>
        <hr class="my-1">
        <div class="row">
            {#each unit.unit_rent as rent}
                {#if rent.price!=0}
                    <div class="col-auto">
                        <p class="small text-dark">Rp. {rent.price_short} /{rent.duration}</p>
                    </div>
                {/if}
            {/each}
        </div>
    </a>
</div>