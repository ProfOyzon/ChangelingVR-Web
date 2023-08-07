<script lang="ts">
    import ModalLoginForm from '$lib/components/ModalLoginForm.svelte';
    import { modalStore, type ModalComponent, type ModalSettings, Modal } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
    import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
    import { auth, user } from '$lib/firebase';
    import { goto } from '$app/navigation';
    
    export let data: PageData;

    const modalComponent: ModalComponent = {
        // Pass a reference to your custom component
        ref: ModalLoginForm,
    };

    const openFormModal = async () => {
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
                signInWithEmailAndPassword(auth, r.email, r.password).then(() => {
                    goto("/accounts/login");
                });
            }
        });
    }
</script>

<h1>Team</h1>

<button class="btn variant-filled-primary" on:click={openFormModal}>Co-op Login</button>
{#if $user}
<button class="btn variant-filled-error" on:click={() => signOut(auth)}>Sign out</button>
{/if}
<a class="btn variant-filled-secondary" href="/accounts/login">Login Page</a>