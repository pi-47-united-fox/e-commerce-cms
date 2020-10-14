const request = require("supertest")
const app = require("../app")
const {sequelize} = require("../models")
const {queryInterface} = sequelize
const {sign} = require("../helpers/jwt")

const userData = {
    id:1,
    email:"admin@mail.com",
    role:"admin"
}
let access_token
let productId = 19


beforeAll((done) => {
    access_token = sign(userData)
    console.log(access_token);
    done()
})

// afterAll((done) => {
//     queryInterface.bulkDelete('Products')
//     .then(() => {
//         done()
//     })
//     .catch(err => {
//         console.log(err)
//         done()
//     })
// })

const productData = {
    name: "sepatu",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRT49_FYIGSIqnhCutkAlxyXg9_tvnGxyZV-A&usqp=CAU",
    price: 300000,
    stock: 100
}

const productData2 = {
    name: "sepatu",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRT49_FYIGSIqnhCutkAlxyXg9_tvnGxyZV-A&usqp=CAU",
    price: 300000,
    stock: 50
}

describe('Testing CRUD Product', () => {
    it('Create Product', (done) => {
        request(app)
        .post('/product')
        .send(productData)
        .set('access_token', access_token) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('name', productData.name)
            expect(body).toHaveProperty('image_url', productData.image_url)
            expect(body).toHaveProperty('price', productData.price)
            expect(body).toHaveProperty('stock', productData.stock)
            productId = body.id
            done()
        })
    }) 
    it('Read Products', (done) => {
        request(app)
        .get('/products') 
        .set('access_token', access_token) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(200)
            // console.log(body); 
            expect(body[0]).toHaveProperty('name', productData.name)
            expect(body[0]).toHaveProperty('image_url', productData.image_url)
            expect(body[0]).toHaveProperty('price', productData.price)
            expect(body[0]).toHaveProperty('stock', productData.stock)
            done()
        })
    })
})

describe.only('Update Product',()=>{
    it('Update Products', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .send(productData2)
        .set('access_token', access_token) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(200)
            console.log(body); 
            expect(body).toHaveProperty('messsage', 'Updated Successfully') 
            done()
        })
    }) 
})

describe('Delete Product',()=>{ 
    it('Should Delete Successfully', (done) => {
        request(app)
        .delete(`/product${productId}`)
        .send(productData2)
        .set('access_token', access_token) 
        .then(response => { 
            const {status, body} = response
            expect(status).toBe(200)
            // console.log(body); 
            expect(body).toHaveProperty('messsage', 'Deleted Successfully') 
            done()
        })
    })
})