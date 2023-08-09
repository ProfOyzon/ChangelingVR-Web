import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import pkg from "firebase-admin";

import {
    FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY,
} from "$env/static/private";

try {
    pkg.initializeApp({
        credential: pkg.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID ?? FIREBASE_PROJECT_ID,
            clientEmail:
                process.env.FIREBASE_CLIENT_EMAIL ?? FIREBASE_CLIENT_EMAIL,
            privateKey:
                process.env.FIREBASE_PRIVATE_KEY ?? FIREBASE_PRIVATE_KEY,
        }),
    });
} catch (err: any) {
    if (!/already exists/u.test(err.message)) {
        console.error("Firebase Admin Error:", err.stack);
    }
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
