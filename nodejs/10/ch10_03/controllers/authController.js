const bcrypt = require('bcryptjs');
const userService = require("../services/userService");

const { createUser } = require("../dao/userDao");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

// 회원가입 
const register = async (req, res) => {
    const { email, name, password } = req.body;
    //password: admin1234 식으로 평문으로 받으면 이를 암호화 해준다. 
    const hashedPassword = await bcrypt.hash(password, 10);
    // 암호화할 문자열 / sort의 길이 (사람들이 유추할 수 없게 sort를 넣는것 / sort 의 길이가 10자리인 문자를 임의로 만들어서 삽입한는 것)

    try {
        const user = await userService.createUser({
            email: email,
            name: name,
            password: hashedPassword,
        });
        res.status(201).json({ data: user });
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
};

// 로그인 
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.findUserByEmail(email);
        if (!user) { // user 없는 경우, 
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // 에러 던져주기만 하고, 매번 요청할 때 마다 클라이언트에서 인증정보 요청 
        const accessToken = generateAccessToken(user);
        const refreshToken = refreshToken(user);

        res.json({
            accessToken,
            refreshToken,
        });
    } catch (e) {
        res.status(500).json({ error: e.mesage });
    }
}

module.exports = {
    register,
};