const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

let userData = {
    email: 'admin@mail.com',
    password: '1234'
}

// afterAll((done) => {
//     queryInterface.bulkDelete('Users')
//     .then(()=> {
//         done()
//     })
//     .catch(err => {
//         console.log(err)
//         done()
//     })
// })

// describe('Testing register', () => {
//     test('Succesfully Register', (done) => {
//         request(app)
//         .post('/users/register')
//         .send(userData)
//         .set('Accept', 'application/json')
//         .then(response => {
//             // console.log(response)
//             const {status, body} = response
//             expect(status).toBe(201)
//             expect(body).toHaveProperty('email', userData.email)
//             expect(body).toHaveProperty('id', expect.any(Number))
//             done()
//         })
//     })
//     test('Unique constraint email', (done) => {  // TDD ini dilengkapin
//         request(app)
//         .post('/users/register')
//         .send(userData)
//         .set('Accept', 'application/json')
//         .then(response => {
//             const {status, body} = response
//             expect(status).toBe(500)
//             expect(body).toHaveProperty('message', 'email must be unique')
//             done()
//         })
//     })
// })

describe('Testing Success Login', ()=> {
    test('Return status code 200 with Successfully login', (done) => {
        request(app)
        .post('/users/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then(response => {
            const {status, body} = response
            // console.log(body, '<<<<<<')
            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    })
})

describe('Testing Fail Login', ()=> {
    test('Return Status Code 401 with Empty Email / Password', (done) => {
        var userData = {
            email: '',
            password: ''
        }
        request(app)
        .post('/users/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then(response => {
            const {status, body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Invalid email / password')
            done()
        })
    })
    test('Return Status Code 401 with Invalid Password', (done) => {
        var userData = {
            email: 'admin@mail.com',
            password: '1'
        }
        request(app)
        .post('/users/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then(response => {
            const {status, body} = response
            // console.log(body, '<<<<<<')
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Invalid email / password')
            done()
        })
    })
    test('Return Status Code 401 with Invalid Email', (done) => {
        var userData = {
            email: 'adminsalah@mail.com',
            password: '1234'
        }
        request(app)
        .post('/users/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then(response => {
            // console.log(userData)
            const {status, body} = response
            // console.log(body, '<<<<<<')
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Invalid email / password')
            done()
        })
    })
})