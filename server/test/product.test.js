const request = require("supertest");
const app = require("../app");

describe("Testing Create Product", () => {
	test("Create Product Success", (done) => {
		const productData = {
			name: "Thinkpad t14",
			price: 18500000,
			stock: 5,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14.svg",
			CategoryId: 2,
		};

		request(app)
			.post("/products")
			.send(productData)
			.set("Accept", "application/json")
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(201);
				expect(body).toHaveProperty("id", expect.any(Number));
				expect(body).toHaveProperty("name", productData.name);
				done();
			});
	});

	//! NO ACCESS TOKEN
	test("Create Product Failed, No access token", (done) => {
		const productData = {
			name: "Thinkpad t14",
			price: 18500000,
			stock: 5,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14.svg",
			CategoryId: 2,
		};

		request(app)
			.post("/products")
			.send(productData)
			.set("Accept", "application/json")
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(401);
				expect(body).toHaveProperty("message", "Failed to Authenticate");
				done();
			});
	});

	//! ACCESS TOKEN VALID, BUT NOT ADMIN
	test("Create Product Failed, Access Token not admin", (done) => {
		const productData = {
			name: "Thinkpad t14",
			price: 18500000,
			stock: 5,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14.svg",
			CategoryId: 2,
		};

		request(app)
			.post("/products")
			.send(productData)
			.set("Accept", "application/json")
			.set("access_token", process.env.ACCESS_TOKEN_NOT_ADMIN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(401);
				expect(body).toHaveProperty("message", "Failed to Authenticate, Not an Admin");
				done();
			});
	});

	//! EMPTY FIELD
	test("Create Product Failed, Empty field", (done) => {
		const productData = {
			name: "",
			price: 18500000,
			stock: 5,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14.svg",
			CategoryId: 2,
		};

		request(app)
			.post("/products")
			.send(productData)
			.set("Accept", "application/json")
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(400);
				expect(body).toHaveProperty("message", expect.any(String));
				done();
			});
	});

	//! MINUS STOCK
	test("Create Product Failed, Stock Number less than 1", (done) => {
		const productData = {
			name: "Thinkpad t14",
			price: 18500000,
			stock: -1,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14.svg",
			CategoryId: 2,
		};

		request(app)
			.post("/products")
			.send(productData)
			.set("Accept", "application/json")
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(400);
				expect(body).toHaveProperty("message", "Validation error: Minimum product stock is 1");
				done();
			});
	});

	//! PRICE MINUS 100
	test("Create Product Failed, Price less than 100", (done) => {
		const productData = {
			name: "Thinkpad t14",
			price: -200,
			stock: 5,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14.svg",
			CategoryId: 2,
		};

		request(app)
			.post("/products")
			.send(productData)
			.set("Accept", "application/json")
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(400);
				expect(body).toHaveProperty("message", "Validation error: Minimum price is Rp 100,00");
				done();
			});
	});

	//! FIELD WRONG DATA TYPE
	test("Create Product Failed, Price less than 100", (done) => {
		const productData = {
			name: 14,
			price: "not a number",
			stock: "jakarta",
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14.svg",
			CategoryId: 2,
		};

		request(app)
			.post("/products")
			.send(productData)
			.set("Accept", "application/json")
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(400);
				expect(body).toHaveProperty("message", expect.any(String));
				done();
			});
	});
});
