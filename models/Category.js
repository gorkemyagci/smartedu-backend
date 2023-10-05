const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
});

CategorySchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    });
    next();
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;