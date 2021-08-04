const { User } = require("../models/User");

let auth = (req, res, next) => {
    //인증처리 하는 곳

    //클라이언트 쿠키에서 토큰을 가져온다(쿠키파서 활용)
    let token = req.cookies.x_auth;

    //토큰을 복호화해서 유저(_id)를 찾는다
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });

        //유저 확인하면 인증 OK
        req.token = token;
        req.user = user;
        next();
    });
};

module.exports = { auth };
