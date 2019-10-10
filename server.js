const express = require('express')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(express.json({ extended: false }))

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/events', require('./routes/api/events'))

const PORT = 5000

app.listen(PORT, () => console.log(`express server started on ${PORT}!`))
module.exports = app
