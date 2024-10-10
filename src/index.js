// require('dotenv').config({path: './env'});
import dotenv from 'dotenv';
import connectDatabase from "./database/index.js";
import { app } from './app.js';

dotenv.config({ path: './.env' })

connectDatabase()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(process.env.PORT || 8000,()=>{
            console.log(`Server is running at port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("Mongo database connection failed: ", err);

    });


// ; (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     } catch (error) {
//         console.log("ERROR: ", error);
//         throw error;
//     }
// })();