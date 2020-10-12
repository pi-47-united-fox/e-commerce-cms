"use strict";

const bcrypt = require("bcrypt");

const encryptPassword = (password) => {
	const saltRound = 8;
	const salt = bcrypt.genSaltSync(saltRound);
	return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};

module.exports = {
	encryptPassword,
	comparePassword,
};
