<script>
    import { page } from "$app/stores";

    export let flexDirection = "";
</script>

<nav>
    <ul class="flex gap-8 items-center {flexDirection}">
        <li><a href="/about" aria-current={$page.url.pathname === "/about"}>About</a></li>
        <li><a href="/experiences" aria-current={$page.url.pathname === "/experiences"}>Experiences</a></li>
        <li><a href="/team" aria-current={$page.url.pathname === "/team"}>Team</a></li>
        <li><a href="https://changelingvrteam.itch.io/changelingvr" class="btn variant-filled-primary">Play Now</a></li>
    </ul>
</nav>

<style>
    [aria-current="true"]{
        text-decoration: underline;
    }
    [aria-current="false"]{
        color: lightgray;
    }
</style>