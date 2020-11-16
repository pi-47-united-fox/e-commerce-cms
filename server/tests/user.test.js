const request = require('supertest')
const app = require('../app.js')


describe('login test',()=>{
    test('Successfully Login', (done)=>{
        const user = {
            email: 'admin@jmail.com',
            password: '123456',
        }
        request(app)
        .post('/login')
        .send(user)
        .set('Accept', 'application/json')
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    })
    test('Failed to Login/Wrong Password', (done)=>{
        const userData = {
            email: 'admin@jmail.com',
            password: '1',
        }
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then(response=>{
            const {status,body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "email/password is wrong.")
            done()
        })
    })

    test('Email not found', (done)=>{
        const userData = {
            email: 'xxx@mail.com',
            password: '123456',
        }
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then(response=>{
            const {status,body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "email/password is wrong.")
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
            expect(status).toBe(401)
            expect(body).toHaveProperty('message',"email and password must be filled")
            done()
        })
    })
}) 
