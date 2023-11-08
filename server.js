import express from "express"
import dotenv from 'dotenv'
import routerLogin from "./routes/loginRouter.js"
import connectDB from "./db/connect.js";

dotenv.config();
const app = express()
const port = process.env.PORT || 9000;
const db_url = process.env.DB_URL


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/admin', routerLogin)

connectDB(db_url)

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))