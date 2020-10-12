/**
 * * @note File ini untuk Testing Model Product (Dengan Role Admin)
 *   Testing Berupa:
 *      1. Success: Test Case CRUD Product
 *          [x] Read
 *          [x] Create
 *          [x] Update
 *          [x] Delete
 *      2. Fail: Test Case Login CRUD Product
 *          [x] Read
 *          [x] Create
 *          [x] Update
 *          [x] Delete
 */

require('dotenv').config()
const request                      = require("supertest");
const app                          = require("../app.js");
const { Jwt }                      = require('../helpers');
const { User, Product, sequelize } = require('../models');
const { queryInterface }           = sequelize
let access_token;

// * Access token Dari sini
beforeAll (done => {
    User.findOne({
        where: {
            email: 'admin@mail.com'
        }
    }).then (result => {
        access_token = Jwt.generate(result.id, result.email, result.role);
        done()
    })
}, 5000)

describe("Product - Admin Case Add", () => {
    // @note Success - Add Data
    test("Success: Add One Data (Product)", done => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: "Sepatu",
                image_url: "https://stockx-360.imgix.net//Air-Jordan-1-Mid-Chicago-Toe/Images/Air-Jordan-1-Mid-Chicago-Toe/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1596134467&w=1000",
                price: 1000000,
                stock: 70
            })
            .then(response => {
                const {status, body} = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('name', "Sepatu")
                expect(body).toHaveProperty('image_url', "https://stockx-360.imgix.net//Air-Jordan-1-Mid-Chicago-Toe/Images/Air-Jordan-1-Mid-Chicago-Toe/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1596134467&w=1000")
                expect(body).toHaveProperty('price', 1000000)
                expect(body).toHaveProperty('stock', 70)
                done()
            })
    })
    // @note Failed - Add Data
    test("Failed: Add One Data but price and/or stock below 0", done => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: "Sepatu",
                image_url: "https://stockx-360.imgix.net//Air-Jordan-1-Mid-Chicago-Toe/Images/Air-Jordan-1-Mid-Chicago-Toe/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1596134467&w=1000",
                price: -1000,
                stock: 0
            })
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(String))
                done()
            })
    })
    test("Failed: Add One Data but product name is empty", done => {
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send({
                name: "",
                image_url: "https://stockx-360.imgix.net//Air-Jordan-1-Mid-Chicago-Toe/Images/Air-Jordan-1-Mid-Chicago-Toe/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1596134467&w=1000",
                price: 1000000,
                stock: 70
            })
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(String))
                done()
            })
    })
})

describe("Product - Admin and User Case Fetch", () => {
    // @note Success - Fetch All Data
    test("Success: Fetch All Data Product", done => {
        request(app)
            .get('/products')
            .set('access_token', access_token)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body[0]).toHaveProperty('id', expect.any(Number))
                expect(body[0]).toHaveProperty('name', expect.any(String))
                expect(body[0]).toHaveProperty('price', expect.any(Number))
                expect(body[0]).toHaveProperty('stock', expect.any(Number))
                done()
            })
    })
    // @note Success - Fetch One Data
    test("Success: Fetch One Data", done => {
        request(app)
            .get('/products/1')
            .set('access_token', access_token)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('name', expect.any(String))
                expect(body).toHaveProperty('image_url', expect.any(String))
                expect(body).toHaveProperty('price', expect.any(Number))
                expect(body).toHaveProperty('stock', expect.any(Number))
                done()
            })
    })
    // @note Failed - Fetch All Data
    test('Failed: Fetch All Data but not Authorized', done => {
        request(app)
            .get('/products')
            .set('access_token', 'not_real_access_token')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'You dont have acces to this operation')

                done()
            })
    })
    // @note Failed - Fetch One Data
    test('Failed: Fetch One Data but not Authorized', done => {
        request(app)
            .get('/products/1')
            .set('access_token', 'not_real_access_token')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'You dont have acces to this operation')

                done()
            })
    })
    test('Failed: Fetch One Data but product not found', done => {
        request(app)
            .get('/products/1002')
            .set('access_token', access_token)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Not Found!')

                done()
            })
    })
})

describe("Product - Admin Case Update Data", () => {
    // @note Success - Update Data
    test("Success: Edit/Update One Data", done => {
        request(app)
            .put('/products/1')
            .set('access_token', access_token)
            .send({
                name: "Sepatu Jordan",
                image_url: "https://stockx-360.imgix.net//Air-Jordan-1-Mid-Chicago-Toe/Images/Air-Jordan-1-Mid-Chicago-Toe/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1596134467&w=1000",
                price: 2000000,
                stock: 40
            })
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('name', "Sepatu Jordan")
                expect(body).toHaveProperty('image_url', "https://stockx-360.imgix.net//Air-Jordan-1-Mid-Chicago-Toe/Images/Air-Jordan-1-Mid-Chicago-Toe/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1596134467&w=1000")
                expect(body).toHaveProperty('price', 2000000)
                expect(body).toHaveProperty('stock', 40)
                done()
            })
    })
    // @note Failed - Update Data
    test("Failed: Edit/Udate but Price and/or Stock below 0", done => {
        request(app)
            .put('/products/1')
            .set('access_token', access_token)
            .send({
                name: "Sepatu",
                image_url: "https://stockx-360.imgix.net//Air-Jordan-1-Mid-Chicago-Toe/Images/Air-Jordan-1-Mid-Chicago-Toe/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1596134467&w=1000",
                price: -1000,
                stock: -1
            })
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(String))

                done()
            })
    })
    test("Failed: Edit/Update One Data but field input (name, price, stock) set to empty value", done => {
        request(app)
            .put('/products/1')
            .set('access_token', access_token)
            .send({
                name: "",
                image_url: "https://stockx-360.imgix.net//Air-Jordan-1-Mid-Chicago-Toe/Images/Air-Jordan-1-Mid-Chicago-Toe/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1596134467&w=1000",
                price: 0,
                stock: 0
            })
            .then(response => {
                const {status, body} = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(String))

                done()
            })
    })
    test("Failed: Edit/Update One Data not found id", done => {
        request(app)
            .put('/products/1002')
            .set('access_token', access_token)
            .send({
                name: "Sepatu Jordan",
                image_url: "https://stockx-360.imgix.net//Air-Jordan-1-Mid-Chicago-Toe/Images/Air-Jordan-1-Mid-Chicago-Toe/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1596134467&w=1000",
                price: 2000000,
                stock: 40
            })
            .then(response => {
                const {status, body} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Not Found!')

                done()
            })
    })
})

describe("Product - Admin Case Delete Data", () => {
    // @note Success - Delete Data
    test("Success: Delete One Data", done => {
        request(app)
            .delete('/products/1')
            .set('access_token', access_token)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Product: success deleted')

                done()
            })
    })
    // @note Failed - Delete Data
    test("Failed: Delete One Data but role didn't have authorization", done => {
        request(app)
            .delete('/products/2')
            .set('access_token', 'wr0n6_acc33ss_t0k3n')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'You dont have acces to this operation')

                done()
            })
    })
    test("Failed: Delete One Data but Data Not Found", done => {
        request(app)
            .delete('/products/1002')
            .set('access_token', access_token)
            .then(response => {
                const {status, body} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Not Found!')

                done()
            })
    })
})

// * @remind Untuk Memnbersihkan semua data di table database setelah test selesai
afterAll(done => {
    queryInterface.bulkDelete('Products', null, {});
    done()
})