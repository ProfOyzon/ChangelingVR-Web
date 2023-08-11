import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load = (async () => {
    const collectionRef = collection(db, "users");

    const q = query(collectionRef);
    const snapshot = await getDocs(q);
    const exists = snapshot.docs[0]?.exists();

    let data = [];
    for (let doc of snapshot.docs) {
        data.push(doc.data());
    }

    // if (!exists) {
    //     throw error(404, "No users found");
    // }

    return {
        users: data,
    };
}) satisfies PageLoad;
