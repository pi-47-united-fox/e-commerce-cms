"use strict";

const jwt = require("jsonwebtoken");

const createToken = (obj) => {
	return jwt.sign(obj, process.env.JWT_SECRET);
};

const decodeToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
	createToken,
	decodeToken,
};
