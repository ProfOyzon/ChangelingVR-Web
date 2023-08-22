<script lang="ts">
    import { page } from "$app/stores";
    import UserLink from "$lib/components/UserLink.svelte";
    import { userData } from "$lib/firebase";
    import { Avatar } from "@skeletonlabs/skeleton";
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<svelte:head>
    <title>ChangelingVR | {data.username}</title>
    <meta name="description" content={data.bio} />
</svelte:head>

<main class="flex justify-center p-4">
    <div class="flex flex-col gap-5 max-w-screen-md w-full card p-4">
        <!-- Profile Image -->
        <Avatar src={data.photoURL ?? "/user.png"} width="w-32" rounded="rounded-full"/>
        <h1 class="text-2xl">{data.username}</h1>
        <!-- Username -->
        <!-- Tags -->
        {#if data.tags.length}
            <!-- content here -->
            <div class="flex flex-wrap items-center gap-2">
                {#each data.tags as tag}
                    <div class="badge variant-filled-primary">{tag.text}</div>
                {/each}
            </div>
        {:else}
             <p>No tags yet...</p>
        {/if}
        <!-- Bio -->
        <div>
            <p>
                {data.bio ?? "This member does not have a bio."}
            </p>
        </div>
        <!-- Links -->
        <ul class="list-none">
            {#each data.links as link}
                <li class="p-[2px]">
                    <UserLink {...link} />
                </li>
            {/each}
        </ul>
        {#if $userData?.username == $page.params.username}
            <a class="btn variant-ghost-tertiary" href={`${data.username}/edit`}
                >Edit Profile</a
            >
        {/if}
    </div>
</main>
