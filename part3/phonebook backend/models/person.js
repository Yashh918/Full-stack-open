import mongoose from "mongoose";
import { config } from 'dotenv';
config()

const url = process.env.MONGODB_URI

try {
    const connectionInstance = await mongoose.connect(url)
    console.log(`connected to phonebook, ${connectionInstance.connection.host}`)
} catch (error) {
    console.log(`error connected to db, ${error}`)
}

const personSchema = mongoose.Schema({
    name:{
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: num => /^\+?\d{2,3}[-\s]?\d{6,15}$/.test(num),
            message: props => `${props.value} is not a valid phone number` 
        },
        required: true
    }
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

export default Person