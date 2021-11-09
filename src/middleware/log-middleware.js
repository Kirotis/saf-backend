module.exports = (req, res, next) => {
    const email = req.user ? req.user.email : 'Unknown email';
    const log = `${req.method} ${req.url} ${email}`;
    console.info(log);
    next();
}