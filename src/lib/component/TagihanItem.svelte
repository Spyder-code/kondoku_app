<script lang="ts">
    export let item;

    const rp = (num) =>{
        return num.toLocaleString('en-US');
    }
</script>

<div class="col-12 col-md-6 col-lg-6">
    <div class="card product-card-small mb-3 shadow">
        <div class="card-body">
            <div class="row">
                <div class="col pl-0">
                    <div class="row">
                        <div class="col">
                            <p class="small text-dark">{item.name}</p>
                        </div>
                        <div class="col-auto ml-3 text-right">
                            <p class="small vm">
                                <span class=" text-secondary">Status:</span>
                            </p>
                        </div>
                    </div>
                    <div class="row no-gutters">
                        <div class="col">
                            <b class="small text-danger">Rp. {rp(item.amount)}</b>
                        </div>
                        <div class="col-auto ml-3 text-right">
                            <b class="small text-primary"><small style="text-transform: uppercase;">UNPAID</small></b>
                        </div>
                    </div>
                    <!-- <button class="btn btn-theme mt-2 btn-sm w-100">Pay</button> -->
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    span{
        font-size: .7rem;
    }
</style>