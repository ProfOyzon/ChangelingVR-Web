<script>
    import { goto } from "$app/navigation";
    export let form;

    if (form?.message === "New Password Saved") {
        goto("/");
    }
</script>

<div class="wrapper">
    <form method="POST">
        <p>{ form?.message || "" }</p>
        
        <div class="container">
            <p>Enter and confirm your new password.</p>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <div class="spacer-top">
                <label for="confirm">Confirm Password</label>
                <input type="password" id="confirm" name="confirm" placeholder="Confirm Password" required>
            </div>
            <div class="spacer-top">
                <button class="btn" type="submit">Confirm</button>
            </div>
        </div>
    </form>
</div>