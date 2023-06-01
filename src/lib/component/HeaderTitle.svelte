<script>
    export let title = '';
    export let back = '#';
</script>

<div class="back">
    {#if back!='#'}
        <a href="{back}" class="left-arrow">
            <i class="bi bi-arrow-left"></i>
        </a>
    {/if}
    <div class="text-center d-flex justify-content-center">
        <div style="width: 300px;">
            <b class="text-theme">{title}</b>
        </div>
    </div>
</div>