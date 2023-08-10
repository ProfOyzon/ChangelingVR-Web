import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals, params }) => {
    const uid = locals.userID;

    if (!uid) {
        throw redirect(301, "/team");
    }
}) satisfies LayoutServerLoad;
