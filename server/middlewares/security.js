"use strict";

const { decodeToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = (req, res, next) => {
	const { access_token } = req.headers;
	if (access_token) {
		req.userData = decodeToken(access_token);
		User.findByPk(req.userData.id)
			.then((result) => {
				if (!result) {
					res.status(401).json({ message: "Failed to Authenticate" });
				} else {
					next();
				}
			})
			.catch((err) => {
				res.status(500).json({ message: err.message });
			});
	} else {
		res.status(401).json({ message: "Failed to Authenticate" });
	}
};

const authorization = (req, res, next) => {
	User.findByPk(req.userData.id)
		.then((result) => {
			if (result.is_admin) {
				next();
			} else {
				res.status(401).json({ message: "Failed to Authenticate, Not an Admin" });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
};

module.exports = {
	authentication,
	authorization,
};
