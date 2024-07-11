import conectDB from "./db/db.js";
import dotenv from "dotenv"


dotenv.config({
    path: "/.env"
})


conectDB()