// require('dotenv').config({path: './env'});
import dotenv from 'dotenv';
import connectDatabase from "./database/index.js";

dotenv.config({ path: './env' })

connectDatabase();


// ; (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     } catch (error) {
//         console.log("ERROR: ", error);
//         throw error;
//     }
// })();