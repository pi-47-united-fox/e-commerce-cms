
const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

const userData = {
    role:'admin',
    email: 'reyand@mail.com',
    password: '12345678'
}

const userData2 = {
    role:'admin',
    email: 'reyand@mail.com',
    password: '123456783'
}

afterAll((done) => {
    queryInterface.bulkDelete('Users')
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err);
        })
})
describe('Testing register', function () {
    test('Successfully register', function (done) {
        request(app)
            .post('/register')
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                //resonse{status, body}
                const { status, body } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('role', userData.role)
                expect(body).toHaveProperty('email', userData.email)
                expect(body).toHaveProperty('id', expect.any(Number))
                done()
            })

    })
})


describe('Testing login', function () {
    test('Successfully login', function (done) {
        request(app)
            .post('/login')
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
    })
    test('Invalid role/email/password', function (done) {
        request(app)
            .post('/login')
            .send(userData2)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Invalid password/email/role")
                done()
            })
    })
})



