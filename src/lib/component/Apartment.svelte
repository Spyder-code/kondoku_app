<script>
    import axios from 'axios';
    import Loading from '../../lib/component/Loading.svelte';
    let url = import.meta.env.VITE_ENDPOINT;
    let app_url = import.meta.env.VITE_APP_URL;
    let data = [];
    axios.get(url+'apartment')
    .then((res)=>{
        data = res.data;
        data = data.slice(0,6);
    })

</script>

{#each data as item}
<div class="col-4 col-sm-3 col-md-2 col-lg-2 px-2 my-1">
    <input type="radio" name="apartment[]" class="checkbox-boxed" id="apartment-{item.value}">
    <label class="checkbox-lable" for="apartment-{item.value}">
        <span class="image-boxed">
            <span class="h-180 background">
                <img src="{app_url+item.image}" alt="{item.label}" style="height: 100px;">
            </span>
        </span>
        <span class="p">{item.label}</span>
    </label>
</div>
{:else}
    {#each Array(6) as _, index(index)}
    <div class="col-4 col-sm-3 col-md-2 col-lg-2 px-2 my-1">
        <input type="radio" name="apartment[]" class="checkbox-boxed">
        <label class="checkbox-lable">
            <span class="image-boxed">
                <span class="h-180 background" style="background-color: beige;">
                    
                </span>
            </span>
        </label>
    </div>
    {/each}
{/each}