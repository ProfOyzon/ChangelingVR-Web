import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { writable, type Readable, derived } from "svelte/store";

const firebaseConfig = {
    apiKey: "AIzaSyDmu7Nyn2QwPm0-z2W8p3uSWZyU4bAA1wU",
    authDomain: "changelingvr-web.firebaseapp.com",
    projectId: "changelingvr-web",
    storageBucket: "changelingvr-web.appspot.com",
    messagingSenderId: "296491725010",
    appId: "1:296491725010:web:0312e0677ac3514f1efd0b",
    measurementId: "G-QTK10Z84J1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

const userStore = () => {
    let unsubscribe: () => void;

    if (!auth || !globalThis.window) {
        console.warn("Auth is not initialized or not in browser.");
        const { subscribe } = writable<User | null>(null);
        return {
            subscribe,
        };
    }

    const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
        unsubscribe = onAuthStateChanged(auth, (user) => {
            set(user);
        });

        return () => unsubscribe();
    });

    return {
        subscribe,
    };
};

export const user = userStore();

export const docStore = <T>(path: string) => {
    let unsubscribe: () => void;

    const docRef = doc(db, path);

    const { subscribe } = writable<T | null>(null, (set) => {
        unsubscribe = onSnapshot(docRef, (snapshot) => {
            set((snapshot.data() as T) ?? null);
        });

        return () => unsubscribe();
    });

    return {
        subscribe,
        ref: docRef,
        id: docRef.id,
    };
};

interface UserData {
    username: string;
    bio: string;
    tags: { text: string; id: number }[];
    photoURL: string;
    links: any[];
}

export const userData: Readable<UserData | null> = derived(
    user,
    ($user, set) => {
        if ($user) {
            return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
        } else {
            set(null);
        }
    }
);
