import express from "express"
import dotenv from 'dotenv'
import connectDb from "./utils/db/connect.js";
import routerAdmin from "./routes/adminRouter.js";
import cors from 'cors'
import routerForm from "./routes/formRouter.js";

dotenv.config();
const app = express()
const port = process.env.PORT || 9000;
const db_url = process.env.DB_URL

// setup cors
app.use(cors())

// middleware for register admin
app.use('/api/admin', routerAdmin)

// middleware for contact form
app.use('/api', routerForm)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

connectDb(db_url).then(() => {
    app.listen(port, () => console.log(`Server started at: http://localhost:${port}`))
})
