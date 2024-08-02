const User = require('../models/User');
const bcrypt = require('bcrypt');
const { sendCookie } = require('../utils/features');

exports.register = async (req, res) => {
    const {name, email, password, role } = req.body;

    if(!name || !email || !password){
        return res.status(403).json({success: false, message: "All fields are required"})
    }
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({success: true, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        if(role)
            user = await User.create({name, email, password: hashedPassword, role})
        else
            user = await User.create({name, email, password: hashedPassword})

        sendCookie(user, res, "user registered", 201);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({success: false, message: "All fields are required"})
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        sendCookie(user, res, "login successfully", 200);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.logout = async (req, res)=>{
    res.status(200)
    .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV==="Development"? "lax" : "none",
        secure: process.env.NODE_ENV==="Development"? false : true
    })
    .json({success: false, message: "logout successfully"})
}
