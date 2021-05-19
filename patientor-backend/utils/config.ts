import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3001;

let GET_MONGODB_URI = process.env.MONGODB_URI;
if(process.env.NODE_ENV === 'test'){
    GET_MONGODB_URI = process.env.TEST_MONGODB_URI;
}else if(process.env.NODE_ENV === 'dev'){
    GET_MONGODB_URI = process.env.DEV_MONGODB_URI;
}
const MONGODB_URI:string = GET_MONGODB_URI? GET_MONGODB_URI : '';

const JWT_SECRET = process.env.JWT_SECRET;
const saltRound = parseInt(process.env.saltRound);
const passwordRegex = new RegExp(process.env.passwordRegex);// should  be /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
const usernameRegex =  new RegExp(process.env.usernameRegex);// should be /^[a-zA-Z0-9]{3,}[a-zA-Z0-9]*/

const config = {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    saltRound,
    passwordRegex,
    usernameRegex,
};

export default config;

