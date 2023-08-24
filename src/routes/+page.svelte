<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import {fade, fly} from "svelte/transition"
    import { quintOut } from 'svelte/easing';
    
    export let data: PageData;

    let ready = false;
    onMount(() => ready = true)
</script>

<svelte:head>
    <title>ChangelingVR | Home</title>
</svelte:head>

<!-- Hero -->
<header class="relative md:p-[3.75rem]">
    <div id="background-wrapper" class="hidden md:block absolute top-0 left-0 bottom-0 w-full bg-black">
        <div class="w-full h-full bg-black relative z-0">
            <video preload="auto" autoplay loop muted class="relative w-full h-full object-cover object-top">
                <source src="/hero-blurred.mp4" type="video/mp4" />
            </video>
        </div>
    </div>
    <div id="foreground-wrapper" class="z-10 flex items-center justify-center max-w-[105rem] min-h-[25rem] mx-auto relative">
        <div class="absolute left-0 top-0 w-full h-full bg-black">
            <div class="w-full h-full">
                <video preload="auto" autoplay muted loop class="object-cover object-center w-full h-full border-primary-500 md:border-[1px]" id="hero-vid">
                    <source src="/hero.mp4" type="video/mp4">
                </video>
            </div>
        </div>
        {#if ready}
            <img in:fade={{delay: 250, duration: 1000 }} src="logo.svg" alt="" class="w-[80vw] h-[35vw] md:w-[30vw] md:h-[17.63vw] z-10">
        {/if}
    </div>
</header>

<main>
    <!-- Blurb -->
    <section class="flex justify-center items-center bg-[url(/paper.png)] bg-no-repeat bg-cover bg-center min-h-[32.25rem] px-4 py-16 md:p-16">
        <div class="w-full flex flex-col max-w-[1000px]">
            {#if ready}
                <div in:fly={{delay: 250, duration: 1000, x: -1000, opacity: 0, easing: quintOut}} >
                    <p class="text-black text-2xl font-mono">Changeling is a virtual reality Narrative Mystery game where sinister magics meet old-school detective work. Observe and enter the minds of your client's family in order to uncover the truth behind their child's sudden unresponsiveness.</p>
                    <div class="flex justify-center">
                        <a class="btn variant-filled-secondary w-[15rem] mt-10 cursor-pointer" href="https://changelingvrteam.itch.io/changelingvr">Play Now</a>
                    </div>
                </div>
            {/if}
        </div>
    </section>

    <!-- Compatible Platforms -->
    <section class="flex flex-col items-center px-4 py-16 md:p-16 bg-surface-700">
        <h2 class="h2">Compatible Platforms</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <li><a href="https://www.oculus.com/quest/refurbished/" class="btn variant-outline-tertiary w-full">Oculus Quest</a></li>
            <li><a href="https://www.oculus.com/quest/refurbished/" class="btn variant-outline-tertiary w-full">Oculus Quest 2</a></li>
            <li><a href="https://www.vive.com/us/" class="btn variant-outline-tertiary w-full">HTC Vive</a></li>
            <li><a href="https://store.steampowered.com/valveindex" class="btn variant-outline-tertiary w-full">Valve Index</a></li>
            <li><a href="https://www.amazon.com/s?k=windows+mixed+reality+headset" class="btn variant-outline-tertiary w-full">Windows Mixed Reality</a></li>
        </ul>
    </section>

    <!-- About Changeling -->
    <section class="flex flex-col items-center px-4 py-16 md:p-16">
        <h2 class="h2">About Changeling</h2>
        <p class="text-xl max-w-[1000px] mt-4">The passionate detective Aurelia Walker an adept in magical beings and mischief has just been called by Angela Summers. The Summers-Manalo family's infant, Tobi, has suddenly become unresponsive, and they're desperate for help after all else has failed. Using her powers of dreamwalking, Aurelia must uncover the truth behind Tobi's concerning state.</p>
        <!-- Trailer -->
        <div class="mt-6 w-full lg:w-3/4 max-w-[1280px] md:p-4 border-primary-500 md:border-[1px]">
            <iframe class="aspect-video w-full" src="https://www.youtube.com/embed/nZGJtnUvC2I?si=rN33M4fFuei-eHf0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>    
    </section>

    <!-- Experiences Link -->
    <section class="flex flex-col items-center px-4 py-16 md:p-16 bg-surface-700">
        <h3 class="h2">Experiences</h3>
        <p class="text-xl max-w-[1000px] mt-4">Get to know Aurelia and the Summers-Manalo family through unique "experiences" by clicking below!</p>
        <a href="/experiences" class="btn variant-filled-primary cursor-pointer">Experiences</a>
    </section>

    <!-- Team Link -->
    <section class="flex flex-col items-center px-4 py-16 md:p-16">
        <h3 class="h2">Meet the Team</h3>
        <p class="text-xl max-w-[1000px] mt-4">If you'd like to meet all the wonderful people who made this project possible, click below!</p>
        <a href="/team" class="btn variant-filled-primary cursor-pointer">The Team</a>
    </section>
</main>