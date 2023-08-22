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

<header class="w-full h-[50vh] flex items-center justify-center">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video playsinline autoplay muted loop class="object-cover w-screen fixed top-[72px] left-0 max-h-[50vh] -z-10" id="hero-vid">
        <source src="/hero.mp4" type="video/mp4">
    </video>
    {#if ready}
        <img in:fade={{delay: 500, duration: 1000 }} src="logo.svg" alt="" class="w-1/3">
    {/if}
</header>