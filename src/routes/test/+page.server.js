import {genSecureHash, checkPass} from "$lib/security.js";

export async function load() {
    let password = "bacon";
    let hashedPass = await genSecureHash(password);
    console.log(hashedPass);

    let passwordCheck = (await checkPass("bacon", hashedPass));
    console.log(passwordCheck);
}