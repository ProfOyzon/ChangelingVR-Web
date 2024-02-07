<script>
    export let data;
    export let form;

    let years = [];
    let teams = [];
    let roles = [];
</script>
    
<svelte:head>
    <title>{data.results[0].username} | Changeling</title>
</svelte:head>

<div class="wrapper">
    <form method="POST">
        <p>{ form?.message || "" }</p>
        <div class="container">
            <div class="grid-2">
                <div>
                    <label class="label-block" for="name">Name</label>
                    <input class="input-box" type="text" id="name" name="name" value={data.results[0].username} placeholder="Name" required>
                </div>
                <div>
                    <label class="label-block" for="email">Contact Email</label>
                    <input class="input-box" type="email" id="email" name="email" value={data.results[0].link_email} placeholder="Email" required>
                </div>
            </div>

            <div class="spacer-top">
                <label class="label-block" for="bio">About Me</label>
                <textarea id="bio" name="bio" cols="85" rows="10" value={data.results[0].bio} placeholder="About Me" required></textarea>
            </div>

            <div class="grid-2 spacer-top">
                <div>
                    <p class="category-name">Years</p>
                    <div class="grid-3">
                        <div>
                            <input type="checkbox" id="2020" bind:group={years} name="years" value="2020">
                            <label for="2020">2020</label>
                        </div>
                        <div>
                            <input type="checkbox" id="2021" bind:group={years} name="years" value="2021">
                            <label for="2021">2021</label>
                        </div>
                        <div>
                            <input type="checkbox" id="2022" bind:group={years} name="years" value="2022">
                            <label for="2022">2022</label>
                        </div>
                        <div>
                            <input type="checkbox" id="2023" bind:group={years} name="years" value="2023">
                            <label for="2023">2023</label>
                        </div>
                        <div>
                            <input type="checkbox" id="2024" bind:group={years} name="years" value="2024">
                            <label for="2024">2024</label>
                        </div>
                    </div>
                </div>

                <div>
                    <p class="category-name">Teams</p>
                    <div class="grid-3">
                        <div>
                            <input type="checkbox" id="development" bind:group={teams}  name="teams" value="Development">
                            <label for="development">Development</label>
                        </div>
                        <div>
                            <input type="checkbox" id="art" bind:group={teams} name="teams" value="Art">
                            <label for="art">Art</label>
                        </div>
                        <div>
                            <input type="checkbox" id="tech-art" bind:group={teams} name="teams" value="Tech Art">
                            <label for="tech-art">Tech Art</label>
                        </div>
                        <div>
                            <input type="checkbox" id="audio" bind:group={teams} name="teams" value="Audio">
                            <label for="audio">Audio</label>
                        </div>
                        <div>
                            <input type="checkbox" id="web" bind:group={teams} name="teams" value="Web">
                            <label for="web">Web</label>
                        </div>
                        <div>
                            <input type="checkbox" id="narrative" bind:group={teams} name="teams" value="Narrative">
                            <label for="narrative">Narrative</label>
                        </div>
                        <div>
                            <input type="checkbox" id="voice" bind:group={teams} name="teams" value="Voice">
                            <label for="voice">Voice</label>
                        </div>
                        <div>
                            <input type="checkbox" id="production" bind:group={teams} name="teams" value="Production">
                            <label for="production">Production</label>
                        </div>
                    </div>
                </div>

                <div>
                    <p class="category-name">Roles</p>
                    <div class="grid-3">
                        <div>
                            <input type="checkbox" id="programmer" bind:group={roles} name="roles" value="Programmer">
                            <label for="programmer">Programmer</label>
                        </div>
                        <div>
                            <input type="checkbox" id="level-designer" bind:group={roles} name="roles" value="Level Designer">
                            <label for="level-designer">Level Designer</label>
                        </div>
                        <div>
                            <input type="checkbox" id="ui-ux" bind:group={roles} name="roles" value="UI/UX Designer">
                            <label for="ui-ux">UI/UX Designer</label>
                        </div>
                        <div>
                            <input type="checkbox" id="writer" bind:group={roles} name="roles" value="Writer">
                            <label for="writer">Writer</label>
                        </div>
                        <div>
                            <input type="checkbox" id="voice-actor" bind:group={roles} name="roles" value="Voice Actor">
                            <label for="voice-actor">Voice Actor</label>
                        </div>
                        <div>
                            <input type="checkbox" id="2d-artist" bind:group={roles} name="roles" value="2D Artist">
                            <label for="2d-artist">2D Artist</label>
                        </div>
                        <div>
                            <input type="checkbox" id="3d-modeler" bind:group={roles} name="roles" value="3D Modeler">
                            <label for="3d-modeler">3D Modeler</label>
                        </div>
                        <div>
                            <input type="checkbox" id="tech-artist" bind:group={roles} name="roles" value="Tech Artist">
                            <label for="tech-artist">Tech Artist</label>
                        </div>
                        <div>                       
                            <input type="checkbox" id="concept-artist" bind:group={roles} name="roles" value="Concept Artist">
                            <label for="concept-artist">Concept Artist</label>
                        </div>
                        <div>        
                            <input type="checkbox" id="sound-designer" bind:group={roles} name="roles" value="Sound Designer">
                            <label for="sound-designer">Sound Designer</label>
                        </div>
                        <div>                       
                            <input type="checkbox" id="composer" bind:group={roles} name="roles" value="Composer">
                            <label for="composer">Composer</label>
                        </div>
                        <div> 
                            <input type="checkbox" id="producer" bind:group={roles} name="roles" value="Producer">
                            <label for="producer">Producer</label>
                        </div>
                        <div> 
                            <input type="checkbox" id="lead" bind:group={roles} name="roles" value="Lead">
                            <label for="lead">Lead</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid-2 spacer-top">
                <div>
                    <label class="label-block" for="portfolio">Portfolio</label>
                    <input class="input-box" type="url" id="portfolio" name="portfolio" value={data.results[0].link_website} placeholder="Portfolio Link">
                </div>
                <div>
                    <label class="label-block" for="github">Github</label>
                    <input class="input-box" type="url" id="github" name="github" value={data.results[0].link_github} placeholder="Github Link">
                </div>
                <div>
                    <label class="label-block" for="linkedin">Linkedin</label>
                    <input class="input-box" type="url" id="linkedin" name="linkedin" value={data.results[0].link_linkedin} placeholder="Linkedin Link">
                </div>
            </div>
            
            <div class="spacer-top">
                <button class="btn" type="submit">Save</button>
            </div>
        </div>
    </form>
</div>
    
<style>
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

    .container {
        padding: 1rem;
        border-radius: .5rem;
        border: solid lightgray 1px;
    }

    .grid-2 {
        display: grid;
        gap: .5rem 1.5rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .grid-3 {
        display: grid;
        gap: .25rem 1.5rem;
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .spacer-top {
        margin-top: 1rem;
    }

    .label-block{
        display: block;
        font-size: 1.25rem;
    }

    .input-box {
        width: 100%;
        height: 1.5rem;
    }

    .category-name {
        font-size: 1.25rem;
        margin: 0 0 .5rem;
    }

    .btn {
        font-size: 1.25rem;
        padding: .25rem .5rem;
    }
</style>