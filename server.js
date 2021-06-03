const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')

dotenv.config({path:'./config/config.env'})

const transactions = require('./routes/transactions')
connectDB()

const app = express()

//body parser middleware
app.use(express.json())

//app.get('/',(req,res)=>res.send('Hello!'))

app.use('/api/v1/transactions',transactions)

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server runnung in ${process.env.NODE_ENV} mode on port ${PORT}.`.yellow.bold))