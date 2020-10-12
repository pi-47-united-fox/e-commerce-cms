const request = require('supertest')
const app = require('../app')


describe('Testing Login',()=>{
    test('Successfully Login', (done)=>{
        const userData = {
            email: 'admin@mail.com',
            password: '1234',
        }
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    })


    test('Failed to Login / Wrong Password', (done)=>{
        const userData = {
            email: 'admin@mail.com',
            password: '1',
        }
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then(response=>{
            const {status,body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Wrong email/password")
            done()
        })
    })

    test('Email not found', (done)=>{
        const userData = {
            email: 'aaaadmin@mail.com',
            password: '12345',
        }
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then(response=>{
            const {status,body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Wrong email/password")
            done()
        })
    })

    test('Email and Password empty', (done)=>{
        const userData = {
            email: '',
            password: '',
        }
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then(response=>{
            const {status,body} = response
            expect(status).toBe(500)
            expect(body).toHaveProperty('message',"Email and Password can't Empty")
            done()
        })
    })

    
})