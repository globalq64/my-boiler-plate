const express = require('express')
const app = express()

//const bodyParser = require('body-parser')
const { User } = require('./models/User')

const mongoose = require('mongoose')
const config = require('./config/key')

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected ...')).catch(err => console.log(err))

// application/json
app.use(express.json())
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) //클라이언트정보를 사용할 수 있도록 중계

app.get('/', (req, res) => res.send('Hello WOrld ... '))
app.post('/register', (req, res) => {
    
    //회원가일 정보를 가져오면, 데이터 베이스에 넣어준다    
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
    
})

const port = 5000
app.listen(port, () => console.log(`Example App listening on port ${port}`))
