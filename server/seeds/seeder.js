const setEnv = require('../utils/setEnv');
const connectDB = require('../utils/connectDB');
const categorySeeder = require('./categorySeeder');

setEnv();

const seeder = async () => {
	connectDB();
	console.log('seeding');

	await categorySeeder();

	process.exit();
};

seeder();
