<script lang="ts">
    // NOTE: THE ORDER OF THESE IMPORTS IS IMPORTANT! MAKE ALL OTHER IMPORTS AFTER APP.postcss!
    // Your selected Skeleton theme:
    //import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    import "../theme.postcss"
    // This contains the bulk of Skeletons required styles:
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    // Finally, your application's global stylesheet (sometimes labeled 'app.css')
    import '../app.postcss';
    // Some FloatingUI imports and logic, makes avatar popup work
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
    import { Avatar, storePopup } from '@skeletonlabs/skeleton';
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
    import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

    import {page} from "$app/stores";

    import { Modal } from '@skeletonlabs/skeleton';
    import { user, userData} from "$lib/firebase"
    import { logOut } from '$lib/authFunctions';
    import NavList from "$lib/components/NavList.svelte";
    import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
    import type { DrawerSettings } from '@skeletonlabs/skeleton';
    import { draw } from "svelte/transition";
    import TeamFilters from "$lib/components/TeamFilters.svelte";

    // Check if user exists and is not entry account. Exposing this uid is harmless.
    $: loggedIn = $user && $user.uid !== "DCIIQ24N0XPNIcpTFPFuVqR6wLO2";

    // Popup logic
    const profilePopup: PopupSettings = {
        event: "click",
        target: "profilePopup",
        placement: "bottom-end",
        middleware: {
            offset: 24,
        }
    }

    const settings: DrawerSettings = {id: "nav-list"}
</script>

<!-- This modal component is a SINGLETON element that is modified through a modal store. YOU ONLY NEED THIS ONE. -->
<!-- Read the Skeleton modal documentation for more details: https://www.skeleton.dev/utilities/modals -->
<Modal />

<Drawer>
    {#if $drawerStore.id === "nav-list"}
        <NavList flexDirection="flex-col"/>
    {:else if $drawerStore.id === "team-filters"}
        <TeamFilters />
    {/if}
</Drawer>

<div class="flex w-full max-h-[72px] px-8 py-3 bg-surface-800">
    <button class="btn pl-0 lg:hidden" on:click={() => {drawerStore.open(settings)}}>
        <svg viewBox="0 0 100 100" width="25" height="25">
            <g color="white">
                <rect y="11.1" width="100" height="11.1" fill="currentcolor"></rect>
                <rect y="44.4" width="100" height="11.1" fill="currentcolor"></rect>
                <rect y="77.7" width="100" height="11.1" fill="currentcolor"></rect>
            </g>
        </svg>
    </button>
    <div class="flex w-1/2 justify-start items-center">
        <!-- Uncomment when fully switching to new web page -->
        <!-- <a href="/" class="h-full" aria-current={$page.url.pathname === "/"} aria-label="home"> -->
        <a href="https://www.changelingvr.com/" class="h-full" aria-current={$page.url.pathname === "https://www.changelingvr.com/"} aria-label="home">

            <img src="/navIcon.png" alt="changeling logo" class="h-full"/>
        </a>
    </div>
    <div class="flex w-1/2 justify-end">
        <div class="hidden lg:block">
            <NavList />
        </div>
        <div class="flex items-center" class:ml-8={$user}>
            {#if loggedIn}
                <button class="btn-icon btn-icon-lg variantoverflow-hidden" use:popup={profilePopup}>
                    <Avatar src={$userData?.photoURL ?? "/user.png"} width="w-32" rounded="rounded-full"/>    
                </button>
                <!-- POPUP CONTENT -->
                <div class="card p-4 w-52 shadow-xl text-center z-10" data-popup="profilePopup">
                    <p class="mb-2 underline">{$user?.displayName}</p>
                    <ul class="flex flex-col gap-2">
                        <li class="w-full"><a href="/{$user?.displayName}" class="btn variant-filled-secondary w-full">View Profile</a></li>
                        <li class="w-full"><a href="/{$user?.displayName}/edit" class="btn variant-filled-secondary w-full">Edit Profile</a></li>
                        <li class="w-full"><button on:click={logOut} class="btn variant-ghost-error w-full">Log Out</button></li>
                    </ul>
                    <div class="arrow bg-surface-100-800-token" />
                </div>
            {:else if $user}
                <button class="btn btn-sm variant-ringed-error" on:click={logOut}>X</button>
            {/if}
        </div>
    </div>
</div>

<slot />
