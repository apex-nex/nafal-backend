import express from "express"
import dotenv from 'dotenv'
import connectDb from "./utils/db/connect.js";
import routerAdmin from "./routes/adminRouter.js";
import cors from 'cors'
import http from 'http'
import routerForm from "./routes/formRouter.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express()
const server = http.createServer(app);
const port = process.env.PORT || 9000;
const db_url = process.env.DB_URL

// setup cors
app.use(cors())

// middleware for register admin
app.use('/api/admin', routerAdmin)

// middleware for contact form
app.use('/api', routerForm)

// for receive object 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// error handling
app.use(errorMiddleware)

// to active server
app.get('/ping', (req, res) => {
    res.status(200).send('All Is Well.');
    console.log("All Is Well.")
});

// Periodically ping the server every 10 minutes
const pingInterval = 10 * 60 * 1000; // 10 minutes in milliseconds

setInterval(() => {
    http.get(`http://nafal.onrender.com/:${port}/ping`, (res) => {
        console.log('All Is Well.', res.statusCode);
    });
}, pingInterval);

// connection and start port
connectDb(db_url).then(() => {
    app.listen(port, () => console.log(`Server started at: http://localhost:${port}`))
})
