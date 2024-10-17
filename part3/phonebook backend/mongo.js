import mongoose from "mongoose";

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://yashh:${password}@cluster0.f03h7.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

const connectionObj = await mongoose.connect(url)
console.log(`Connected to phonebook collection ${connectionObj.connection.host}`)

const personSchema = mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

// fetch all contacts
if (process.argv.length === 3) {
    const allPeople = await Person.find({})
    allPeople.forEach(c => console.log(c))
    mongoose.connection.close()
}

// add new contact
if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    await person.save()
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
}

