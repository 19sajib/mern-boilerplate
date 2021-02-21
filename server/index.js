const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const userRoutes = require('./routes/user.js')

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Routes 

app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello from backend')
})

// Setting up server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server is up and running on port: ${PORT}`))

// Connecting to mongoDB
const CONNECTION_URL = process.env.CONNECTION_URL

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if(err) return console.error(err);
    console.log("Connected to MongoDB")
})