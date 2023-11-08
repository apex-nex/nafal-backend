import express from "express"
import dotenv from 'dotenv'
import routerLogin from "./routes/loginRouter.js"
import connectDB from "./db/connect.js";
import routerRegister from "./routes/registerRouter.js";
import cors from 'cors'

dotenv.config();
const app = express()
const port = process.env.PORT || 9000;
const db_url = process.env.DB_URL

// setup cors
app.use(cors())

// middleware for register admin
app.use('/admin', routerRegister)

// middleware for login admin
app.use('/admin', routerLogin)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

connectDB(db_url)

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))