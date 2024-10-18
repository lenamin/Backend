const jwt = require('jsonwebtoken');

// 사용자 인증을 위한 용도 
const generateAccessToken = (user) => {
    return jwt.sign(
        {
        // 이 메서드 호출을 통해 json web token을 만들어준다 
            id: user.id,
            email: user.email, 
        }, 'access_secret', 
            { expiresIn: '15m' } 
        );
};

// accessToken 발급받기 위한 용도 
const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
          email: user.email,
        },
        "refresh_secret",
        { expiresIn: "14d" }
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
}