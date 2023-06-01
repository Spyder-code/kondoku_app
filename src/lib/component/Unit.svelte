<script>
  import { search } from "../../store";
  export let unit;
  let rents = unit.unit_rent;
  let app_url = import.meta.env.VITE_APP_URL;

  const title = (name)=>{
    return name.toLocaleUpperCase().slice(0,48);
  }

  const rp = (num)=>{
    return num.toLocaleString('en-US');
  }

  let grade = 5;
  if(unit.grade=='A'){
    grade = 5;
  }else if(unit.grade=='B'){
    grade = 4;
  }else{
    grade = 3;
  }
</script>

<div class="card-listing">
  <img src="{app_url+unit.image}" class="img-fluid" alt="{unit.name}"/>
  <div class="px-2 lh-1 mt-2 text-break">
    <div class="name">
      <a class="text-secondary" href="property/{unit.slug}">{title(unit.name)}</a>
    </div>
    <div class="text-warning mt-2 gap-1 d-flex" style="font-size: .7rem;">
      {#each Array(grade) as _, index (index)}
      <i class="fas fa-star"></i>
    {/each}
      <div class="d-flex gap-2 text-secondary">
        <span>|</span>
        <span style="font-size: .8rem;"><i class="fas fa-bathtub"></i> {unit.bathroom}</span>
        <span style="font-size: .8rem;"><i class="fas fa-bed"></i> {unit.bedroom}</span>
      </div>
    </div>
    <div class="price mt-3">
      {#if rents.length>1}
      <select name="" id="" class="select-price">
        {#each unit.unit_rent  as item}
          {#if item.price>0}
            <option value="" selected={$search.duration==item.duration?true:false}>Rp. {rp(item.price)} /{item.duration}</option>
          {/if}
        {/each}
      </select>
      {:else}
        <div>
          <span class="text-theme" style="font-size: .7rem;">Rp.</span>
          <span class="text-theme">{rp(rents[0].price)}</span>
          <span class="text-theme" style="font-size: .7rem;">/{rents[0].duration}</span>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .name{
    height: 50px;
  }
  select:focus {
    border: none;
    background: transparent;
    outline: none;
  }
</style>