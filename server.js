require('dotenv').config()

const express = require('express')
const cors = require('cors');

const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// Enable CORS for all routes
app.use(cors());
app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const formsRouter = require('./routes/forms')
app.use('/forms', formsRouter)


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});