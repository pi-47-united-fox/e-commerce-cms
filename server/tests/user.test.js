const { response } = require("express")
const request = require("supertest")
const app = require("../app")


let access_token = ''

let userData = {
    email: 'all@hawk.com',
    password: '123456'
}

// Register
describe('Testing register', () => {
    test('Successfully register', () => {
        request(app)
            .post('/register')
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('email', userData.email)
                expect(body).toHaveProperty('role', expect.any(String))
                expect(body).not.toHaveProperty('password')
                done()
            })
    })

    test('Unique constraint email', () => {
        request(app)
            .post('/register')
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(500)
                expect(body).toHaveProperty('message', 'Email has been already registered. Please login or use another email')
                done()
            })
    })

    test('Email cannot be null', () => {
        request(app)
            .post('/register')
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(500)
                expect(userData.password).not.toBeNull()
                expect(body).toHaveProperty('message', 'Email cannot be empty')
                done()
            })
    })

    test('Must be a valid email', () => {
        request(app)
            .post('/register')
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(500)
                expect(body).toHaveProperty('message', 'Must be a valid email')
                done()
            })
    })

    test('Password must be at least 4 characters', () => {
        request(app)
            .post('/register')
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(500)
                expect(body).toHaveProperty('message', 'Password must be at least 6 characters')
                done()
            })
    })

    test('Password cannot be null', () => {
        request(app)
            .post('/register')
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(500)
                expect(userData.password).not.toBeNull()
                expect(body).toHaveProperty('message', 'Password cannot be empty')
                done()
            })
    })
})

// Login
describe('Testing login', () => {
    test('Successfully login', () => {
        request(app)
            .post('/login')
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
    })

    test('Wrong email', () => {
        request(app)
            .post('/login')
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Wrong email/password')
                done()
            })
    })

    test('Wrong password', () => {
        request(app)
            .post('/login')
            .send(userData)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Wrong email/password')
                done()
            })
    })

})