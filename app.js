import express from "express"
import dotenv from 'dotenv'
import { loginRouter } from "./routes/loginRoutes.js";
import { DBconnection } from "./Database/dbConnection.js";

dotenv.config();
const app = express()
const port = process.env.PORT || 9000;
const db_url = process.env.DB_URL || "mongodb+srv://aranas0876:ymMl9Tss3PDCXLeq@cluster0.ur0okts.mongodb.net";
const db_name = process.env.DB_NAME || "nafal";


DBconnection(db_url,db_name)


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/admin', loginRouter)




app.listen(port, () => console.log(`Example app listening on port ${port}!`))