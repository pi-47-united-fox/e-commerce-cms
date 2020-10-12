require('dotenv').config()
const request = require("supertest")
const app = require("../app")

const userData = {
    email: "admin@mail.com",
    password: "1234"
}

const userData2 = {
    email: "admin@mail.com",
    password: "12345"
}
const userData3 = {
    email: "admin2@mail.com",
    password: "1234"
}

// SUCCESS LOGIN
describe.only("Login Succes", () => {
    it("login succes send json : status(201) & access_token admin", (done) => {
        request(app)
            .post("/login")
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty("access_token", expect.any(String))
                done()
            })
            .catch(err => {
                console.log(err);
                done()
            })
    })
})

// FAILED LOGIN
describe("Login failed", () => {
    it("email done password worong", (done) => {
        request(app)
            .post("/login")
            .send(userData2)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("errors", ["wrong email/password !"])
                done()
            })
    })

    it("no email in database", (done) => {
        request(app)
            .post("/login")
            .send(userData3)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("errors", ["wrong email/password !"])
                done()
            })
    })

    it("email & password empty", (done) => {
        request(app)
            .post("/login")

            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty("errors",
                    ["name can't be empty",
                        "password can't be empty"])
                done()
            })
    })
})