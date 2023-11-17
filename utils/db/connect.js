import mongoose from "mongoose"

const connectDb = async (db_url) => {
    try {
        await mongoose.connect(db_url)
        console.log(`Database Connected!`)
    } catch (error) {
        console.error("Database connection failed")
        process.exit(0)
    }
}

export default connectDb