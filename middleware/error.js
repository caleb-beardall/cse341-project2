module.exports = function (err, req, res, next) {
    console.error(err);
    res.status(500).send('500 Internal Server Error Occurred');
}