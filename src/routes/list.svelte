<script lang="ts">
  import UnitList from "../component/UnitList.svelte";
  import UnitSliderOne from "../component/UnitSliderOne.svelte";
	import BottomMenu from "../component/BottomMenu.svelte";
	import Header from "../component/Header.svelte";
	import Layout from "../component/Layout.svelte";
  import UnitListTwo from "../component/UnitListTwo.svelte";
</script>

<Layout>
	<Header/>
	<div class="container mt-4">
        <div class="form-group mb-0">
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control search" placeholder="Search Property">
                </div>
                <div class="col-auto pl-0">
                    <button class="sqaure-btn btn btn-info text-white" type="button">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
	<div class="my-4">
		<UnitSliderOne/>
	</div>
	<div class="d-flex flex-wrap justify-content-center mx-2" style="gap: 5px;">
		<UnitListTwo/>
	</div>
	<div class="mt-4">
        <UnitList/>
    </div>
	<BottomMenu/>
</Layout>