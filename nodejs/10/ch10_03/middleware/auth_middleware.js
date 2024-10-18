const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    let token;
    if (req,headers.authorization) {
        token = req.headers.authorization.split(' ')[1] 
        // Authorization: Bearer [ey...] = Bearer eyaSDFSDFD 
        // split(' ') 토큰만 빼고 싶으니까 1번 인덱스에 있는 값 가져오기 
    }

    if (!token) {
        return res.sendStatus(401);
    }

    // 인증된 경우, 
    jwt.verify(token, 'access_secret', (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next(); // 다음 미들웨어로 제어가 넘어감. 다음번 미들웨어가 없으면, 이 미들웨어 장착한 라우터가 실행됨 
    })
};

module.exports = {
    authenticateToken,
};