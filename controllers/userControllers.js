const User = require("./../models/user")

exports.getUserList = async (req, res) => {
    const users = await User.find();
    return res.status(200).json({
        status: "ok",
        data: users,
    });
}

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            status: "fail",
            message: "Missing info"
        })
    }
    const newUser = await User.create({
        name: name,
        email: email,
        password: password
    })
    res.status(200).json({
        status: "ok",
        data: newUser,
    })
}



exports.logInWithFacebook = async (request, response) => {
    try {
        const { fbToken } = request.body;
        if (!fbToken) throw new Error("Token is missing")
        const data = await axios.get(
            `https://graph.facebook.com/v7.0/me?fields=id%2Cname%2Cemail&access_token=${fbToken}`
        );
        const info = data.data;
        const words = info.name.split(" ");
        let user = await User.findOne({ email: info.email });
        if (!user) user = await User.create({
            email: info.email,
            firstName: words.pop(),
            lastName: words.join(" ")
        });
        const token = await generateToken(user);
        response.status(200).json({
            status: "Success",
            data: { user, token }
        });
    } catch (error) {
        console.log(error);
    };
};