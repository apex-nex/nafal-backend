import mongoose from "mongoose"
let DBconnection = async () => {
    try {
         mongoose.connect(`mongodb+srv://aranas0876:ymMl9Tss3PDCXLeq@cluster0.ur0okts.mongodb.net/?retryWrites=true&w=majority/nafal`).then(()=>{
            console.log('db connection')
        })
        
    } catch (error) {
        console.log(error)
    }
}

export  {DBconnection}