<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    export let text = "";
    export let interval = 15;
    let typedChars = "";
    let index = 0;
    let typewriter: any;
    let isTyping = true;

    const typeChar = () => {
        if(index < text.length){
            isTyping = true;
            typedChars += text[index];
            index++;
        } else {
            stopTyping();
        }
    }
    
    const stopTyping = () => {
        clearInterval(typewriter);
        isTyping = false;
    }

    const typing = () => typewriter = setInterval(typeChar, interval);

    onMount(() => {typing();});
    onDestroy(() => stopTyping)
</script>

<p class="text-black text-2xl font-bold">
    {typedChars}
</p>

<style>
    p{
        font-family: 'Courier New', Courier, monospace;
    }
</style>