const { default: mongoose } = require('mongoose');
const mognoose = require('mongoose');
const slugify = require('slugify');

const Schema = mognoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: Date.now()
    },
    slug: {
        type: String,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

CourseSchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    });
    next();
})

const Course = mognoose.model('Course', CourseSchema);
module.exports = Course;