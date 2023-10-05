const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
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
        const categorySlug = req.query.categories;
        const category = await Category.findOne({ slug: categorySlug });
        let filter = {};
        if (categorySlug) {
            filter = { category: category._id };
        }
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const courses = await Course.find(filter).skip(skip).limit(limit);
        const total = await Course.countDocuments();
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
        const course = await Course.findOne({ slug: req.params.slug });
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