//import { authenticateUser } from "$lib/server/auth"
import { redirect } from "@sveltejs/kit"
import { validateLogin } from "$lib/security.js";

export const handle = async ({ event, resolve }) => {

	if (event.url.pathname.startsWith("/profile")) {
		if (!validateLogin(event)) redirect(303, `/`);
	}

	const response = await resolve(event);

	return response;
}