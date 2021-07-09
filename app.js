require('dotenv').config()
const mongoose= require('mongoose')
const express= require('express')
const bodyParser= require('body-parser')
const cors= require('cors')
const cookieParser= require('cookie-parser')
const app= express()

// PORTS
const port= process.env.PORT || 5000

// MIDDLEWARE
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// ROUTES
app.get('/', (req,res) => {
    res.send('Hello, World!')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

