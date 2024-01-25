<script>
    export let data;
</script>
    
{#each data.data as state}
    <button>{state.state}</button>
{/each}