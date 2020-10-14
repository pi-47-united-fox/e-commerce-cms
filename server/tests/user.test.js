const request = require("supertest")
const app = require("../app")
const {sequelize} = require("../models")
const {queryInterface} = sequelize

const userData = {
    email:"admin@mail.com",
    password:1234,
}
const userData2 = {
    email:"admin@mail.com",
    password:"fake",
}
const userData3 = {
    email:"adminfake@mail.com",
    password:1234,
}

// afterAll((done) => {
//     queryInterface.bulkDelete('Users')
//     .then(() => {
//         done()
//     })
//     .catch(err => {
//         console.log(err)
//         done()
//     })
// })

describe('Successful Login - admin', () => {
    it('Should return access token', (done) => {
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json') 
        .then(response => { 
            const {status, body} = response
            expect(status).toBe(202) 
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    })
})

describe('Failed Login - admin', () => {
    it('Wrong Email, Should return 404', (done) => {
        request(app)
        .post('/login')
        .send(userData3)
        .set('Accept', 'application/json') 
        .then(response => { 
            const {status, body} = response
            // console.log(response);
            // console.log(body);
            expect(status).toBe(404) 
            expect(body).toHaveProperty('message', 'Wrong Email or Password')
            done()
        })
    })
    it('Wrong Password, Should return 404', (done) => {
        request(app)
        .post('/login')
        .send(userData2)
        .set('Accept', 'application/json') 
        .then(response => { 
            const {status, body} = response
            // console.log(response);
            console.log(body);
            expect(status).toBe(404) 
            expect(body).toHaveProperty('message', 'Wrong Email or Password')
            done()
        })
    })
    it('Empty Input, Should return 404', (done) => {
        request(app)
        .post('/login')
        .send()
        .set('Accept', 'application/json') 
        .then(response => { 
            const {status, body} = response
            // console.log(response);
            // console.log(body);
            expect(status).toBe(404) 
            expect(body).toHaveProperty('message', 'Wrong Email or Password')
            done()
        })
    })
})
