const jwt = require('jsonwebtoken');
const auth = require('./auth');
require('dotenv').config()
const checkAuth = (req, res, next) => {
	var token = req.headers['auth'];
	if (!token)
		return res.status(403).send({ response_status: "fail", error: 'no token provided' });

	jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
		if (err) {
			if (err.name == "TokenExpiredError") {
				var email = req.headers['email'];
				console.log(email)
				var token_arr = auth.jswToken(email);
				auth.storeRefreshToken(email, token_arr[1]);
				next()
			}
			else {
				return res.status(403).send({ response_status: "fail", error: 'failed to authenticate token' });
			}
		}
		else {
			next();
		}
	});
}
module.exports = {
	checkAuth
}