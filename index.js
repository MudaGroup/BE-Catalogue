import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js"
import slideImageRoutes from "./routes/slideImageRoutes.js"
import CatalogRoute from "./routes/CatalogRoute.js"
import UserRoute from "./routes/UserRoute.js";

// Load environment variables
dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(ProductRoute);
app.use(slideImageRoutes);
app.use(CatalogRoute);
app.use(UserRoute);



app.listen(5000, ()=> console.log('Server up and running...'));