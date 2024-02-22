<script>
    import { enhance } from '$app/forms'

    export let form; 
</script>

<div class="wrapper">
    <form method="POST" action="?/emailToken" use:enhance={({ formData }) => {
        if (form?.token) {
            formData.append("email", form.email);
            formData.append("confirm", form.confirm);
            formData.append("token", form.token);
        }
    }}>
        <p class="message">{ form?.message || "" }</p>
        
        <div class="container">
            {#if form?.tokenGen}
            <label for="verification">Verification Token</label>
            <input type="input" id="verification" name="verification" placeholder="Verification Token" required>
            {:else}
            <label for="email">RIT Email</label>
            <input type="email" id="email" name="email" placeholder="RIT Email" required>
            <div class="spacer-top">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password" required>
            </div>
            <div class="spacer-top">
                <label for="confirm">Confirm Password</label>
                <input type="password" id="confirm" name="confirm" placeholder="Confirm Password" required>
            </div>
            {/if}

            {#if form?.tokenGen}
            <div class="spacer-top">
                <button class="btn" formaction="?/verify" type="submit">Verify</button>
            </div>
            {:else}
            <div class="spacer-top">
                <button class="btn" type="submit">Sign Up</button>
            </div>
            {/if}

            {#if !form?.tokenGen}
            <p>Already have an account? <a href="/">Log In</a></p>
            {/if}
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
        padding: 1rem 2rem;
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