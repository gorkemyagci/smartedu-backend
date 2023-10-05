exports.getHomePage = (req, res) => {
    res.status(200).json({
        status: 200,
        data: req.session.userID ?? false
    })
};

exports.getAboutPage = (req, res) => {
    res.status(200).send('About Us');
}