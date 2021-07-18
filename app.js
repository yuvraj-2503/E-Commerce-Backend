require('dotenv').config({ path: './config.env' })
const mongoose= require('mongoose')
const express= require('express')
const session= require('express-session')
const bodyParser= require('body-parser')
const cors= require('cors')
const cookieParser= require('cookie-parser')
const app= express()

// My Routes
const authRoutes= require('./routes/auth')

// PORTS
const port= process.env.PORT || 5000
// DB
const db= process.env.DATABASE || 'mongodb://localhost:27017/e-commerce'

// DB CONNECTION
mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log(`Database Connected!!`)
})

// MIDDLEWARE
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(
    session({
        secret: "mern is fun",
        cookie: {},
        resave: false,
        saveUninitialized: false
    })
)

// ROUTES
app.get('/', (req,res) => {
    res.send('Hello, World!')
})

app.use('/api', authRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

