const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthenticated = async(req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);
        if(!user)
            return res.status(401).json({message: "User not found"})
        console.log("Decoded is ", user);

        if(user.role !== 'admin')
            return res.status(403).json({message: "Unauthorized: User is not an admin"})

        // req.user = await User.findById(decoded._id);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
