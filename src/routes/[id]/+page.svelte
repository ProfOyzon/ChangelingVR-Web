<script>
    export let data;
    export let form;
</script>
    
<svelte:head>
    <title>{data.results[0].username} | Changeling</title>
</svelte:head>

<div class="wrapper">
    <form method="POST">
        <p>{ form?.message || "" }</p>
        <div class="test">
            <div class="grid">
                <div>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" value={data.results[0].username} placeholder="Name">
                </div>
                <div>
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" value={data.results[0].link_email} placeholder="Email">
                </div>
            </div>
            <div class="spacer-top">
                <label for="bio">About Me</label>
                <textarea id="bio" name="bio" cols="85" rows="10" value={data.results[0].bio} placeholder="About Me"></textarea>
            </div>
            <div class="grid spacer-top">
                <div>
                    <label for="term">Term</label>
                    <input type="text" id="term" name="term" value={data.results[0].terms} placeholder="Term">
                </div>
                <div>
                    <label for="team">Team</label>
                    <input type="text" id="team" name="team" value={data.results[0].teams} placeholder="Team">
                </div>
                <div>
                    <label for="role">Roles</label>
                    <input type="text" id="role" name="role" value={data.results[0].roles} placeholder="Roles">
                </div>
            </div>
            <div class="grid spacer-top">
                <div>
                    <label for="portfolio">Portfolio</label>
                    <input type="text" id="portfolio" name="portfolio" value={data.results[0].link_website} placeholder="Portfolio Link">
                </div>
                <div>
                    <label for="github">Github</label>
                    <input type="text" id="github" name="github" value={data.results[0].link_github} placeholder="Github Link">
                </div>
                <div>
                    <label for="linkedin">Linkedin</label>
                    <input type="text" id="linkedin" name="linkedin" value={data.results[0].link_linkedin} placeholder="Linkedin Link">
                </div>
            </div>
            
            <div class="spacer-top">
                <button class="btn" type="submit">Save</button>
            </div>
        </div>
    </form>
</div>
    
<style>
    label{
        display: block;
        font-size: 1.25rem;
    }

    input {
        width: 100%;
        height: 1.5rem;
    }

    textarea {
        resize: none;
    }

    textarea:focus, input:focus {
        outline: none;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 98vh;
    }

    .test {
        padding: 1rem;
        border-radius: .5rem;
        border: solid lightgray 1px;
    }

    .grid {
        display: grid;
        gap: .5rem 1.5rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .spacer-top {
        margin-top: 1rem;
    }

    .btn {
        padding: .25rem .5rem;
    }
</style>