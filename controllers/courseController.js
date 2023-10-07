const Category = require('../models/Category');
const Course = require('../models/Course');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userID
        });
        res.status(201).json({
            status: 'success',
            data: {
                course
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.getAllCourses = async (req, res) => {
    try {
        let filter = {};
        const categorySlug = req.query.categories;
        const query = req.query.search;

        if (query) {
            filter.name = { $regex: query, $options: 'i' };
        }
        if (categorySlug) {
            filter.category = categorySlug;
        }

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const courses = await Course.find(filter)
            .skip(skip)
            .limit(limit);

        const total = await Course.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            status: 'success',
            data: {
                courses,
                total,
                page,
                totalPages
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}


exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug }).populate('user');
        res.status(200).json({
            status: 'success',
            data: {
                course,
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.userID });
        if (user.courses.includes(req.body.courseID)) {
            return res.status(400).json({
                status: 'fail',
                msg: 'You have already enrolled in this course'
            });
        } else {
            await user.courses.push({
                _id: req.body.courseID
            });
            await user.save();
            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.releaseCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.pull({ _id: req.body.courseID });
        await user.save();
        res.status(200).json({
            status: 'success',
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ slug: req.params.slug });
        const usersToPull = await User.find({ courses: course._id });
        usersToPull.forEach(async user => {
            await user.courses.pull({ _id: course._id });
            await user.save();
        });
        res.status(200).json({
            status: 'success',
            data: {
                course
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
        res.status(200).json({
            status: 'success',
            data: {
                course
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: err.message
        });
    }
}