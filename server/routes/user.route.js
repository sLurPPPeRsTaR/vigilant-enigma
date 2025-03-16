const {
	updateUser,
} = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifyToken');

const router = require('express').Router();

router.get('/get-users', (req, res) => {
	res.send('===> user has been gotten');
});

router.put('/update/:id', verifyToken, updateUser);
module.exports = router;
