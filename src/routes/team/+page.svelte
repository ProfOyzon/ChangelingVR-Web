<script lang="ts">
    import ModalLoginForm from '$lib/components/ModalLoginForm.svelte';
    import { modalStore, type ModalComponent, type ModalSettings, localStorageStore, type PopupSettings, storePopup } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
    import { user } from '$lib/firebase';
    import { goto } from '$app/navigation';
    import { logInWithEmailAndPassword } from '$lib/authFunctions';
    import type { Writable } from 'svelte/store';
    import { roles, teams, terms } from '$lib/tags';
    // Popup stuff
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
    import { popup } from '@skeletonlabs/skeleton';
    
    export let data: PageData;

    // Logs the user in and navigates to the signup page
    const logIn = async (r : any) => {
        logInWithEmailAndPassword(r.email, r.password).then(() => {
            goto("/accounts/signup");
        });
    }

    // Modal logic
    const modalComponent: ModalComponent = {
        // Pass a reference to your custom component
        ref: ModalLoginForm,
    };

    const openFormModal = () => {
        new Promise<boolean>((resolve) => {
            const modal: ModalSettings = {
                type: 'component',
                title: "Co-op Login",
                body: "Log in using a Changeling co-op account. <span class='text-warning-400'>This is for co-op members only.</span>",
                // Pass the component directly:
                component: modalComponent,
                response: (r: boolean) => {
                    resolve(r);
                }
            };
            modalStore.trigger(modal);
        }).then((r: any) => {
            if(r !== false){
                logIn(r);
            }
        });
    }

    // Filter Logic ----------------------
    let displayedUsers = data.users;

    interface FilterData {
        name: string;
        tags: {teamTags: string[]; roleTags: string[]; termTags: string[];}
    }

    const filterDefaults = {
        name: "",
        tags: {
            teamTags: [],
            roleTags: [],
            termTags: [],
        },
    };

    const filterData: Writable<FilterData> = localStorageStore("filterData", filterDefaults);

    // Helper function to check if any tag from a list is present in the user's tags
    function hasMatchingTag(tagList: string[], userTags: string[]) {
        if (tagList.length === 0) return true;
        const lowercaseTags = tagList.map((tag) => tag.toLowerCase());
        return lowercaseTags.some((tag) => userTags.includes(tag));
    }

    function filterUsers() {
        const lowercaseName = $filterData.name.toLowerCase();

        displayedUsers = data.users.filter((user) => {
            const lowercaseUserName = user.username.toLowerCase();

            // Define userTags for each user here
            const userTags = user.tags.map(
                (tag: { text: string; id: number }) => tag.text.toLowerCase()
            );

            // Check if the username starts with the lowercaseName
            const nameMatches = lowercaseUserName.startsWith(lowercaseName);

            // Check if team tags, role tags, and term tags match
            const hasMatchingTeamTag = hasMatchingTag(
                $filterData.tags.teamTags,
                userTags
            );
            const hasMatchingRoleTag = hasMatchingTag(
                $filterData.tags.roleTags,
                userTags
            );
            const hasMatchingTermTag = hasMatchingTag(
                $filterData.tags.termTags,
                userTags
            );

            return (
                nameMatches &&
                hasMatchingTeamTag &&
                hasMatchingRoleTag &&
                hasMatchingTermTag
            );
        });
    }

    function clearFilterData() {
        // Clear filter data
        filterData.set(JSON.parse(JSON.stringify(filterDefaults)));
        filterUsers();
    }

    // Pagination Logic ----------------------
    let currentPage = 1;
    const usersPerPage = 16;

    let startIndex = (currentPage - 1) * usersPerPage;
    let endIndex = startIndex + usersPerPage;

    $: totalPages = Math.ceil(displayedUsers.length / usersPerPage);
    $: paginatedUsers = displayedUsers.slice(startIndex, endIndex);

    function setCurrentPage(page: number) {
        currentPage = Math.max(1, Math.min(page, totalPages));
        startIndex = (currentPage - 1) * usersPerPage;
        endIndex = startIndex + usersPerPage;
        window.scrollTo(0, 0);
    }

    const teamsPopup: PopupSettings = {
        event: "click",
        target: "teamsPopup",
        placement: "bottom",
        middleware: {
            offset: 12,
        }
    }

    const rolesPopup: PopupSettings = {
        event: "click",
        target: "rolesPopup",
        placement: "bottom",
        middleware: {
            offset: 12,
        }
    }

    const termsPopup: PopupSettings = {
        event: "click",
        target: "termsPopup",
        placement: "bottom",
        middleware: {
            offset: 12,
        }
    }
</script>


<div class="flex gap-2 flex-col lg:flex-row">
    <form>
        <input
            type="search"
            placeholder="Search by name..."
            class="input input-info w-full lg:w-auto"
            bind:value={$filterData.name}
            on:input={filterUsers}
        />
        <input type="button" class="btn variant-filled w-full lg:w-48" use:popup={teamsPopup} value="Team"/>
        <input type="button" class="btn variant-filled w-full lg:w-48" use:popup={rolesPopup} value="Role"/>
        <input type="button" class="btn variant-filled w-full lg:w-48" use:popup={termsPopup} value="Term"/>
    </form>
    <!-- Teams -->
    <ul
        tabindex="-2"
        class="card p-4 z-10"
        data-popup="teamsPopup"
    >
        {#each teams as team}
            <label class="label cursor-pointer">
                {team}
                <input
                    type="checkbox"
                    class="checkbox"
                    bind:group={$filterData.tags.teamTags}
                    value={team}
                    on:change={filterUsers}
                />
            </label>
        {/each}
    </ul>
    <!-- Roles -->
    <ul
        tabindex="-2"
        class="card p-4 z-20"
        data-popup="rolesPopup"
    >
        {#each roles as role}
            <label class="label cursor-pointer">
                {role}
                <input
                    type="checkbox"
                    class="checkbox"
                    bind:group={$filterData.tags.roleTags}
                    value={role}
                    on:change={filterUsers}
                />
            </label>
        {/each}
    </ul>
    <!-- Terms -->
    <ul
        tabindex="-2"
        class="card p-4 z-30"
        data-popup="termsPopup"
    >
        {#each terms as term}
            <label class="label cursor-pointer">
                {term}
                <input
                    type="checkbox"
                    class="checkbox"
                    bind:group={$filterData.tags.termTags}
                    value={term}
                    on:change={filterUsers}
                />
            </label>
        {/each}
    </ul>
    <button
        class="btn variant-ghost-error w-full lg:w-52"
        disabled={$filterData.name === "" &&
            !$filterData.tags.teamTags.length &&
            !$filterData.tags.roleTags.length &&
            !$filterData.tags.termTags.length}
        on:click={clearFilterData}
    >
        Clear Filters
    </button>
    {#if !$user}
    <button class="btn variant-filled-primary" on:click={openFormModal}>Co-op Login</button>
    {/if}
</div>
<div class="divider" />
<div
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-4"
>
    {#each paginatedUsers as user}
        <div class="card bg-base-100 shadow-xl">
            <figure>
                <img src={user.photoURL} alt={user.username} />
            </figure>
            <div class="card-body p-4">
                <h2 class="card-title">{user.username}</h2>
                <div class="card-actions">
                    {#each user.tags as tag}
                        <div class="badge badge-outline">{tag.text}</div>
                    {/each}
                </div>
                <div class="h-full w-full flex">
                    <a
                        class="btn btn-secondary w-full mt-auto"
                        href={`/${user.username}`}>See Profile</a
                    >
                </div>
            </div>
        </div>
    {/each}
</div>
<div class="flex justify-center my-16 gap-2">
    <button
        class="btn btn-primary"
        disabled={currentPage === 1}
        on:click={() => setCurrentPage(currentPage - 1)}>Previous</button
    >
    <button
        class="btn btn-primary"
        disabled={currentPage === totalPages}
        on:click={() => setCurrentPage(currentPage + 1)}>Next</button
    >
</div>
