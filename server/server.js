const express = require('express');
const dbConnect = require('./dbConnect/dbConnection');
const app = express();
const routes = require('./routes/routes');

app.use(express.json());

app.use('/', routes);

app.listen(process.env.PORT || 800, () => {
	console.log(
		`===> Server is running on port ${
			process.env.PORT || 800
		}`,
	);
	dbConnect();
});
