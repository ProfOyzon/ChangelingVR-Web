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
</script>

<!-- This modal component is a SINGLETON element that is modified through a modal store. YOU ONLY NEED THIS ONE. -->
<!-- Read the Skeleton modal documentation for more details: https://www.skeleton.dev/utilities/modals -->
<Modal />

<div class="flex w-full min-h-[72px] px-8 bg-surface-800">
    <div class="flex w-1/2 justify-start items-center">
        <a href="/" aria-current={$page.url.pathname === "/"}>Changeling</a>
    </div>
    <div class="flex w-1/2 justify-end">
        <nav class="flex items-center">
            <ul class="flex gap-8 items-center">
                <li><a href="/about" aria-current={$page.url.pathname === "/about"}>About</a></li>
                <li><a href="/experiences" aria-current={$page.url.pathname === "/experiences"}>Experiences</a></li>
                <li><a href="/team" aria-current={$page.url.pathname === "/team"}>Team</a></li>
                <li><a href="https://changelingvrteam.itch.io/changelingvr" class="btn variant-filled-primary">Play Now</a></li>
            </ul>
        </nav>
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
