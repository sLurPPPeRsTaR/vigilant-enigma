const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const register = async (req, res) => {
	try {
		const hashedPasswword = bcrypt.hashSync(
			req.body.password,
			10,
		);
		const newUser = new User({
			username: req.body.username.toLowerCase(),
			email: req.body.email.toLowerCase(),
			password: hashedPasswword,
		});

		await newUser.save();
		const { password, ...info } = newUser?._doc;
		res.status(200).json({
			message: 'User registration successfully',
			data: info,
		});
	} catch (error) {
		console.log('Error in user registration', error);
		res.status(500).json({
			message: 'INTERNAL SERVER ERROR',
			error: error,
		});
	}
};

const login = async (req, res) => {
	try {
		const userData = await User.findOne({
			email: req.body.email.toLowerCase(),
		});

		if (!userData) {
			return res.status(404).json({
				message: 'Invalid email and password',
			});
		}

		const comparePassword = await bcrypt.compare(
			req.body.password,
			userData.password,
		);

		if (!comparePassword) {
			return res.status(404).json({
				message: 'Invalid email and password',
			});
		}
		const { password, ...info } = userData?._doc;
		const token = jwt.sign(
			{
				userId: userData._id,
				isAdmin: userData.isAdmin,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '5d' },
		);
		res.status(200).json({
			message: 'Login successfully',
			data: { ...info, token },
		});
	} catch (error) {
		res.status(500).json({
			message: 'INTERNAL SERVER ERROR',
			error: error,
		});
	}
};

module.exports = { register, login };
