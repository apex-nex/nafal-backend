import mongoose from "mongoose"

const connectDB = (db_url) => {
    mongoose.connect(db_url)

    const db = mongoose.connection

    db.on('open', () => {
        console.log(`Database Connected!`)
    })
}

export default connectDB