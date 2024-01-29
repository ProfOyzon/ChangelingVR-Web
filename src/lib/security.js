import {hash, compare} from "bcrypt";

// Generates a random character (0-9, A-Z, a-z)
const genPepper = () => (getRandomInt(62) <= 9 ? getRandomInt(10) : getRandomInt(2) == 0 ? String.fromCharCode(getRandomInt(26) + 65) : String.fromCharCode(getRandomInt(26) + 97));

// Places a random pepper at the end of a password
const giveRandPepper = (pass) => (`${pass}${genPepper()}`);

/**
 * Generates a hash for a given password
 *
 * @param {string} pass Password to Pepper and Salt Hash
 * @return {string} The hashed password
 */
export const genSecureHash = async(pass) => (await hash(giveRandPepper(pass), 10));

// Generates all characters (0-9, A-Z, a-z)
const genAllPepper = () => ([...Array(10).keys()].concat([...Array(26).keys()].map((x) => String.fromCharCode(x + 65))).concat([...Array(26).keys()].map((x) => String.fromCharCode(x + 97))));

const getRandomInt = (max) => (Math.floor(Math.random() * max));

const arrOfPassCheck = async(pass, hashedPass) => (Promise.all(genAllPepper().map((pepper) => `${pass}${pepper}`).map(async(pepperedPassword) => await compare(pepperedPassword, hashedPass))));

/**
 * Determines whether or not the password is correct
 *
 * @param {string} pass Password to check
 * @param {string} hashedPass Hashed Password
 */
export const checkPass = async(pass, hashedPass) => ((await arrOfPassCheck(pass, hashedPass)).includes(true));