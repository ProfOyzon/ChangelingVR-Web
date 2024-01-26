export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        // Verify that there was user input for both
        if (!email || !password) {
            return {
                message: "Missing email or password"
            };
        }
        return { message: "Signed Up" };
    }
}