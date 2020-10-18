const request = require("supertest")
const app = require("../app")


let access_token = ''

// admin@mail.com sudah terdaftar saat seeding
let userData = [
    {
        email: 'admin@mail.com',
        password: '1234'
    },
    {
        email: 'adminss@mail.com',
        password: '1234'
    },
    {
        email: 'admin@mail.com',
        password: 'abcde'
    },
    {
        email: 'admin@mail.com',
        password: ''
    },
]

// Login
describe('Testing login', () => {
    test('Successfully login', (done) => {
        request(app)
            .post('/login')
            .send(userData[0])
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
    })

    test('Wrong email', (done) => {
        request(app)
            .post('/login')
            .send(userData[1])
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Wrong email/password')
                done()
            })
    })

    test('Wrong password', (done) => {
        request(app)
            .post('/login')
            .send(userData[2])
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Wrong email/password')
                done()
            })
    })

    test('Empty email', (done) => {
        request(app)
            .post('/login')
            .send(userData[3])
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Please fill the form carefully')
                done()
            })
    })

    test('Empty password', (done) => {
        request(app)
            .post('/login')
            .send(userData[3])
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Please fill the form carefully')
                done()
            })
    })

    test('Empty both', (done) => {
        request(app)
            .post('/login')
            .send(userData[3])
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', 'Please fill the form carefully')
                done()
            })
    })

})