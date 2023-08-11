import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    type UserCredential,
} from "firebase/auth";
import { auth } from "./firebase";

const setAuthCookie = async (credential: UserCredential) => {
    const idToken = await credential.user.getIdToken();

    const res = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // NO CSRF TOKEN NEEDED, SVELTE DOES THIS FOR YOU.
        },
        body: JSON.stringify({ idToken }),
    });
};

export const logInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);

    await setAuthCookie(credential);
};

export const signUpWithGoogle = async () => {
    // Google auth popups don't differentiate between creating a new account and
    // signing into an existing one. Thus, this method exists to clarify purpose
    // while minimizing duplicated code.
    await logInWithGoogle();
};

export const logInWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);

    await setAuthCookie(credential);
};

export const signUpWithEmailAndPassword = async (
    email: string,
    password: string,
    username: string
) => {
    const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await updateProfile(credential.user, { displayName: username });

    await setAuthCookie(credential);
};

export const logOut = async () => {
    const res = await fetch("/api/login", { method: "DELETE" });
    await signOut(auth);
};
