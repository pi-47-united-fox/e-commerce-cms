const request = require('supertest')
const app = require('../app')


const  userData = {
    email:'admin@mail.com',
    password:'1234'
}

describe('testing login success', ()=>{
    test('success login',(done)=>{
        request(app)
        .post('/login')
        .send(userData)
        .set('Accept', 'application/json')
        .then(response =>{ 
            const { status , body } = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
    })
})

describe('testing login fail', ()=>{
    test('email not found',(done)=>{
        let emailNotFound = {...userData, email:'idham@mail.com'}
        request(app)
        .post('/login')
        .send(emailNotFound)
        .set('Accept', 'application/json')
        .then(response =>{ 
            const { status , body } = response
            expect(status).toBe(404)
            expect(body).toHaveProperty('message', "Email Not Found !")
            done()
        })
    })

    test('password wrong',(done)=>{
        let passWrong = {...userData,password:'123'}
        request(app)
        .post('/login')
        .send(passWrong)
        .set('Accept', 'application/json')
        .then(response =>{ 
            const { status , body } = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Wrong Email/Password')
            done()
        })
    })

    test('email cannot be empty',(done)=>{
        let emailEmpty = {...userData,email:''}
        request(app)
        .post('/login')
        .send(emailEmpty)
        .set('Accept', 'application/json')
        .then(response =>{ 
            const { status , body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Email/Password Cannot be empty')
            done()
        })
    })

    test('password cannot be empty',(done)=>{
        let passEmpty = {...userData,password:''}
        request(app)
        .post('/login')
        .send(passEmpty)
        .set('Accept', 'application/json')
        .then(response =>{ 
            const { status , body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Email/Password Cannot be empty')
            done()
        })
    })


})