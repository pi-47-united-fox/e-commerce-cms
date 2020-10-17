const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User } = require('../models')
const { signToken } = require('../helpers/jwt')

let access_token = ''

let newProduct1 = {
    "id": 1,
    "name": "Goalkeeper",
    "image_url": "https://ae01.alicdn.com/kf/HTB1P2GlSXXXXXbEapXXq6xXFXXXT/24cm-Height-Soccer-Football-Resin-Goalkeeper-Gloves-De-Golden-Award-World-Cup-Trophy-Goalkeeper-Award-Fans.jpg_640x640.jpg",
    "price": 130000000,
    "stock": 2,
    "category": "Key Player"
}
beforeAll((done) => {
    User.findOne({
        where: {
            email: "admin@jmail.com"
        }
    })
        .then((data) => {
            access_token = signToken({id: data.id,email:data.email})
            done()
        })
        .catch((err) => {
            console.log(err)
            done()
        })
})
describe('Testing Product',()=>{
    test('Successfully Add Product', (done)=>{
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(newProduct1)
        .set('Accept', 'application/json')
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(201)
            idUpdate = body.id
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', newProduct1.name)
            expect(body).toHaveProperty('image_url',newProduct1.image_url)
            expect(body).toHaveProperty('price', newProduct1.price)
            expect(body).toHaveProperty('stock', newProduct1.stock)
            expect(body).toHaveProperty('category', newProduct1.category)
            done()
        })
    })
    test('Successfully Fetch All Product', (done)=>{
        request(app)
        .get('/products')
        .set('access_token', access_token)
        .set('Accept', 'application/json')
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(200)
            expect(body[0].id).toStrictEqual(expect.any(Number))
            expect(body[0].name).toBe(newProduct1.name)
            expect(body[0].image_url).toBe(newProduct1.image_url)
            expect(body[0].price).toBe(newProduct1.price)
            expect(body[0].stock).toBe(newProduct1.stock)
            expect(body[0].category).toBe(newProduct1.category)
            done()
        })
    })


    test('Successfully Put Product', (done)=>{
        const productUpdate = {
            "id": 39,
            "name": "Goalkeeper",
            "image_url": "https://ae01.alicdn.com/kf/HTB1P2GlSXXXXXbEapXXq6xXFXXXT/24cm-Height-Soccer-Football-Resin-Goalkeeper-Gloves-De-Golden-Award-World-Cup-Trophy-Goalkeeper-Award-Fans.jpg_640x640.jpg",
            "price": 130000000,
            "stock": 2,
            "category": "Key Player"
        }
        request(app)
        .put(`/products/${productUpdate.id}`)
        .set('access_token', access_token)
        .send(productUpdate)
        .set('Accept', 'application/json')
        request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(newProduct1)
        .set('Accept', 'application/json')
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', productUpdate.name)
            expect(body).toHaveProperty('image_url', productUpdate.image_url)
            expect(body).toHaveProperty('price', productUpdate.price)
            expect(body).toHaveProperty('stock', productUpdate.stock)
            expect(body).toHaveProperty('category', productUpdate.category)
            done()
        })
    })
})



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
