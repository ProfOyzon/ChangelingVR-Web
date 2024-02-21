<script>
    import 'cropperjs/dist/cropper.css';
    import Cropper from "cropperjs";

    export let data;
    export let form;

    let years = data.results[0].terms.split(",");
    let teams = data.results[0].teams.split(",");
    let roles = data.results[0].roles.split(",");
    let pfpSrc = `https://www.changelingvr.com/image/team/${data.results[0].id}.jpg`;
    const defaultPfp = "/silhouetteAvatar2.png";

    let image;
    let cropper;
    let imgType;
    
    const updatePfp = (e) => {
        imgType = e.target.files[0].type;
        
        // Open modal
        const modal = document.querySelector(".pfp-modal");
        modal.showModal();

        // Create image cropper 
        image = document.querySelector(".img-cropping");
        let imgURL = URL.createObjectURL(e.target.files[0]);

        if (cropper) {
            cropper.destroy();
        }

        image.src = imgURL;
        cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        viewMode: 3,
        autoCropArea: 1,
        cropBoxResizable: false
        });
    }

    const getCropped = () => {
        // Get cropped image as base64
        const croppedImage = cropper.getCroppedCanvas().toDataURL(imgType);

        let img = document.createElement("img");
        img.src = croppedImage;
        img.onload = () => {
            // Resize image to 512x512
            const wantedDim = 512;
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = wantedDim;
            canvas.height = wantedDim;
            ctx.drawImage(img, 0, 0, wantedDim, wantedDim);
            const resizedImg = canvas.toDataURL(imgType);

            // Change profile image
            const pfpImg = document.querySelector(".pfp");
            pfpImg.src = resizedImg;

            // Send image to server
            const res = fetch("https://www.changelingvr.com/pfp", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    id: data.results[0].id,
                    base64: resizedImg.split(";base64,").pop()
                }),
            });
        }

        // Close modal
        const modal = document.querySelector(".pfp-modal");
        modal.close();
    }

    const closeModal = () => {
        const modal = document.querySelector(".pfp-modal");
        const pfpInput = document.querySelector("#pfp");
        pfpInput.value = "";
        modal.close();
    }    
</script>
    
<svelte:head>
    <title>{data.results[0].username} | Changeling</title>
</svelte:head>

<div class="wrapper">
    <form method="POST" enctype="multipart/form-data">
        <p class="message">{ form?.message || "" }</p>
        <div class="container">
            <div class="grid-2">
                <div>
                    <label class="label-block" for="name">Name</label>
                    <input class="input-box" type="text" id="name" name="name" value={data.results[0].username} placeholder="Name" required>
                    <label class="label-block spacer-top" for="email">Contact Email</label>
                    <input class="input-box" type="email" id="email" name="email" value={data.results[0].link_email} placeholder="Email" required>
                    <div class="spacer-top">
                        <label class="label-block" for="bio">About Me</label>
                        <textarea id="bio" name="bio" value={data.results[0].bio} placeholder="About Me" maxlength="550" required></textarea>
                    </div>
                </div>
                <div>
                    <label class="pfp-label" for="pfp">Picture:</label>
                    <input on:change={updatePfp} type="file" id="pfp" accept=".jpg, .jpeg, .png">
                    <div class="pfp-container spacer-top">
                        <img class="pfp" src={data.pfpStatus === 200 ? pfpSrc : defaultPfp} alt="">
                    </div>
                    <dialog class="pfp-modal">
                        <div class="cropper-container">
                            <img class="img-cropping" src="" alt="">
                        </div>
                        <div class="modal-btn-container">
                            <button class="close-modal btn spacer-top" type="button" on:click={closeModal}>Cancel</button>
                            <button class="btn spacer-top" type="button" on:click={getCropped}>Crop</button>
                        </div>
                    </dialog>
                </div>
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
        width: 100%;
        height: 14vh;
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
        /* border-radius: .5rem;
        border: solid lightgray 1px; */
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
        height: 1.8rem;
    }

    .category-name {
        font-size: 1.25rem;
        margin: 0 0 .5rem;
    }

    .btn {
        font-size: 1.25rem;
        padding: .25rem .5rem;
    }

    .pfp-container {
        display: flex;
        justify-content: center;
    }

    .pfp {
        width: 256px;
        height: 256px;
    }

    .pfp-label {
        font-size: 1.25rem;
    }

    .img-cropping {
        display: block;
        max-width: 100%;
    }

    .pfp-modal{
        background-color: #ffcc70;
    }

    .cropper-container {
        width: 512px;
        height: 512px;
    }

    .modal-btn-container {
        display: flex;
        justify-content: space-between;
    }

    dialog::backdrop {
        background-color: rgba(0, 0, 0, .85);
    }
</style>