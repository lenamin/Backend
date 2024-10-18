const bcrypt = require('bcryptjs');
const userService = require("../services/userService");

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