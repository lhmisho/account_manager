
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const chalk = require('chalk')
const mongoose = require('mongoose')
const authRouters = require('./routes/authRoutes')
const app = express()


app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({extended:true}))  // to accept form data
app.use(express.json())  // to accept json data

app.use('/api/users', authRouters)

app.get('/', (req, res) => {
    res.send('Server is running')
})

const DB_URI = 'mongodb://localhost:27017/account_manager'
const PORT = process.env.PORT || 4000
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(chalk.green("DB connected"))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server running on ${PORT}`))
        })        
    })
    .catch(e => console.log(e))
