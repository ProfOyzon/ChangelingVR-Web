<script lang="ts">
    export let icon = "default";
    export let url = "foo";
    export let title = "some cool title";
</script>

<a
    href={url}
    class="bg-surface-900 rounded-lg flex p-4 relative justify-center"
>
    <img src={`/${icon}.png`} alt={icon} width="32" height="32" class="w-8 absolute left-4" />
    <span class="text-lg text-white font-bold">{title}</span>
</a>
