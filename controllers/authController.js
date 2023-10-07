const Course = require('../models/Course');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            data: {
                users
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const same = await bcrypt.compare(password, user.password);
            if (same) {
                req.session.userID = user._id
                res.status(200).json({
                    status: 'success',
                    data: {
                        user
                    }
                });
            } else {
                res.status(400).json({
                    status: 'fail',
                    message: 'Password is incorrect'
                });
            }
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'User not found'
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.logoutUser = (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({
            status: "success"
        })
    } catch (err) {
        res.status(404);
    }
}

exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID });
    const courses = await Course.find({ user: req.session.userID });
    res.status(200).send({
        user,
        courses
    });
}