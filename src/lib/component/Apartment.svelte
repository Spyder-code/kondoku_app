<script>
    import axios from 'axios';
    import { search } from '../../store';
    import { goto } from "@roxi/routify";

    let url = import.meta.env.VITE_ENDPOINT;
    let app_url = import.meta.env.VITE_APP_URL;
    let data = [];
    export let slice = true;

    axios.get(url+'apartment')
    .then((res)=>{
        data = res.data;
        if (slice) {
            data = data.slice(0,8);
        }
    })

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

    const title = (name)=>{
      return name.substr(0,10).toLocaleUpperCase();
    }

</script>

{#each data as item}
<button class="apartment-icon checkbox-lable px-2" on:click={()=>apartmentFilter(item.value,item.label)}>
    <div>
      <img src="{app_url+item.image}" alt="{item.label}" class="img-fluid img-icon"><br>
      <span class="title">{title(item.label)}</span>
    </div>
  </button>
{:else}
  {#each Array(8) as _, index(index)}
    <div class="apartment-icon">
      <div>
        <img src="https://www.adhyaksapersada.co.id/wp-content/uploads/2019/05/apartemen-1nd.png" alt="Apartment" class="img-fluid img-icon"><br>
        <span class="title">Anderson Tower</span>
      </div>
    </div>
  {/each}
{/each}

<!-- {#each data as item}
<div class="col-4 col-sm-3 col-md-2 col-lg-2 px-2 my-1">
    <input type="radio" name="apartment" class="checkbox-boxed" id="apartment-{item.value}">
    <button class="checkbox-lable" on:click={()=>apartmentFilter(item.value,item.label)}>
        <span class="image-boxed">
            <span class="h-180 background">
                <img src="{app_url+item.image}" alt="{item.label}" style="height: 100px;">
            </span>
        </span>
        <span class="p">{item.label}</span>
    </button>
</div>
{:else}
    {#each Array(6) as _, index(index)}
    <div class="col-4 col-sm-3 col-md-2 col-lg-2 px-2 my-1">
        <input type="radio" name="apartment[]" class="checkbox-boxed">
        <label for="apartment" class="checkbox-lable">
            <span class="image-boxed">
                <span class="h-180 background" style="background-color: beige;">
                    
                </span>
            </span>
        </label>
    </div>
    {/each}
{/each} -->

<style>
    button.checkbox-lable{
        border: none;
        outline: none;
        padding: 0 0;
        background-color: transparent;
    }
</style>