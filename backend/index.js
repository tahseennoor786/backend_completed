import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";


const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();
app.use(cors());




const PORT = process.env.PORT || 2000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect( MONGOURL)
.then(() => {
    console.log("MongoDB is Connected Successfully!....");
    app.listen(PORT, ()=> {
        console.log(`my server is running on PORT: ${PORT}`)
    });
})
.catch((error) => console.log(error));

app.use("/api", route);


