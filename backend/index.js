require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')

const app = express()

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lezfy.mongodb.net/phuc-learn?retryWrites=true&w=majority`,
            {
                // useCreateIndex : true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useFindAndModify : false,
            })
        console.log('Mongo connected')
    } catch (error) {
        console.log('error', error)
        process.exit(1)
    }
}       

connectDB()

// app.get('/', (req, res) => res.send('Hello world'))
app.use('/api/auth', authRouter)

const PORT = 5000

app.listen(PORT, () => console.log('server start')) 