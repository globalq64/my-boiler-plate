const express = require("express");
const app = express();

//const bodyParser = require('body-parser')
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

const mongoose = require("mongoose");
const config = require("./config/key");

const cookieParser = require("cookie-parser");

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected ..."))
    .catch((err) => console.log(err));

// application/json
app.use(express.json());
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); //클라이언트정보를 사용할 수 있도록 중계
app.use(cookieParser());

/*
 */
app.get("/", (req, res) => res.send("Hello WOrld ... "));

app.post("/api/users/register", (req, res) => {
    //회원가일 정보를 가져오면, 데이터 베이스에 넣어준다
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

app.post("/api/users/login", (req, res) => {
    //요청된 이메일을 db에서 찾는다
    User.findOne({ email: req.body.email }, (err, user) => {
        console.log("1111111111111")

        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "해당 이메일이 없습니다.",
            });
        }

        //찾은 이메일 비번이 동일한지 확인한다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "틀린 비밀번호...",
                });

            //비번 맞으면, 토큰을 생성한다. (user안에 토큰이 저장되어 있다.)
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                //토큰을 저장한다.(그중 쿠키로 한다.=> cookie-parser설치)
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

//auth통과완료되면 authentication=true의미. req에는 token, user정보가 포함된다.
app.get("api/users/auth", auth, (req, res) => {
    console.log("////////++++++++")

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        image: req.user.image,
    });
});

app.get("/api/users/logout", auth, (req, res) => {
    console.log("////////")
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({ success: true });
    });
});

const port = 5000;
app.listen(port, () => console.log(`Example App listening on port ${port}`));
