import express from "express"
import dotenv from 'dotenv'
import { loginRouter } from "./routes/loginRoutes.js";
import  {DBconnection}  from "./Database/dbConnection.js";
DBconnection()

dotenv.config();
const app = express()
const port = process.env.PORT || 9000;


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/admin', loginRouter)




app.listen(port, () => console.log(`Example app listening on port ${port}!`))