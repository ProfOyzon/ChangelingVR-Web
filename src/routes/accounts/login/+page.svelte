<script lang="ts">
    import { goto } from "$app/navigation";
    import { logInWithEmailAndPassword, logInWithGoogle } from "$lib/authFunctions";

    async function googleLogin() {
        logInWithGoogle().then(() => {
            goto("/team");
        });
    }

    const formData = {
        email: "",
        password: "",
    }

    async function emailAndPasswordLogin(e: SubmitEvent) {
        logInWithEmailAndPassword(formData.email, formData.password).then(() => {
            goto("/team");
        });
    }
</script>

<div
    class="flex justify-center items-center min-h-[calc(100vh-4.25rem-2.5rem)]"
>
    <div class="card p-4 shadow-2xl flex flex-col items-center gap-4">
        <h1 class="text-2xl font-bold">Login</h1>
        <button class="btn variant-filled" on:click={googleLogin}
            >Log in with Google</button
        >
        <form on:submit|preventDefault={emailAndPasswordLogin} class="flex flex-col gap-1">
            <label for="txtEmail">Email</label>
            <input
                class="input input-bordered"
                type="email"
                name="txtEmail"
                id="txtEmail"
                bind:value={formData.email}
            />
            <label for="txtPassword">Password</label>
            <input
                class="input input-bordered"
                type="password"
                name="txtPassword"
                id="txtPassword"
                bind:value={formData.password}
            />
            <input
                class="btn variant-filled-primary mt-4 cursor-pointer"
                type="submit"
                value="Log in"
            />
        </form>
        <p>Don't have an account? <a href="/accounts/signup" class="anchor">Sign up</a></p>
    </div>
</div>
