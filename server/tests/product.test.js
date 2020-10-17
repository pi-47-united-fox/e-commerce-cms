const { response } = require('express')
const request = require('supertest')
const app = require('../app')

const {User} = require('../models')
const {getToken} = require('../helpers/jwt')

const {sequelize} = require('../models')
const {queryInterface} = sequelize

let access_token = ''
let id = 0


afterAll((done) => {
    queryInterface.bulkDelete('Products')
    .then(() => {
        done()
    })
    .catch(err => {
        console.log(err)
        done()
    })
})


const userData = {
    email: "albarm@gmail.com",
    password: "123456"
}

beforeAll((done) => {
    User.findOne({
        where: {
            email: userData.email
        }
    })
    .then(user => {
        access_token = getToken({ id: user.id, email: user.email })
        done()
    })
    .catch(err => {
        console.log(err)
        done()
    })

})


const inputProduct = {
    id: 10,
    name: " Specialized-S-Works Turbo Levo SL",
    image_url: "https://cdn.idntimes.com/content-images/post/20200629/specialized-95d89e7bfbd0d1ca8b56fa5da04abfc3.jpg",
    price: "190000000",
    stock: 10,
    category: 'All Mountain',
    // UserData:1
}

const inputProduct2 = {
    id: 10,
    name: "",
    image_url: "",
    price: "",
    stock: null,
    category: ""
}

const inputProduct3 = {
    id: 10,
    name: " Specialized-S-Works Turbo Levo SL",
    image_url: "https://cdn.idntimes.com/content-images/post/20200629/specialized-95d89e7bfbd0d1ca8b56fa5da04abfc3.jpg",
    price: "190000000",
    stock: 10,
    category: 'All Mountain'
}


describe('test POST Product', () =>{
    test('success test post product', (done) => {
    request(app)
    .post('/products')
    .send(inputProduct)
    .set('Accept', 'application/json')
    .set('access_token', access_token)
    .then(response => {
        const { status, body } = response
        id = body.id
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('name', expect.any(String))
        expect(body).toHaveProperty('image_url', expect.any(String))
        expect(body).toHaveProperty('price', expect.any(Number))
        expect(body).toHaveProperty('stock', expect.any(Number))
        expect(body).toHaveProperty('category', expect.any(String))
        done()
        })
    })
    
    test('failed to add product', (done) => {
        request(app)
        .post('/products')
        .send(inputProduct2)
        .set('NotAccept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
        
            const { status, body } = response 
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'input cant be empty')
            done()
        }) 
    })

    test('failed invalid access token', (done) => {
        request(app)
        .post('/products')
        .set('NotAccept', 'application/json')
        .send(inputProduct)
        .then(response => {
            const { status, body } = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'access token required')
            done()
        }) 
    })

    test('failed to add product', (done) => {
        request(app)
        .post('/products')
        .set('NotAccept', 'application/json')
        .set('access_token', access_token)
        .send(inputProduct)
        .then(response => {
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'input name not unique')
            done()
        }) 
    })
})


//listProduct
describe('Test GET Product', () =>{
    test('get all products',(done)=>{
        request(app)
        .get('/products')
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response =>{
            const {status, body } = response
            // console.log(response)
            expect(status).toBe(200)
            expect(body).toHaveProperty('products', expect.any(Object))
            done()
        })
    })

    test ('get one product', (done) => {
        request(app)
        .get(`/products/${id}`)
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            // console.log(response)
            const {status, body } = response
            // console.log(body)
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', expect.any(String))
            expect(body).toHaveProperty('image_url', expect.any(String))
            expect(body).toHaveProperty('price', expect.any(Number))
            expect(body).toHaveProperty('stock', expect.any(Number))
            expect(body).toHaveProperty('category', expect.any(String))
            done()
        })
    })

    test('failed data not found',(done) => {
        request(app)
        .get('/products')
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            const {status, body} = response 
            // expect(status).toBe(404)
            // expect(body).toHaveProperty('msg', 'Not Found')
            done()
        })
    })
})

describe('test PUT Product', () => {
    test('success edit product', (done) => {
    request(app)
    .put(`/products/${id}`)    
    .send(inputProduct)
    .set('Accept', 'application/json')
    .set('access_token', access_token)
    .then(response => {
        const { status,body } = response
        expect(status).toBe(201)
        done()
        })
    })
    
    test('test input null edit product', (done) => {
    request(app)
    .put(`/products/${id}`)
    .set('access_token', access_token)
    .send(inputProduct2)
    .set('NotAccept', 'application/json')
    .then(response => {
        const { status,body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'input cant be empty')
        done()
        })
    })
 
    test('test un authorized edit product', (done) => {
    request(app)
    .put('/products/:id')
    .set('NotAccept', 'application/json')
    .then(response => {
        const { status,body } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'access token required')
        done()
        })
    })
})


let inputPatch = {
    category : 'category baru'
}

describe('test PATCH Product', () => {
    test('success edit element product', (done) => {
        request(app)
        .patch(`/products/${id}`)
        .send(inputPatch)
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            const {status, body} = response
            console.log(body, "<<")
            expect(status).toBe(200)
            done()
        })
    })

    test('test failed data not found', (done) => {
        request(app)
        .patch('/products/22')
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            const { status, body } = response
            expect(status).toBe(404)
            expect(body).toHaveProperty('msg', 'Data Not Found')
            done()
        })
    })

    test('test failed unauthorized', (done) => {
        request(app)
        .patch(`/products/${id}`)
        .set('Accept', 'application/json')
        .then(response => {
            const { status, body } = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg','access token required')
            done()
        })
    })

})

describe('Test Delete Product', () =>{

    test('failed delete data not found', (done) => {
        request(app)
        .delete('/products/22')
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            const {status, body} = response
            expect(status).toBe(404)
            expect(body).toHaveProperty('msg', 'Data Not Found')
            done()
        }) 
    })

    test('failed delete unauthorized user', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .set('NotAccept', 'application/json')
        .then(response => {
            const {status, body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg','access token required')
            done()
        }) 
    })

        test('success deleted products', (done) => {
        request(app)
        .delete(`/products/${id}`)
        .set('Accept', 'application/json')
        .set('access_token', access_token)
        .then(response => {
            const {status, body} = response
            expect(status).toBe(200)
            done()
        }) 
    })

})