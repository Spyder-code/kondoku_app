<svelte:head>
    <script bind:this={script} src={url} data-client-key="Mid-client-CD5c8XAxCBbsercl"/>
</svelte:head>

<script>
    import { onMount, createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let url;
    let script;

    onMount(async () => {
        script.addEventListener('load', () => {
            dispatch('loaded');
        })

        script.addEventListener('error', (event) => {
            console.error("something went wrong", event);
            dispatch('error');
        });
    });
</script>