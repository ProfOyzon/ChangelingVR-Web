//import { authenticateUser } from "$lib/server/auth"
import { redirect } from "@sveltejs/kit"
import { verifyJWT } from "$lib/security.js";

export const handle = async ({ event, resolve }) => {

	if (event.url.pathname.startsWith("/profile")) {
		const { headers } = event.request;
		const cookie = headers.get("cookie") ?? undefined;

		let token;
		if (cookie){
			token = cookie.substring(cookie.indexOf("%20") + 3);
		}
		else{
			redirect(303, "/");
		}
		
		let jwtUser;
		try {
			jwtUser = verifyJWT(token);
		}
		catch (error){
			throw redirect(303, "/");
		}

		if (jwtUser.exp < (Date.now() / 1000)){
			redirect(303, "/")
		}

		if (!jwtUser.id || event.url.pathname.substring(event.url.pathname.indexOf("profile/") + 8) != jwtUser.id){
			redirect(303, `/`)
		}
	}

	const response = await resolve(event);

	return response;
}