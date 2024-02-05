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
            <h1>Reset Your Password</h1>
            <p>Enter and confirm your new password.</p>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" required>
            <div class="spacer-top">
                <label for="confirm">Confirm Password</label>
                <input type="password" id="confirm" name="confirm" placeholder="Confirm Password" required>
            </div>
            <div class="spacer-top">
                <button class="btn" type="submit">Reset Password</button>
            </div>
        </div>
    </form>
</div>

<style>
    label{
        display: block;
        font-size: 1.25rem;
    }

    input {
        width: 100%;
        height: 1.5rem;
    }

    input:focus {
        outline: none;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 90vh;
    }

    .container {
        padding: 1rem 2rem;
        border-radius: .5rem;
        border: solid lightgray 1px;
    }

    .spacer-top {
        margin-top: 1rem;
    }

    .btn {
        font-size: 1.25rem;
        width: 100%;
        padding: .25rem;
    }
</style>