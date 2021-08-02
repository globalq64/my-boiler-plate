const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected ...')).catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello WOrld ... '))
app.listen(port, () => console.log(`Example App listening on port ${port}`))
