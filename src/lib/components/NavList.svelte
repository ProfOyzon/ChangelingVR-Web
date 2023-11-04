<script>
    import { page } from "$app/stores";

    export let flexDirection = "";
</script>

<nav>
    <ul class="flex gap-8 items-center {flexDirection}">
        <!-- Uncomment when fully switching to new web page -->
        <!-- <li><a href="/experiences" aria-current={$page.url.pathname === "/experiences"}>Experiences</a></li> -->
        <li><a href="https://www.changelingvr.com/characters.html#mainchar-link" aria-current={$page.url.pathname === "https://www.changelingvr.com/characters.html#mainchar-link"}>Experiences</a></li>
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