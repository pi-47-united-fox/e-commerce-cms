require('dotenv').config()
const request = require("supertest");
const app = require("../app");
const { User } = require("../models/index");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const jwt = require('jsonwebtoken')

let access_token = "";
const Product = {
    name: "arabica",
    image_url: "https://imgur.com/AU2NT88",
    price: 12000,
    stock: 20,
    category: 'minuman'
};

let Product2 = {
    id: "",
    name: "Toracafe",
    image_url: "https://imgur.com/AU2NT88",
    price: 15000,
    stock: 10,
    category: 'minuman'

};
let ProductTestMinus = {
    name: "imgae",
    image_url: "https://imgur.com/AU2NT88",
    price: -1,
    stock: -1,
    category: 'minuman'
};
let ProductEmpty = {
    name: "",
    image_url: "",
    price: "",
    stock: "",
    category: 'minuman'

};
let ProductWrongFormat = {
    name: "arabica",
    image_url: "https://imgur.com/AU2NT88",
    price: "a12000",
    stock: "a20",
    category: 'minuman'

};
const userData = {
    email: "admin@mail.com",
    password: "1234",
    role: "admin"
};

beforeAll((done) => {
    User.findOne({ where: { email: userData.email } })
        .then((user) => {
            access_token = jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role,
            }, process.env.SECRET);
            done();
        })
    // .catch((err) => {
    //     console.log(err);
    //     done();
    // });
});

afterAll((done) => {
    queryInterface
        .bulkDelete("Products")
        .then(() => {
            done();
        })
    // .catch((err) => {
    //     console.log(err);
    //     done();
    // });
});

// CREATE SUCCESS (done)
describe("Create Success", () => {
    it("Create Success send json : status(201) ", (done) => {
        request(app)
            .post("/products")
            .set("Accept", "application/json")
            .send(Product)
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("name", expect.any(String));
                expect(body).toHaveProperty("image_url", expect.any(String));
                expect(body).toHaveProperty("price", expect.any(Number));
                expect(body).toHaveProperty("stock", expect.any(Number));
                expect(body).toHaveProperty("category", expect.any(String));
                expect(body).toHaveProperty("UserId", expect.any(Number));
                Product2.id = body.id;
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });
});

// GET ALL DATA succes and failed
describe("Fecth Product Success", () => {
    it("Fecth Product Success send json : status(200) ", (done) => {
        request(app)
            .get("/products")
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(200);
                expect(Array.isArray(body)).toBeTruthy();
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });
    it("Fecth Product no acces token send json : status(401) ", (done) => {
        request(app)
            .get("/products")
            .set("Accept", "application/json")
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(401);
                expect(Array.isArray(body)).toBeFalsy();
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });
    it("Fecth Product no acces token send json : status(401) ", (done) => {
        request(app)
            .get("/products")
            .set("Accept", "application/json")
            .set("access_token", "access_token_wrong")
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("errors", ["User not authenticated"]);
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    })
});

// UPDATE SUCCESS (done)
describe("Update Success", () => {
    it("Update Success send json : status(201) ", (done) => {
        request(app)
            .put(`/products/${Product2.id}`)
            .send(Product)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(201);
                expect(Array.isArray(body)).toBeFalsy();
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });
});

// CREATE FAILED (done)
describe("Create Failed", () => {
    it("Create Failed no access Token send json : status(400) ", (done) => {
        request(app)
            .post(`/products/`)
            .send(Product)
            .set("Accept", "application/json")
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(401);
                expect(Array.isArray(body)).toBeFalsy();

                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });

    it("Create Failed not admin access Token send json : status(400) ", (done) => {
        request(app)
            .post(`/products/`)
            .send(Product)
            .set("Accept", "application/json")
            .set("access_token", "invalid")
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("errors", ["User not authenticated"]);

                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });

    it("Create Failed empty required stock empty send json : status(400) ", (done) => {
        request(app)
            .post(`/products/`)
            .send(ProductEmpty)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("errors", [
                    "name can't be empty",
                    "image can't be empty",
                    "price can't be empty",
                    "price mush be number",
                    "stock can't be empty",
                    "stock mush be number",
                ]);
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });

    // price can't minus
    it("Update stock minus send json : status(400) ", (done) => {
        request(app)
            .post(`/products/`)
            .send(ProductTestMinus)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("errors", [
                    "price more than 0",
                    "stock more than 0",
                ]);
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });

    it("Update Price minus send json : status(400) ", (done) => {
        request(app)
            .post(`/products/`)
            .send(ProductTestMinus)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("errors", [
                    "price more than 0",
                    "stock more than 0",
                ]);
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });

    // stock & price not number
    it("Update not type data send json : status(400) ", (done) => {
        request(app)
            .post(`/products/`)
            .send(ProductWrongFormat)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("errors", [
                    "price mush be number",
                    "stock mush be number",
                ]);
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });
});

// UPDATE FAILED(done)
describe("Update Failed", () => {
    // no token
    it("Update Failed no access Token send json : status(400) ", (done) => {
        request(app)
            .put(`/products/${Product2.id}`)
            .send(Product)
            .set("Accept", "application/json")
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(401);
                expect(Array.isArray(body)).toBeFalsy();
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });
    // wrong token
    it("Update Failed not admin access Token send json : status(400) ", (done) => {
        request(app)
            .put(`/products/${Product2.id}`)
            .send(Product)
            .set("Accept", "application/json")
            .set("access_token", "access_token_wrongtest")
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("errors", ["User not authenticated"]);
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });
    // can'empty
    it("Update Failed empty required stock empty send json : status(400) ", (done) => {
        request(app)
            .put(`/products/${Product2.id}`)
            .send(ProductEmpty)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("errors", [
                    "name can't be empty",
                    "image can't be empty",
                    "price can't be empty",
                    "price mush be number",
                    "stock can't be empty",
                    "stock mush be number",
                ]);
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });

    // stock can't minus
    it("Update stock minus send json : status(400) ", (done) => {
        request(app)
            .put(`/products/${Product2.id}`)
            .send(ProductTestMinus)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("errors");
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });

    // price can't minus
    it("Update stock minus send json : status(400) ", (done) => {
        request(app)
            .put(`/products/${Product2.id}`)
            .send(ProductTestMinus)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("errors");
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });

    // stock & price not number
    it("Update not type data send json : status(400) ", (done) => {
        request(app)
            .put(`/products/${Product2.id}`)
            .send(ProductWrongFormat)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("errors", [
                    "price mush be number",
                    "stock mush be number",
                ]);
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });
});

// DELETE SUCCESS (done)
describe("delete Success", () => {
    it("delete Success send json : status(201) ", (done) => {
        request(app)
            .delete(`/products/${Product2.id}`)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Deleted successfully");

                done();
            })
        // .catch((err) => {
        //     console.log(err);
        // });
    });
});
// DELETE FAILED(done)

describe("Update Failed", () => {
    it("Create Failed no access Token send json : status(400) ", (done) => {
        request(app)
            .delete(`/products/${Product2.id}`)
            .set("Accept", "application/json")
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(401);
                expect(Array.isArray(body)).toBeFalsy();
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });

    it("Create Failed not admin access Token send json : status(400) ", (done) => {
        request(app)
            .delete(`/products/${Product2.id}`)
            .set("Accept", "application/json")
            .set("access_token", "access_token_wrong")
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("errors", ["User not authenticated"]);
                done();
            })
        // .catch((err) => {
        //     console.log(err);
        //     done();
        // });
    });
});