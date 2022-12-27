<script lang="ts">
    import moment from "moment";


    export let booking;
    export let transaction;
    export let unit;
    let app_url = import.meta.env.VITE_APP_URL;

    const rupiah = (number)=>{
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }
</script>

<div class="col-12 col-md-6 col-lg-6 px-0">
    <div class="card product-card-small mb-3 shadow">
        <div class="card-body">
            <div class="row">
                <div class="col-auto">
                    <div class="product-image-small">
                        <div class="background" style="background-image: url({app_url+unit.image});">
                            <img src="{app_url+unit.image}" alt="{unit.name}" style="display: none;">
                        </div>
                        <div class="tag-images-count text-white bg-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-size-16 vm" viewBox="0 0 512 512">
                                <title>ionicons-v5-e</title>
                                <path d="M432,112V96a48.14,48.14,0,0,0-48-48H64A48.14,48.14,0,0,0,16,96V352a48.14,48.14,0,0,0,48,48H80" style="fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px"></path>
                                <rect x="96" y="128" width="400" height="336" rx="45.99" ry="45.99" style="fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px"></rect>
                                <ellipse cx="372.92" cy="219.64" rx="30.77" ry="30.55" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px"></ellipse>
                                <path d="M342.15,372.17,255,285.78a30.93,30.93,0,0,0-42.18-1.21L96,387.64" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path>
                                <path d="M265.23,464,383.82,346.27a31,31,0,0,1,41.46-1.87L496,402.91" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"></path>
                            </svg>
                            <span class="vm">{unit.unit_images.length}</span>
                        </div>
                    </div>
                </div>
                <div class="col pl-0">
                    <div class="row">
                        <div class="col">
                            <p class="small"><a href="property-details.html" class="text-dark">{unit.name}</a> </p>
                        </div>
                        <div class="col-auto">
                            <p class="small vm">
                                <span class=" text-secondary">Status:</span>
                            </p>
                        </div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col">
                            <p class="small vm">
                                <span class=" text-secondary">{unit.apartment}</span>
                            </p>
                        </div>
                        <div class="col-auto">
                            {#if transaction.is_paid==1}
                                <b class="small text-success"><small style="text-transform: uppercase;">PAID</small></b>
                            {:else}
                                <b class="small text-primary"><small style="text-transform: uppercase;">{transaction.status.name}</small></b>
                            {/if}
                        </div>
                    </div>
                    <hr class="border-top border-color my-2">
                </div>
                <div class="col-12 mt-2">
                    <div class="row">
                        <div class="col-6 text-dark ">
                            <span>{transaction.invoice}</span>
                        </div>
                        <div class="col-6 text-dark ">
                            <span>{rupiah(transaction.amount)}</span>
                        </div>
                        <div class="col-6 text-dark ">
                            <span>Checkin : {moment(booking.check_in).format('DD/MM/YYYY')}</span>
                        </div>
                        <div class="col-6 text-dark">
                            <span>Checkout : {moment(booking.check_out).format('DD/MM/YYYY')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <slot></slot>
        </div>
    </div>
</div>

<style>
    span{
        font-size: .7rem;
    }
</style>