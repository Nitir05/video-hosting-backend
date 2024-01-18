import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./env",
});
connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.error(`Express server error: ${err}`);
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("mongo DB Connection Failed !!!", err);
    });
