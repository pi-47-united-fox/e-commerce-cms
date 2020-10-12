/**
 * * @note File ini untuk Testing Model User (Dengan Role Admin)
 *   Testing Berupa:
 *      1. Success: Test Case Login Admin + CRUD Product
 *          [x] Login
 *      2. Fail: Test Case Login Admin + CRUD Product
 *          [x] Login
 */

require('dotenv').config()
const request = require("supertest");
const app     = require("../app.js");

describe("Login - Case", () => {
    // @note Success - Login Admin
    test("Success: Login - Should return JWT Token and status", (done) => {
        request(app)
            .post("/login")
            .send({
                email: 'admin@mail.com',
                password: '1234'
            })
            .set("Accept", "aplication/json")
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
    });
    // @note Failed - Admin Login
    test("Failed: Empty Email and Password", done => {
        request(app)
            .post("/login")
            .send({
                email: '',
                password: ''
            })
            .set("Accept", "aplication/json")
            .then(response => {
                const {status, body} = response

                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Invalid Email or Password')
                done()
            })
    })
    test("Failed: Wrong email or Password", done => {
        request(app)
            .post("/login")
            .send({
                email: 'admin@admin.com',
                password: 'qwerty'
            })
            .set("Accept", "aplication/json")
            .then(response => {
                const {status, body} = response

                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Invalid Email or Password')
                done()
            })
    })
});


