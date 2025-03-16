const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).send('Access Denied');
	}

	try {
		const verified = jwt.verify(
			token,
			process.env.JWT_SECRET,
		);
		req.user = verified;
		next();
	} catch (error) {
		console.log('error in verifyToken', error);
		res.status(401).send('Unauthorized');
	}
};

module.exports = verifyToken;
