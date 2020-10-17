const { response } = require('express')
const request = require('supertest')
const app = require('../app')

const {sequelize} = require('../models')
const {queryInterface} = sequelize


const inputLogin = {
    email: "albarm@gmail.com",
    password: "123456"
}

const inputLogin2 = {
    email: "salah@gmail.com",
    password: "passwordsalah"
}


describe('testing login user', () => {
    test('success login', (done) =>{
        request(app)
        .post('/login')
        .send(inputLogin)
        .set('Accept', 'application/json')
        .then(response => {
        
            const { status, body } = response    
            expect(status).toBe(201)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    })

    test('failed login invalid input', (done) => {
        request(app)
        .post('/login')
        .send(inputLogin2)
        .set('NotAccept', 'application/json')
        .then(response =>{
            const {status, body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'invalid email or password')
            done()
        })
    })
    // more test here...
})