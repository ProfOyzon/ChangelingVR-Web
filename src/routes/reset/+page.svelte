<script>
    import { enhance } from "$app/forms";
    export let form;
</script>

<div class="wrapper">
    <form method="POST" use:enhance>
        <p class="message">{ form?.message || "" }</p>
        
        <div class="container">
            <h1>Forgot Password</h1>
            <p>We will send you an email with instructions on how to reset your password.</p>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" required>
            <div class="spacer-top">
                <button class="btn" type="submit">Send</button>
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
        height: 1.8rem;
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
        max-width: 750px;
        width: auto;
        margin: 1rem 2rem;
        margin-bottom: 40px;
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