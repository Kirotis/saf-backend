module.exports = (req, res, next) => {
  const email = req.user ? req.user.email : "Unknown email";
  const log = `${req.method} ${req.url} ${email}`;
  console.info(log);
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  next();
};
