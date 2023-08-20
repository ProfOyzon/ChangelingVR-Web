import { db } from '$lib/firebase';
import { teamData } from '$lib/teamData';
import type { PageLoad } from './$types';
import { collection, getDocs, query } from "firebase/firestore";

export const load = (async () => {
    const collectionRef = collection(db, "users");

    const q = query(collectionRef);
    const snapshot = await getDocs(q);
    // const exists = snapshot.docs[0]?.exists();
    
    let data = [];
    for (let doc of snapshot.docs) {
        data.push(doc.data());
    }

    teamData.set(data);
}) satisfies PageLoad;