<script lang="ts">
    import { onDestroy, onMount } from "svelte";

    export let text = "";
    export let interval = 25;
    let typedChars = "";
    let index = 0;
    let typewriter;
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

<p class="text-black font-serif text-2xl">
    {typedChars}
</p>