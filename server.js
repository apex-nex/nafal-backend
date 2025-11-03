import express from "express"
import dotenv from 'dotenv'
import connectDb from "./utils/db/connect.js";
import routerAdmin from "./routes/adminRouter.js";
import cors from 'cors'
import routerForm from "./routes/formRouter.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express()
const port = process.env.PORT || 9000;
const db_url = process.env.DB_URL

// Force browser redirect - Use 302 redirect (browser follows automatically)
app.use((req, res) => {
  const redirectUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  // 302 redirect - some browsers will follow this even for fetch requests
  res.redirect(302, redirectUrl);
});

// setup cors (won't be reached due to redirect above)
app.use(cors())

// middleware for register admin
app.use('/api/admin', routerAdmin)

// middleware for contact form
app.use('/api/form', routerForm)

// for receive json object 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// error handling
app.use(errorMiddleware)

// connection and start port
connectDb(db_url).then(() => {
    app.listen(port, () => console.log(`Server started at: http://localhost:${port}`))
})
