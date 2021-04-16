
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))  // to accept form data
app.use(express.json())  // to accept json data

app.get('/', (req, res) => {
    res.send('Server is running')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})
    
