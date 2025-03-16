const User = require('../models/user.model');

const updateUser = async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true },
		);
		if (!updatedUser) {
			return res.status(404).json({
				message: 'User not found',
			});
		}
		res.status(200).json({
			message: 'User has been updated successfully',
			data: updatedUser,
		});
	} catch (error) {
		console.log('updateUser Error', error);
		res.status(500).json({
			message: 'INTERNAL SERVER ERROR',
			error: error,
		});
	}
};

module.exports = { updateUser };
