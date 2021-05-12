import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3001;

let MONGODB_URI = process.env.MONGODB_URI;
if(process.env.NODE_ENV === 'test'){
    MONGODB_URI = process.env.TEST_MONGODB_URI;
}

const JWT_SECRET = process.env.JWT_SECRET;
const saltRound = process.env.saltRound;
const passwordRegex = process.env.passwordRegex;
const usernameRegex = process.env.usernameRegex;
const config = {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    saltRound,
    passwordRegex,
    usernameRegex
};

export default config;

