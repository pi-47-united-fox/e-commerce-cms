const request = require("supertest")
const app = require("../app")
const { User } = require("../models/index")
const { signToken, decodeToken } = require("../helpers/jwt")


let access_token
let userData
let id

beforeAll((done) => {
    let admin = {
        email: 'admin@mail.com',
        password: '1234',
        role: 'admin'
    }
    // console.log(User, "###USER")
    User.create(admin)
        .then(data => {
            access_token = signToken({
                id: data.id,
                email: data.email,
                role: data.role
            })
            // console.log(access_token, 'dalam user create')
            userData = decodeToken(access_token)
            done()
        })
        .catch(err => {
            // console.log(err)
            done(err)
        })
})

afterAll((done) => {
    User.destroy({truncate: true})
        .then(ok => {
            done()
        })
        .catch(err => {
            done()
        })
})

let newProduct = {
    name: 'xbox s',
    image_url: 'google.com',
    price: 3000000,
    stock: 7
}

describe('Product', () => {
    // Success

    test('Succesfully add a product', (done) => {
        // console.log(access_token, "<>><<<>>>")
        request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(newProduct)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('message', "A new product has been successfully added.")
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', newProduct.name)
                expect(body).toHaveProperty('image_url', newProduct.image_url)
                expect(body).toHaveProperty('price', newProduct.price)
                expect(body).toHaveProperty('stock', newProduct.stock)
                id = body.id
                done()
            })
            // .catch(err => {
            //     console.log(err)
            //     done(err)
            // })
    })

    // Fail cases
    test('Token expired when adding a product', (done) => {
        let expiredToken = ''
        request(app)
            .post('/products')
            .set('access_token', expiredToken)
            .send(newProduct)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', "Token is expired. Please relogin.")
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe('View all products', () => {    
    test('Successfully view all products', (done) => {
        request(app)
            .get('/products')
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                if(response.body.length > 0) {
                    expect(body[0]).toHaveProperty('id', expect.any(Number))
                    expect(body[0]).toHaveProperty('name', expect.any(String))
                    expect(body[0]).toHaveProperty('image_url', expect.any(String))
                    expect(body[0]).toHaveProperty('price', expect.any(Number))
                    expect(body[0]).toHaveProperty('stock', expect.any(Number))
                    done()
                }
            })
            .catch(err => {
                done(err)
            })
    })

    // Fail cases
    test('Token expired when viewing all product', (done) => {
        let expiredToken = ''
        request(app)
            .get('/products')
            .set('access_token', expiredToken)
            .send(newProduct)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', "Token is expired. Please relogin.")
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})