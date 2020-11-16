const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User } = require('../models')
const { signToken } = require('../helpers/jwt')

let access_token = ''

let newProduct1 = {
    "name": "Cristiano Ronaldo",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    "price": 130000000,
    "stock": 1,
    "category": "Forward"
}
let productNegativeValue =
{
    "name": "Cristiano Ronaldo",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    "price": -130000000,
    "stock": -1,
    "category": "Forward"
}
let productEmptyValue =
{
    "name": "",
    "image_url": "",
    "price": null,
    "stock": null,
    "category": ""
};
let productWrongFormat =
{
    "name": "Cristiano Ronaldo",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    "price": "€ 130,000,000",
    "stock": "1 player",
    "category": "Forward"
};
beforeAll((done) => {
    User.findOne({
        where: {
            email: "admin@jmail.com"
        }
    })
        .then((data) => {
            access_token = signToken({ id: data.id, email: data.email })
            done()
        })
        .catch((err) => {
            console.log(err)
            done()
        })
})
describe('Testing Product', () => {
    test('Successfully Add Product', (done) => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(newProduct1)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(201)
                idUpdate = body.id
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', newProduct1.name)
                expect(body).toHaveProperty('image_url', newProduct1.image_url)
                expect(body).toHaveProperty('price', newProduct1.price)
                expect(body).toHaveProperty('stock', newProduct1.stock)
                expect(body).toHaveProperty('category', newProduct1.category)
                done()
            })
    })
    test('Successfully Fetch All Products', (done) => {
        request(app)
            .get('/products')
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body[0].id).toStrictEqual(expect.any(Number))
                expect(body[0].name).toBe(newProduct1.name)
                expect(body[0].image_url).toBe(newProduct1.image_url)
                expect(body[0].price).toBe(newProduct1.price)
                expect(body[0].stock).toBe(newProduct1.stock)
                expect(body[0].category).toBe(newProduct1.category)
                done()
            })
    })
    test("Add Product no access_token", (done) => {
        request(app)
            .post("/products")
            .set("Accept", "application/json")
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "jwt must be provided");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });
    test("delete product no access_token", (done) => {
        request(app)
            .delete(`/products/${newProduct1.id}`)
            .set("Accept", "application/json")
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "jwt must be provided");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });
    test("add product fail access_token", (done) => {
        request(app)
            .post("/products")
            .set("Accept", "application/json")
            .set("access_token", "invalid")
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "jwt malformed");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });
    test("delete product fail access_token", (done) => {
        request(app)
            .delete(`/products/${newProduct1.id}`)
            .set("Accept", "application/json")
            .set("access_token", "invalid")
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "jwt malformed");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });

    test("add product empty value", (done) => {
        request(app)
            .post(`/products`)
            .send(productEmptyValue)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message",
                    '[{"message": "Validation error: name must be filled,',
                    'Validation error: image must be filled,',
                    'Validation error: category must be filled"}]');
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
    });
    test("create stock and price minus.", (done) => {
        request(app)
            .post(`/products`)
            .send(productNegativeValue)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message",
                    '[{"message": "Validation error: price must be positive value',
                    'Validation error: price must be positive value"}]');
                done();
            })
    })

    test("create stock and price wrong format.", (done) => {
        request(app)
            .post(`/products`)
            .send(productWrongFormat)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message",
                    '[{"message": "Validation error: price must be positive value',
                    'Validation error: price must be positive value"}]');
                done();
            })
    })
    test("create stock and price minus.", (done) => {
        request(app)
            .put(`/products/${newProduct1.id}`)
            .send(productNegativeValue)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message",
                    '[{"message": "Validation error: price must be positive value',
                    'Validation error: price must be positive value"}]');
                done();
            })
    })

    test("create stock and price wrong format.", (done) => {
        request(app)
            .put(`/products/${newProduct1.id}`)
            .send(productWrongFormat)
            .set("Accept", "application/json")
            .set("access_token", access_token)
            .then((response) => {
                const { status, body } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message",
                    '[{"message": "Validation error: price must be positive value',
                    'Validation error: price must be positive value"}]');
                done();
            })
    })
    
    test('Successfully Put Product', (done) => {
        const productUpdate = {
            "name": "Cristiano Ronaldo",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
            "price": 130000000,
            "stock": 1,
            "category": "Forward",
        }

        request(app)
            .put(`/products/${productUpdate.id}`)
            .set('access_token', access_token)
            .send(productUpdate)
            .set('Accept', 'application/json')
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(newProduct1)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', productUpdate.name)
                expect(body).toHaveProperty('image_url', productUpdate.image_url)
                expect(body).toHaveProperty('price', productUpdate.price)
                expect(body).toHaveProperty('stock', productUpdate.stock)
                expect(body).toHaveProperty('category', productUpdate.category)
                done()
            })
    })
})



afterAll((done) => {
    queryInterface.bulkDelete('Products')
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
})
