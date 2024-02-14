import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from "$env/static/private";

/** 
 * Generates a random character (0-9, A-Z, a-z)
 * 
 * @returns {char} A random pepper
 */
const genPepper = () => (getRandomInt(62) <= 9 ? getRandomInt(10) : getRandomInt(2) == 0 ? String.fromCharCode(getRandomInt(26) + 65) : String.fromCharCode(getRandomInt(26) + 97));

/** 
 * Peppers a given password with a random pepper
 * 
 * @param {string} pass Password to pepper
 * @returns {string} Places a random pepper at the end of a password
 */
const giveRandPepper = (pass) => (`${pass}${genPepper()}`);

/** 
 * Generates a hash for a given password
 *
 * @param {string} pass Password to Pepper and Salt Hash
 * @returns {string} The hashed password
 */
export const genSecureHash = async(pass) => (await hash(giveRandPepper(pass), 10));

/** 
 * An array of all possible pepper values
 * 
 * @returns {Array<char>} All pepper values
 */
const genAllPepper = () => ([...Array(10).keys()].concat([...Array(26).keys()].map((x) => String.fromCharCode(x + 65))).concat([...Array(26).keys()].map((x) => String.fromCharCode(x + 97))));

/** 
 * Returns a random integer between 0 and max - 1
 * 
 * @param {number} max Maximum value
 * @returns {number} A random integer between 0 and max - 1
 */
const getRandomInt = (max) => (Math.floor(Math.random() * max));

/** 
 * Gives checks of all peppered varieties of the password
 * 
 * @param {string} pass Password to check
 * @param {string} hashedPass Hash to compare against
 * @returns {Promise<Array<Boolean>>} Array of Booleans comparing peppered passwords
 */
const arrOfPassCheck = async(pass, hashedPass) => (Promise.all(genAllPepper().map((pepper) => `${pass}${pepper}`).map(async(pepperedPassword) => await compare(pepperedPassword, hashedPass))));

/** 
 * Determines whether or not the password is correct
 *
 * @param {string} pass Password to check
 * @param {string} hashedPass Hashed Password
 * @returns {Promise<Boolean>} Whether or not the password matches the stored password
 */
export const checkPass = async(pass, hashedPass) => ((await arrOfPassCheck(pass, hashedPass)).includes(true));

/**
 * Creates a SessionUser based on id and email
 * 
 * @param {number} id ID of user in database
 * @param {string} email Email of user in database
 * @returns {SessionUser} Object holding ID and Email
 */
export const sessionUser = (id,email) => ({id, email});

/**
 * Generates a JWT Token based on id, email, and access secret
 * 
 * @param {number} id Id of user in database
 * @param {string} email Email of user in Database
 * @param {string} expirationTime Time until expired, default is '1d'
 * @returns Generated JWT Token
 */
export const jwtToken = (id, email, expirationTime = '1d') => (jwt.sign(sessionUser(id,email), JWT_ACCESS_SECRET, { expiresIn: expirationTime }));

/**
 * If JWT is true
 * 
 * @param {string} token JWT
 * @returns {boolean} If JWT is true
 */
export const verifyJWT = (token) => (jwt.verify(token, JWT_ACCESS_SECRET));