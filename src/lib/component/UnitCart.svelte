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
                            <img src="{app_url+unit.image}" alt="{unit.name}" style="display:none">
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
    .product-card-small .product-image-small {
    border-radius: 15px;
    overflow: hidden;
    height: 80px;
    width: 80px;
    display: block;
    position: relative;
    }

    .product-card-small .product-image-small .tag-images-count {
    position: absolute;
    bottom: 5px;
    left: 5px;
    z-index: 1;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 12px;
    }

    .product-card-small .product-image-small .tag-images-count span {
    margin-left: 5px;
    }

    .product-card-small .product-image-small .small-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 1;
    }

    .background {
        background-position: center center;
        background-size: cover;
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
    }
</style>