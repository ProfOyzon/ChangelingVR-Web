<script lang="ts">
    import { goto } from "$app/navigation";
    import { signUpWithEmailAndPassword, signUpWithGoogle } from "$lib/authFunctions";
    import { user, db } from "$lib/firebase";
    import { doc, writeBatch } from "firebase/firestore";

    async function googleSignup() {
        signUpWithGoogle().then(() => {
            createBaseAccountInfo();
            goto("/team");
        });
    }

    const formData = {
        email: "",
        password: "",
        username: "",
    }

    async function signUp() {
        signUpWithEmailAndPassword(formData.email, formData.password, formData.username).then(() => {
            goto("/team");
        });
    }

    async function createBaseAccountInfo() {
        const batch = writeBatch(db);

        batch.set(
            doc(
                db,
                "usernames",
                $user?.displayName ?? "couldn't find username"
            ),
            {
                uid: $user?.uid,
            }
        );
        batch.set(doc(db, "users", $user!.uid), {
            username: $user?.displayName,
            photoURL: $user?.photoURL ?? null,
            tags: [],
            published: true,
            bio: null,
            links: [
                {
                    title: "My YouTube",
                    url: "https://www.youtube.com",
                    icon: "youtube",
                    id: 0,
                },
                {
                    title: "My Instagram",
                    url: "https://www.instagram.com",
                    icon: "instagram",
                    id: 1,
                },
                {
                    title: "My Twitter",
                    url: "https://www.twitter.com",
                    icon: "twitter",
                    id: 2,
                },
            ],
        });

        await batch.commit();
    }
</script>

<div
    class="flex justify-center items-center min-h-[calc(100vh-4.25rem-2.5rem)]"
>
    <div class="card p-4 shadow-2xl flex flex-col items-center gap-4">
        <h1 class="text-2xl font-bold">Sign Up</h1>
        <button class="btn variant-filled" on:click={googleSignup}
            >Sign up with Google</button
        >
        <form on:submit|preventDefault={signUp} class="flex flex-col gap-1">
            <label for="txtEmail">Email</label>
            <input
                class="input input-bordered"
                type="email"
                name="txtEmail"
                id="txtEmail"
                required
                bind:value={formData.email}
            />
            <label for="txtPassword">Password</label>
            <input
                class="input input-bordered"
                type="password"
                name="txtPassword"
                id="txtPassword"
                required
                bind:value={formData.password}
            />
            <label for="txtUsername">Full Name</label>
            <input
                type="text"
                class="input input-bordered"
                name="txtUsername"
                id="txtUsername"
                required
                bind:value={formData.username}
            />
            <input
                class="btn variant-filled-primary mt-4 cursor-pointer"
                type="submit"
                value="Sign up"
            />
        </form>
        <p>Already have an account? <a href="/accounts/login" class="anchor">Log in</a></p>
    </div>
</div>
