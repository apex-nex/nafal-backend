import mongoose from "mongoose"
let DBconnection = async (db_url, db_name) => {
    try {
        mongoose.connect(`${db_url}/${db_name}`).then(() => {
            console.log('db connection')
        })

    } catch (error) {
        console.log(error)
    }
}

export { DBconnection }