const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userID);
        if (!user) {
            return res.status(400).json({ status: 'redirect to login' });
        }
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};