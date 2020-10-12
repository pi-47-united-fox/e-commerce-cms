const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

let token


beforeAll((done) =>{
    const userData = {
        email: 'admin@mail.com',
        password: '1234',
    }
    request(app)
    .post('/login')
    .send(userData)
    .set('Accept', 'application/json')
    .end((err,response)=>{
        token = response.body.access_token
        done()
    })
})




const obj = {
    name: 'carvil bag',
    image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
    price: 100000,
    stock: 50,
    category: 'fashion'
}

let idUpdate 

describe('Testing Product',()=>{
    test('Successfully Add Product', (done)=>{
        request(app)
        .post('/product')
        .set('Authorization', `Bearer ${token}`)
        .send(obj)
        .set('Accept', 'application/json')
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(201)
            //console.log(body)
            idUpdate = body.id
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', obj.name)
            expect(body).toHaveProperty('image_url', obj.image_url)
            expect(body).toHaveProperty('price', obj.price)
            expect(body).toHaveProperty('stock', obj.stock)
            expect(body).toHaveProperty('category', obj.category)
            done()
        })
    })

    

    test('Successfully Fetch All Product', (done)=>{
        request(app)
        .get('/product')
        .set('Accept', 'application/json')
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(200)
            expect(body[0].id).toStrictEqual(expect.any(Number))
            expect(body[0].name).toBe(obj.name)
            expect(body[0].image_url).toBe(obj.image_url)
            expect(body[0].price).toBe(obj.price)
            expect(body[0].stock).toBe(obj.stock)
            expect(body[0].category).toBe(obj.category)
            done()
        })
    })


    test('Successfully Put Product', (done)=>{
        const objUpdate = {
            name: 'carvil tas',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 50000,
            stock: 10,
            category: 'fashion'
        }
        //console.log(idUpdate)
        request(app)
        .put(`/product/${idUpdate}`)
        .set('Authorization', `Bearer ${token}`)
        .send(objUpdate)
        .set('Accept', 'application/json')
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('id', expect.any(Number))
            expect(body).toHaveProperty('name', objUpdate.name)
            expect(body).toHaveProperty('image_url', objUpdate.image_url)
            expect(body).toHaveProperty('price', objUpdate.price)
            expect(body).toHaveProperty('stock', objUpdate.stock)
            expect(body).toHaveProperty('category', objUpdate.category)
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
