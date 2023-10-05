const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (err) {
        console.log(err);
    }
}

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            success: true,
            data: category
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getCategory = async (req, res) => {
    try {
        let filter = {};
        const categorySlug = req.params.slug;
        const category = await Category.findOne({ slug: categorySlug });
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (err) {
        console.log(err);
    }
};