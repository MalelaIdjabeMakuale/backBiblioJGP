const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const createUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const saltRounds = 10;
        user.password = await bcrypt.hash(req.body.password, saltRounds);

        if (await User.findOne({ email: req.body.email })) {
            return res.status(409).json({
                status: 409,
                message: HTTPSTATUSCODE[409],
                data: null
            });
        }

        const userDb = await user.save();
        
        return res.status(201).json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: null
        });
    } catch (error) {
        next(error);
    }
};

const authenticate = async (req, res, next) => {
    try {
        const userInfo = await User.findOne({ email: req.body.email }); 
        if (userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {
            userInfo.password = null;
            const token = jwt.sign(
                {
                    id: userInfo._id,
                    email: userInfo.email,
                },
                req.app.get("secretKey"),
                { expiresIn: "1d" }
            );
            return res.json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                data: { user: userInfo, token: token },
            });
        } else {
            return res.json({
                status: 400,
                message: HTTPSTATUSCODE[400],
                data: null,
            });
        }
    } catch (error) {
        return next(error);
    }
};

const logout = (req, res, next) => {
    try {
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            token: null,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    createUser,
    authenticate,
    logout
};
