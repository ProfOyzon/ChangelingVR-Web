<script lang="ts">
    import { page } from "$app/stores";
    import SortableList from "$lib/components/SortableList.svelte";
    import UserLink from "$lib/components/UserLink.svelte";
    import { db, userData, user, storage } from "$lib/firebase";
    import {
        arrayRemove,
        arrayUnion,
        doc,
        setDoc,
        updateDoc,
    } from "firebase/firestore";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
    import { writable } from "svelte/store";
    import { teams, roles, terms } from "$lib/tags";
    import type { PageData } from "./$types";
    import { Avatar } from "@skeletonlabs/skeleton";

    export let data: PageData;

    const icons = [
        "Twitter",
        "YouTube",
        "TikTok",
        "LinkedIn",
        "GitHub",
        "Custom",
    ];

    const linkFormDefaults = {
        icon: "custom",
        title: "",
        url: "https://",
    };
    const linkFormData = writable({ ...linkFormDefaults });

    const tagFormDefaults = {
        text: "",
    };
    const tagFormData = writable({ ...tagFormDefaults });

    let showLinkForm = false;
    let showTagForm = false;

    $: urlIsValid = $linkFormData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
    $: titleIsValid =
        $linkFormData.title.length < 20 && $linkFormData.title.length > 0;
    $: formIsValid = urlIsValid && titleIsValid;
    $: tagSelected = $tagFormData.text !== "";

    async function addLink(e: SubmitEvent) {
        const userRef = doc(db, "users", $user!.uid);

        await updateDoc(userRef, {
            links: arrayUnion({
                ...$linkFormData,
                id: Date.now().toString(),
            }),
        });

        linkFormData.set({
            icon: "",
            title: "",
            url: "",
        });

        showLinkForm = false;
    }

    async function deleteLink(item: any) {
        const userRef = doc(db, "users", $user!.uid);
        await updateDoc(userRef, {
            links: arrayRemove(item),
        });
    }

    async function addTag(e: SubmitEvent) {
        const userRef = doc(db, "users", $user!.uid);

        await updateDoc(userRef, {
            tags: arrayUnion({
                ...$tagFormData,
                id: Date.now().toString(),
            }),
        });

        tagFormData.set({
            text: "",
        });

        showTagForm = false;
    }

    async function deleteTag(item: any) {
        const userRef = doc(db, "users", $user!.uid);

        await updateDoc(userRef, {
            tags: arrayRemove(item),
        });
    }

    let previewURL: string;
    let uploading = false;
    $: href = `/${$userData?.username}/edit`;

    async function upload(e: any) {
        uploading = true;
        const file = e.target.files[0];
        previewURL = URL.createObjectURL(file);
        const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
        const result = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(result.ref);

        await updateDoc(doc(db, "users", $user!.uid), { photoURL: url });
        uploading = false;
    }

    let bio = $userData?.bio;
    async function updateBio(e: SubmitEvent) {
        const userRef = doc(db, "users", $user!.uid);

        await updateDoc(userRef, {
            bio: bio,
        });
    }

    function cancelLink() {
        linkFormData.set({ ...linkFormDefaults });
        showLinkForm = false;
    }

    function cancelTag() {
        tagFormData.set({ ...tagFormDefaults });
        showTagForm = false;
    }

    function sortList(e: CustomEvent) {
        const newList = e.detail;
        const userRef = doc(db, "users", $user!.uid);
        setDoc(userRef, { links: newList }, { merge: true });
    }

    function sortTags(e: CustomEvent) {
        const newList = e.detail;
        const userRef = doc(db, "users", $user!.uid);
        setDoc(userRef, { tags: newList }, { merge: true });
    }
</script>

<main class="flex justify-center p-4">
    {#if $userData?.username == $page.params.username}
        <div class="card p-4 flex flex-col gap-5 max-w-screen-md w-full">
            <!-- Profile and badges -->
            <form class="w-full">
                <!-- <div class="max-w-fit relative w-32">
                    <div class="overflow-hidden rounded-full border-2">
                        <img
                            src={previewURL ??
                                $userData?.photoURL ??
                                "/user.png"}
                            alt="photoURL"
                            class="filter"
                            class:brightness-50={uploading}
                            class:blur-sm={uploading}
                        />
                    </div>
                    <label
                        for="photoURL"
                        class="btn-icon btn-icon-sm absolute top-1 right-1"
                    >
                        <button
                            class="btn-icon variant-filled-primary"
                            on:click={() => {
                                document.getElementById("real-file")?.click();
                            }}
                        >
                            <svg
                                class="feather feather-edit"
                                fill="none"
                                height="24"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                /><path
                                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                />
                            </svg>
                        </button>
                    </label>
                </div> -->
                <div class="max-w-fit relative">
                    <Avatar src={previewURL ?? $userData?.photoURL ?? "/user.png"} width="w-32" rounded="rounded-full"/>
                    <div class="w-32 h-32 absolute top-0 left-0 rounded-full items-center justify-center flex">
                        <button 
                            class="w-32 h-32 absolute top-0 left-0 rounded-full hover:bg-opacity-50 focus:bg-opacity-50 bg-opacity-0 bg-black"
                            on:click={() => {
                                document.getElementById("real-file")?.click();
                            }}
                            aria-roledescription="change profile image"
                        >
                            Change PFP
                        </button>
                    </div>
                    <svg
                        class="absolute feather feather-edit stroke-tertiary-300 w-7 h-7 top-1 right-1"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                        /><path
                            d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                        />
                    </svg>
                </div>
                <input
                    on:change={upload}
                    hidden
                    id="real-file"
                    name="photoURL"
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/webp"
                />
            </form>
            <h1 class="text-2xl">{$userData.username}</h1>
            <!-- Tags -->
            <div>
                <SortableList
                    list={$userData?.tags}
                    on:sort={sortTags}
                    let:item
                    let:index
                >
                    <div class="group">
                        <div class="badge variant-filled-primary cursor-pointer">
                            {item.text}
                        </div>
                        <button
                            on:click={() => deleteTag(item)}
                            class="btn btn-icon btn-icon-sm variant-ghost-error invisible group-hover:visible transition-all"
                            >X</button
                        >
                    </div>
                </SortableList>
                {#if showTagForm}
                    <form
                        on:submit|preventDefault={addTag}
                        class="bg-surface-900 p-4 rounded-xl flex flex-col gap-4"
                        id="tagForm"
                    >
                        <select
                            name="icon"
                            class="select"
                            bind:value={$tagFormData.text}
                        >
                            {#each teams as team}
                                <option value={team}>{team}</option>
                            {/each}
                            {#each roles as role}
                                <option value={role}>{role}</option>
                            {/each}
                            {#each terms as term}
                                <option value={term}>{term}</option>
                            {/each}
                        </select>

                        <button
                            disabled={!tagSelected}
                            type="submit"
                            class="btn variant-filled-success block">Add Tag</button
                        >

                        <button
                            type="button"
                            class="btn variant-filled"
                            on:click={cancelTag}>Cancel</button
                        >
                    </form>
                {:else}
                    <button
                        on:click={() => (showTagForm = true)}
                        class="btn variant-ghost-tertiary btn-info block mt-3"
                    >
                        Add a Tag
                    </button>
                {/if}
            </div>
            <!-- Bio -->
            <div>
                <form on:submit|preventDefault={updateBio}>
                    <div class="form-control">
                        <label for="bio" class="label">
                            <span class="label-text">Your bio</span>
                        </label>
                        <textarea
                            name="bio"
                            class="textarea textarea-bordered textarea-accent"
                            bind:value={bio}
                        />
                    </div>
                    <button class="btn variant-ghost-tertiary mt-3" type="submit"
                        >Update Bio</button
                    >
                </form>
            </div>
            <!-- Links -->
            <div>
                <SortableList
                    list={$userData?.links}
                    on:sort={sortList}
                    let:item
                    let:index
                >
                    <div class="group relative">
                        <UserLink {...item} />
                        <button
                            on:click={() => deleteLink(item)}
                            class="btn btn-xs variant-ghost-error invisible group-hover:visible transition-all absolute right-[10px] bottom-[10px]"
                            >Remove</button
                        >
                    </div>
                </SortableList>

                {#if showLinkForm}
                    <form
                        on:submit|preventDefault={addLink}
                        class="p-4 w-full mx-auto rounded-xl bg-surface-900 mt-1 flex flex-col gap-4"
                        id="linkForm"
                    >
                        <div class="flex gap-4">
                            <select
                                name="icon"
                                class="select"
                                bind:value={$linkFormData.icon}
                            >
                                {#each icons as icon}
                                    <option value={icon.toLowerCase()}
                                        >{icon}</option
                                    >
                                {/each}
                            </select>
                            <input
                                name="title"
                                type="text"
                                placeholder="Title"
                                class="input"
                                bind:value={$linkFormData.title}
                            />
                            <input
                                name="url"
                                type="text"
                                placeholder="URL"
                                class="input"
                                bind:value={$linkFormData.url}
                            />
                        </div>
                        <div>
                            {#if !titleIsValid}
                                <p class="text-error-300">
                                    Must have valid title
                                </p>
                            {/if}
                            {#if !urlIsValid}
                                <p class="text-error-300">
                                    Must have a valid URL
                                </p>
                            {/if}
                            {#if formIsValid}
                                <p class="text-success-300">Looks good!</p>
                            {/if}
                        </div>

                        <button
                            disabled={!formIsValid}
                            type="submit"
                            class="btn variant-filled-success block">Add Link</button
                        >

                        <button
                            type="button"
                            class="btn variant-filled"
                            on:click={cancelLink}>Cancel</button
                        >
                    </form>
                {:else}
                    <button
                        on:click={() => (showLinkForm = true)}
                        class="btn variant-ghost-tertiary block mt-3"
                    >
                        Add a Link
                    </button>
                {/if}
            </div>
            <a class="btn variant-filled-tertiary" href={`/${$userData.username}`}
                >Back to Profile</a
            >
        </div>
    {/if}
</main>
