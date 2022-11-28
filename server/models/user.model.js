const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { sign } = require('../utils/jwt.utils');

/**
 * @typedef User
 * @property {string} _id
 * @property {string} email
 * @property {string} password
 * @property {string} name
 * @property {string} profileImage
 * @property {string} bio
 * @property {string} company
 * @property {string} companyLicense
 * @property {string} website
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const Schema = mongoose.Schema;
const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	profileImage: {
		type: String,
	},
	bio: {
		type: String,
	},
	company: {
		type: String,
	},
	companyLicense: {
		type: String,
	},
	website: {
		type: String,
	},
	is18Plus: {
		type: Boolean,
		default: false,
	},
});

// password hashing middleware
UserSchema.pre('save', async function (next) {
	const user = this;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// const saltRounds = config.get<number>('saltRounds');
	const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(user.password, salt);

	user.password = hash;

	next();
});

// compare password method
UserSchema.methods.comparePassword = function (candidatePassword) {
	const user = this;

	return bcrypt.compareSync(candidatePassword, user.password);
};

// generate token method
UserSchema.methods.generateToken = function () {
	const user = this;
	const token = sign({
		_id: user._id,
		email: user.email,
	});
	console.log(token);
	return token;
};

// get user without password and profileImage with base url
UserSchema.methods.toJSON = function () {
	const user = this;

	const userObject = user.toObject();

	delete userObject.password;

	if (userObject.profileImage) {
		userObject.profileImage = process.env.BASE_URL + user.profileImage;
	}

	return userObject;
};

// create model class
const User = mongoose.model('User', UserSchema);
module.exports = User;
