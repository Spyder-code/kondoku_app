<script>
  export let unit;
  let app_url = import.meta.env.VITE_APP_URL;

  const title = (name)=>{
    return name.toLocaleUpperCase();
  }
</script>

<div class="card-listing">
  <img src="{app_url+unit.image}" class="img-fluid" alt="{unit.name}"/>
  <div class="px-2 lh-1 mt-2 text-break">
    <div class="name">
      <a class="text-secondary" href="property/{unit.slug}">{title(unit.name)}</a>
    </div>
    <div class="text-warning mt-2 gap-1 d-flex" style="font-size: .7rem;">
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <i class="fas fa-star"></i>
      <div class="d-flex gap-2 text-secondary">
        <span>|</span>
        <span style="font-size: .8rem;"><i class="fas fa-bathtub"></i> {unit.bathroom}</span>
        <span style="font-size: .8rem;"><i class="fas fa-bed"></i> {unit.bedroom}</span>
      </div>
    </div>
    <div class="price mt-3">
      <select name="" id="" class="select-price">
        {#each unit.unit_rent  as item}
          {#if item.price>0}
            <option value="">Rp. {item.price} /{item.duration}</option>
          {/if}
        {/each}
      </select>
    </div>
  </div>
</div>

<style>
  .name{
    height: 50px;
  }
</style>