import {genSecureHash, checkPass} from "$lib/security.js";

export async function load() {
    // let password = "bacon";
    // console.log("Password: " + password);
    // let pepperedPassword = giveRandPepper(password);
    // console.log("Peppered Pass: " + pepperedPassword);
    // let hashedPeppPass = await hash(pepperedPassword, 10);
    // console.log(hashedPeppPass);
    // console.log("Same Pass? " + await compare(pepperedPassword, hashedPeppPass));

    // let checkArray = genAllPepper().map((pepper) => `${password}${pepper}`);
    // let comparedCheckArray = await Promise.all(checkArray.map(async(pass) => await compare(pass, hashedPeppPass)));
    // console.log(comparedCheckArray)
    


    let password = "bacon";
    let hashedPass = await genSecureHash(password);
    console.log(hashedPass);

    let checkedPeppHashes = (await checkPass("bacon", hashedPass));
    console.log(checkedPeppHashes);

    // let password = "bacon";
    // let hashedPass = await hash(password, 10);
    // console.log(hashedPass)
    // console.log(await compare(password, hashedPass));
}