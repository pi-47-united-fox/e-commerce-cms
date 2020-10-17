const request = require("supertest");
const app = require("../app");

const productData = {
	name: "Thinkpad t14",
	price: 18500000,
	stock: 5,
	img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14.svg",
	CategoryId: 2,
};

const updatedProductData = {
	name: "Thinkpad t14s",
	price: 19500000,
	stock: 5,
	img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14s.svg",
	CategoryId: 2,
};

let id = 0;

describe("Testing Create Product", () => {
	test("Create Product Success", (done) => {
		request(app)
			.post("/products")
			.send(productData)
			.set("Accept", "application/json")
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(201);
				expect(body).toHaveProperty("id", expect.any(Number));
				id = body.id;
				expect(body).toHaveProperty("name", productData.name);
				done();
			});
	});

	//! NO ACCESS TOKEN
	test("Create Product Failed, No access token", (done) => {
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
		const wrongProductData = {
			name: "",
			price: 18500000,
			stock: 5,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14.svg",
			CategoryId: 2,
		};

		request(app)
			.post("/products")
			.send(wrongProductData)
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
		const wrongProductData = {
			name: "Thinkpad t14",
			price: 18500000,
			stock: -1,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14.svg",
			CategoryId: 2,
		};

		request(app)
			.post("/products")
			.send(wrongProductData)
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
		const wrongProductData = {
			name: "Thinkpad t14",
			price: -200,
			stock: 5,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14.svg",
			CategoryId: 2,
		};

		request(app)
			.post("/products")
			.send(wrongProductData)
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
	test("Create Product Failed, Enter wrong data type", (done) => {
		const wrongProductData = {
			name: 14,
			price: "not a number",
			stock: "jakarta",
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14.svg",
			CategoryId: 2,
		};

		request(app)
			.post("/products")
			.send(wrongProductData)
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

describe("Testing Get all Product", () => {
	test("Get all Product Success", (done) => {
		request(app)
			.get("/products")
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(200);
				expect(body).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							id: expect.any(Number),
							name: expect.any(String),
							img_url: expect.any(String),
							category_name: expect.any(String),
							price: expect.any(Number),
							stock: expect.any(Number),
						}),
					]),
				);
				done();
			});
	});

	//!NO ACCESS TOKEN
	test("Get all Product Failed, No Access Token", (done) => {
		request(app)
			.get("/products")
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(401);
				expect(body).toHaveProperty("message", "Failed to Authenticate");
				done();
			});
	});
});

describe("Testing Update Product Data", () => {
	test("Update Product Success", (done) => {
		request(app)
			.put(`/products/${id}`)
			.send(updatedProductData)
			.set("Accept", "application/json")
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(200);
				expect(body).toEqual(
					expect.objectContaining({
						id: id,
						name: updatedProductData.name,
						img_url: updatedProductData.img_url,
						category_name: expect.any(String),
						price: updatedProductData.price,
						stock: updatedProductData.stock,
					}),
				);
				done();
			});
	});

	//! PRODUCT ID DOESN'T EXIST
	test("Update Product Failed, product ID doesn't exist", (done) => {
		request(app)
			.put(`/products/1000001`)
			.send(updatedProductData)
			.set("Accept", "application/json")
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				console.log(status, body);
				expect(status).toBe(404);
				expect(body).toHaveProperty("message", "Product is not Found");
				done();
			});
	});

	//! NO ACCESS TOKEN
	test("Update Product Failed, No access token", (done) => {
		request(app)
			.put(`/products/${id}`)
			.send(updatedProductData)
			.set("Accept", "application/json")
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(401);
				expect(body).toHaveProperty("message", "Failed to Authenticate");
				done();
			});
	});

	//! ACCESS TOKEN VALID, BUT NOT ADMIN
	test("Update Product Failed, Access Token not admin", (done) => {
		request(app)
			.put(`/products/${id}`)
			.send(updatedProductData)
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
	test("Update Product Failed, Empty field", (done) => {
		const wrongProductData = {
			name: "",
			price: 19500000,
			stock: 5,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14s.svg",
			CategoryId: 2,
		};

		request(app)
			.put(`/products/${id}`)
			.send(wrongProductData)
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
	test("Update Product Failed, Stock Number less than 1", (done) => {
		const wrongProductData = {
			name: "Thinkpad t14s",
			price: 19500000,
			stock: -1,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14s.svg",
			CategoryId: 2,
		};

		request(app)
			.put(`/products/${id}`)
			.send(wrongProductData)
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
		const wrongProductData = {
			name: "Thinkpad t14s",
			price: -100,
			stock: 5,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14s.svg",
			CategoryId: 2,
		};

		request(app)
			.put(`/products/${id}`)
			.send(wrongProductData)
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
	test("Create Product Failed, Enter wrong data type", (done) => {
		const wrongProductData = {
			name: 14,
			price: "Not a Number",
			stock: 5,
			img_url: "https://avatars.dicebear.com/api/bottts/thinkpad-t14s.svg",
			CategoryId: "Not a Number",
		};

		request(app)
			.put(`/products/${id}`)
			.send(wrongProductData)
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

describe("Testing Delete Product Data", () => {
	test("Delete Product Success", (done) => {
		request(app)
			.delete(`/products/${id}`)
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(200);
				expect(body).toHaveProperty("message", "Product is sucessfully deleted");
				done();
			});
	});

	//! PRODUCT ID DOESN'T EXIST
	test("Delete Product Failed, product ID doesn't exist", (done) => {
		request(app)
			.delete(`/products/100001`)
			.set("access_token", process.env.ACCESS_TOKEN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(404);
				expect(body).toHaveProperty("message", "Product is not Found");
				done();
			});
	});

	//! NO ACCESS TOKEN
	test("Delete Product Failed, No access token", (done) => {
		request(app)
			.delete(`/products/${id}`)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(401);
				expect(body).toHaveProperty("message", "Failed to Authenticate");
				done();
			});
	});

	//! ACCESS TOKEN VALID, BUT NOT ADMIN
	test("Update Product Failed, Access Token not admin", (done) => {
		request(app)
			.delete(`/products/${id}`)
			.set("access_token", process.env.ACCESS_TOKEN_NOT_ADMIN)
			.then((res) => {
				const { status, body } = res;
				expect(status).toBe(401);
				expect(body).toHaveProperty("message", "Failed to Authenticate, Not an Admin");
				done();
			});
	});
});
