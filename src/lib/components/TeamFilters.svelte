<script lang="ts">
    import { user } from "$lib/firebase";
    import { roles, teams, terms } from "$lib/tags";
    import { filterData, resetFilters } from "$lib/teamData";
    import { Accordion, AccordionItem, modalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";

    import ModalLoginForm from '$lib/components/ModalLoginForm.svelte';
    import { logInWithEmailAndPassword } from "$lib/authFunctions";
    import { goto } from "$app/navigation";
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
</script>
<aside class="flex flex-col p-4">
    <form>
        <input
            type="search"
            placeholder="Search by name..."
            class="input"
            bind:value={$filterData.name}
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
        on:click={resetFilters}
    >
        Clear Filters
    </button>
    {#if !$user}
        <button class="btn variant-filled-primary" on:click={openFormModal}>Co-op Login</button>
    {/if}
</aside>