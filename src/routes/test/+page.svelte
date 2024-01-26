<script>
    export let data;
</script>
    
{#each data.results as member}
    <div>
        <ul>
            <li>{member.username}</li>
            <li>{member.term}</li>
            <li>{member.teams}</li>
            <li>{member.roles}</li>
            <li>{member.email}</li>
            <li>{member.link_website}</li>
            <li>{member.link_github}</li>
            <li>{member.link_linkedin}</li>
        </ul>
    </div>
{/each}