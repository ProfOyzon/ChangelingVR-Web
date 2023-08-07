<script>
    // NOTE: THE ORDER OF THESE IMPORTS IS IMPORTANT! MAKE ALL OTHER IMPORTS AFTER APP.postcss!
    // Your selected Skeleton theme:
    import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    // This contains the bulk of Skeletons required styles:
    import '@skeletonlabs/skeleton/styles/skeleton.css';
    // Finally, your application's global stylesheet (sometimes labeled 'app.css')
    import '../app.postcss';

    import {page} from "$app/stores";

    import { AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- slotDefault is set to hidden because it represents the center piece of an AppBar, and this element does not need a center piece. -->
<AppBar gridColumns="grid-cols-2" slotDefault="hidden" slotTrail="place-content-end" padding="py-6 px-8">
	<svelte:fragment slot="lead">
        <a href="/" aria-current={$page.url.pathname === "/"}>Changeling</a>
    </svelte:fragment>
	<svelte:fragment slot="trail">
        <nav>
            <ul class="flex gap-12">
                <li><a href="/about" aria-current={$page.url.pathname === "/about"}>About</a></li>
                <li><a href="/experiences" aria-current={$page.url.pathname === "/experiences"}>Experiences</a></li>
                <li><a href="/team" aria-current={$page.url.pathname === "/team"}>Team</a></li>
                <li><a href="https://changelingvrteam.itch.io/changelingvr">Play Now</a></li>
            </ul>
        </nav>
    </svelte:fragment>
</AppBar>

<slot />
