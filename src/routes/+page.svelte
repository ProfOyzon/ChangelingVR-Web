<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import {fade} from "svelte/transition"
    
    export let data: PageData;

    let ready = false;
    onMount(() => ready = true)
</script>

<svelte:head>
    <title>ChangelingVR | Home</title>
</svelte:head>

<section class="relative min-h-[31.25rem] md:p-[3.75rem]">
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
            <img in:fade={{delay: 500, duration: 1000 }} src="logo.svg" alt="" class="w-[80vw] h-[35vw] md:w-[30vw] md:h-[17.63vw] z-10">
        {/if}
    </div>
</section>