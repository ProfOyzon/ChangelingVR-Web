<script lang="ts">
    import ModalLoginForm from '$lib/components/ModalLoginForm.svelte';
    import { modalStore, type ModalComponent, type ModalSettings, localStorageStore, AppShell, Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
    import { user } from '$lib/firebase';
    import { goto } from '$app/navigation';
    import { logInWithEmailAndPassword } from '$lib/authFunctions';
    import type { Writable } from 'svelte/store';
    import { roles, teams, terms } from '$lib/tags';
    import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
    
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

    const filterDefaults: FilterData = {
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
</script>

<Drawer>
    <aside class="flex flex-col p-4">
        <form>
            <input
                type="search"
                placeholder="Search by name..."
                class="input"
                bind:value={$filterData.name}
                on:input={filterUsers}
            />
        </form>
        <Accordion>
            <AccordionItem>
                <svelte:fragment slot="summary">Team</svelte:fragment>
                <svelte:fragment slot="content">
                    <ul class="p-4">
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
                </svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary">Role</svelte:fragment>
                <svelte:fragment slot="content">
                    <ul class="p-4">
                        {#each roles as role}
                            <label class="label cursor-pointer">
                                {role}
                                <input
                                    type="checkbox"
                                    class="checkbox"
                                    bind:group={$filterData.tags.teamTags}
                                    value={role}
                                    on:change={filterUsers}
                                />
                            </label>
                        {/each}
                    </ul>
                </svelte:fragment>
            </AccordionItem>
            <AccordionItem>
                <svelte:fragment slot="summary">Term</svelte:fragment>
                <svelte:fragment slot="content">
                    <ul class="p-4">
                        {#each terms as term}
                            <label class="label cursor-pointer">
                                {term}
                                <input
                                    type="checkbox"
                                    class="checkbox"
                                    bind:group={$filterData.tags.teamTags}
                                    value={term}
                                    on:change={filterUsers}
                                />
                            </label>
                        {/each}
                    </ul>
                </svelte:fragment>
            </AccordionItem>
        </Accordion>
        <button
            class="btn variant-ghost-error"
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
    </aside>
</Drawer>

<!-- DRAWER BUTTON -->
<button class="lg:hidden btn btn-icon btn-icon-lg variant-filled fixed bottom-2 right-2 shadow-lg" on:click={() => {drawerStore.open({})}}>
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="32" height="32" viewBox="0 0 256 256" xml:space="preserve">

            <defs>
            </defs>
            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                <path d="M 15.205 90 c -1.104 0 -2 -0.896 -2 -2 V 55.115 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 V 88 C 17.205 89.104 16.31 90 15.205 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 74.795 59.357 c -1.104 0 -2 -0.896 -2 -2 V 2 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 55.357 C 76.795 58.462 75.899 59.357 74.795 59.357 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 45 90 c -1.104 0 -2 -0.896 -2 -2 V 27.922 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 V 88 C 47 89.104 46.104 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 45 29.922 c -5.464 0 -9.91 -4.445 -9.91 -9.91 s 4.445 -9.91 9.91 -9.91 c 5.465 0 9.91 4.445 9.91 9.91 S 50.465 29.922 45 29.922 z M 45 14.103 c -3.259 0 -5.91 2.651 -5.91 5.91 s 2.651 5.91 5.91 5.91 s 5.91 -2.651 5.91 -5.91 S 48.259 14.103 45 14.103 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 15.205 57.115 c -5.464 0 -9.91 -4.445 -9.91 -9.91 c 0 -5.464 4.445 -9.91 9.91 -9.91 s 9.91 4.445 9.91 9.91 C 25.115 52.67 20.669 57.115 15.205 57.115 z M 15.205 41.295 c -3.259 0 -5.91 2.651 -5.91 5.91 s 2.651 5.91 5.91 5.91 s 5.91 -2.651 5.91 -5.91 S 18.464 41.295 15.205 41.295 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 74.795 75.177 c -5.464 0 -9.909 -4.445 -9.909 -9.91 c 0 -5.464 4.445 -9.909 9.909 -9.909 c 5.465 0 9.91 4.445 9.91 9.909 C 84.705 70.731 80.26 75.177 74.795 75.177 z M 74.795 59.357 c -3.259 0 -5.909 2.65 -5.909 5.909 s 2.65 5.91 5.909 5.91 s 5.91 -2.651 5.91 -5.91 S 78.054 59.357 74.795 59.357 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 15.205 41.295 c -1.104 0 -2 -0.896 -2 -2 V 2 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 37.295 C 17.205 40.4 16.31 41.295 15.205 41.295 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 45 14.103 c -1.104 0 -2 -0.896 -2 -2 V 2 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 10.103 C 47 13.207 46.104 14.103 45 14.103 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <path d="M 74.795 90 c -1.104 0 -2 -0.896 -2 -2 V 73.177 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 V 88 C 76.795 89.104 75.899 90 74.795 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
            </g>
            </svg>
    </span>
</button>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
    <svelte:fragment slot="sidebarLeft">
        <aside class="flex flex-col p-4">
            <form>
                <input
                    type="search"
                    placeholder="Search by name..."
                    class="input"
                    bind:value={$filterData.name}
                    on:input={filterUsers}
                />
            </form>
            <Accordion>
                <AccordionItem>
                    <svelte:fragment slot="summary">Team</svelte:fragment>
                    <svelte:fragment slot="content">
                        <ul class="p-4">
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
                    </svelte:fragment>
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Role</svelte:fragment>
                    <svelte:fragment slot="content">
                        <ul class="p-4">
                            {#each roles as role}
                                <label class="label cursor-pointer">
                                    {role}
                                    <input
                                        type="checkbox"
                                        class="checkbox"
                                        bind:group={$filterData.tags.teamTags}
                                        value={role}
                                        on:change={filterUsers}
                                    />
                                </label>
                            {/each}
                        </ul>
                    </svelte:fragment>
                </AccordionItem>
                <AccordionItem>
                    <svelte:fragment slot="summary">Term</svelte:fragment>
                    <svelte:fragment slot="content">
                        <ul class="p-4">
                            {#each terms as term}
                                <label class="label cursor-pointer">
                                    {term}
                                    <input
                                        type="checkbox"
                                        class="checkbox"
                                        bind:group={$filterData.tags.teamTags}
                                        value={term}
                                        on:change={filterUsers}
                                    />
                                </label>
                            {/each}
                        </ul>
                    </svelte:fragment>
                </AccordionItem>
            </Accordion>
            <button
                class="btn variant-ghost-error"
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
        </aside>
    </svelte:fragment>

    <!-- TEAM MEMBER GRID -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-4 p-4">
        {#each paginatedUsers as user}
            <a href="/{user.username}" class="card shadow-xl rounded-xl">
                <div class="card-body p-4">
                    <h2 class="card-title">{user.username}</h2>
                    <div class="mb-4">
                        {#each user.tags as tag}
                            <div class="badge variant-outline-tertiary">{tag.text}</div>
                        {/each}
                    </div>
                </div>
            </a>
        {/each}
    </div>
    <div class="flex justify-center my-16 gap-2">
        <div class="flex justify-center my-16 gap-2">
            <button
                class="btn"
                disabled={currentPage === 1}
                class:variant-filled={currentPage !== 1}
                on:click={() => setCurrentPage(currentPage - 1)}>Previous</button
            >
            {#each Array.from({ length: totalPages }) as _, i}
                <button
                    class="btn"
                    class:variant-filled={currentPage === i + 1}
                    on:click={() => setCurrentPage(i + 1)}
                    disabled={currentPage === i + 1}
                >
                    {i + 1}
                </button>
            {/each}
            <button
                class="btn"
                disabled={currentPage === totalPages}
                class:variant-filled={currentPage !== totalPages}
                on:click={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    </div>
</AppShell>
