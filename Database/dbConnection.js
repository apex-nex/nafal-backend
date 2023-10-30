import mongoose from "mongoose"
let DBconnection = async () => {
    try {
         mongoose.connect(`mongodb+srv://mdadnanmdyaseen:Zm2wven8WA8pGZkL@cluster0.mru3jac.mongodb.net/nanded`).then(()=>{
            console.log('db connection')
        })
        
    } catch (error) {
        console.log(error)
    }
}

export  {DBconnection}