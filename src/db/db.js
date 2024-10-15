import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const MONGO_URI='mongodb+srv://maliksabatali:sabat2024@cluster0.vbymnjo.mongodb.net'


const conectDB = async () =>{
    try {
        const conectInt = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`)
        console.log(`Mongodb Conected !! DB Host : ${conectInt.connection.host} `);
    } catch (error) {
        console.log(`During Database Conection Error : ${error.message}`);
        process.exit(1)
    }
}

export default conectDB