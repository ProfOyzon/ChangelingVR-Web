<script>
    export let data;
</script>
    
<h1>Get State Information</h1>
<p>Click state name to see data at bottom.</p>
{#each data.data as state}
    <button>{state.state}</button>
{/each}