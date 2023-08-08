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

    const logIn = async (r : any) => {
        const credential = await signInWithEmailAndPassword(auth, r.email, r.password);
        const idToken = await credential.user.getIdToken();
        
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                // NO CSRF TOKEN NEEDED, SVELTE DOES THIS FOR YOU.
            },
            body: JSON.stringify({idToken}),
        });

        goto("/accounts/login");
    }

    const logOut = async () => {
        const res = await fetch("/api/login", { method: "DELETE" });
        await signOut(auth);
    }

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

<h1>Team</h1>

<button class="btn variant-filled-primary" on:click={openFormModal}>Co-op Login</button>
{#if $user}
<button class="btn variant-filled-error" on:click={logOut}>Sign out</button>
{/if}