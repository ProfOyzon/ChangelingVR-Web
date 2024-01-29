<script>
    export let data;
    export let form;
</script>
    
<svelte:head>
    <title>{data.results[0].username} | Changeling</title>
</svelte:head>

<form method="POST">
    <p>{ form?.message || "" }</p>
    
    <label for="name">Name</label>
    <input type="text" id="name" name="name" value={data.results[0].username} placeholder="Name">
    <label for="email">Email</label>
    <input type="text" id="email" name="email" value={data.results[0].link_email} placeholder="Email">
    <label for="bio">About Me</label>
    <textarea id="bio" name="bio" cols="85" rows="10" value={data.results[0].bio} placeholder="About Me"></textarea>
    <label for="term">Term</label>
    <input type="text" id="term" name="term" value={data.results[0].terms} placeholder="Term">
    <label for="team">Team</label>
    <input type="text" id="team" name="team" value={data.results[0].teams} placeholder="Team">
    <label for="role">Roles</label>
    <input type="text" id="role" name="role" value={data.results[0].roles} placeholder="Roles">
    <label for="portfolio">Portfolio</label>
    <input type="text" id="portfolio" name="portfolio" value={data.results[0].link_website} placeholder="Portfolio Link">
    <label for="github">Github</label>
    <input type="text" id="github" name="github" value={data.results[0].link_github} placeholder="Github Link">
    <label for="linkedin">Linkedin</label>
    <input type="text" id="linkedin" name="linkedin" value={data.results[0].link_linkedin} placeholder="Linkedin Link">

    <button type="submit">Save</button>
</form>