const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

let id
let access_token
let access_token_invalid = ''

beforeAll((done)=> {
    const userData = {
        email: 'admin@mail.com',
        password: '1234'
    }
    request(app)
    .post('/users/login')
    .send(userData)
    .set('Accept', 'application/json')
    .end((err, response) => {
        access_token = response.body.access_token
        done()
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Products')
    .then(()=> {
        done()
    })
    .catch(err => {
        console.log(err)
        done()
    })
})

let productData = {
    name: 'keyboard',
    image_url: 'https://www.goodgamingshop.com/wp-content/uploads/2019/10/14100407_71c5c640-9b84-43bf-b159-34b418https://d2pa5gi5n2e1an.cloudfront.net/webp/id/images/article/8771_ID/summary.jpg2c4762_2048_2048.jpg',
    price: 2000000,
    stock: 10
}
let productDataPut = {
    name: 'keyboard',
    image_url: 'https://www.goodgamingshop.com/wp-content/uploads/2019/10/14100407_71c5c640-9b84-43bf-b159-34b418https://d2pa5gi5n2e1an.cloudfront.net/webp/id/images/article/8771_ID/summary.jpg2c4762_2048_2048.jpg',
    price: 2000000,
    stock: 9
}

describe('Testing /postProduct', () => {

    describe('Success case /postProduct', () => {
        test('Successfully Add Product', (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(productData)
            .set('Accept', 'application/json')
            .then(response => {
                // console.log(response);
                const {status,body} = response
                // console.log(body);
                expect(status).toBe(201)
                id = body.id
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', productData.name)
                expect(body).toHaveProperty('image_url', productData.image_url)
                expect(body).toHaveProperty('price', productData.price)
                expect(body).toHaveProperty('stock', productData.stock)
                done()
            })
        })
    })

    describe('Failed case /postProduct', () => {
        test('Validation Error Empty Name', (done) => {
            var productDataEmptyName = {
                ...productData, name: ''
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(productDataEmptyName)
            .set('Accept', 'application/json')
            .then(response => {
                // console.log(response);
                const {status,body} = response
                // console.log(body);
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Empty Image_Url', (done) => {
            var productDataEmptyImage = {
                ...productData, image_url: ''
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(productDataEmptyImage)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Price less Than Equal to 0', (done) => {
            var productDataLessPrice = {
                ...productData, price: 0
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(productDataLessPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Empty Price', (done) => {
            var productDataEmptyPrice = {
                ...productData, price: ''
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(productDataEmptyPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Invalid Price', (done) => {
            var productDataInvalidPrice = {
                ...productData, price: 'a'
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(productDataInvalidPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Stock Less Than 0', (done) => {
            var productDataLessStock = {
                ...productData, stock: -1
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(productDataLessStock)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Invalid Stock', (done) => {
            var productDataInvalidStock = {
                ...productData, stock: 'a'
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(productDataInvalidStock)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('User Not Authenticated', (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token_invalid)
            .send(productData)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(401)
                done()
            })
        })
    })
})

describe('Testing /getProduct', () => {

    describe('Success Case /getProduct', () => {
        test('Should send array of object with Status Code 200', (done) => {
            request(app)
            .get('/products')
            .set('access_token', access_token)
            .send(productData)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body[0]).toHaveProperty('id', expect.any(Number))
                expect(body[0]).toHaveProperty('name', productData.name)
                expect(body[0]).toHaveProperty('image_url', productData.image_url)
                expect(body[0]).toHaveProperty('price', productData.price)
                expect(body[0]).toHaveProperty('stock', productData.stock)
                done()
            })
        })
    })

    describe('Failed Case /getProduct', () => {
        test('User Not Authenticated', (done) => {
            request(app)
            .get('/products')
            .set('access_token', access_token_invalid)
            .send(productData)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                done()
            })
        })
    })
})

describe('Testing /putProduct', () => {
    
    describe('Success Case /putProduct', () => {
        test('Successfully Update Product', (done) => {
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(productDataPut)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('message', 'Edit Successfully')
                done()
            })
        })
    })

    describe('Failed Case /putProduct', () => {
        test('Validation Error Put Empty Name', (done) => {
            var productDataPutEmptyName = {
                ...productDataPut, name: ''
            }
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(productDataPutEmptyName)
            .set('Accept', 'application/json')
            .then(response => {
                // console.log(response);
                const {status,body} = response
                // console.log(body);
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Empty Image_Url', (done) => {
            var productDataPutEmptyImage = {
                ...productDataPut, image_url: ''
            }
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(productDataPutEmptyImage)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Price less Than 0', (done) => {
            var productDataPutLessPrice = {
                ...productData, price: -1
            }
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(productDataPutLessPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Invalid Price', (done) => {
            var productDataPutInvalidPrice = {
                ...productData, price: 'a'
            }
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(productDataPutInvalidPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Stock Less Than 0', (done) => {
            var productDataPutLessStock = {
                ...productData, stock: -1
            }
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(productDataPutLessStock)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Invalid Stock', (done) => {
            var productDataPutInvalidStock = {
                ...productData, stock: 'a'
            }
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(productDataPutInvalidStock)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Invalid Id Product', (done) => {
            let id = 0
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(productData)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(404)
                done()
            })
        })
        test('User Unauthorized to Update Data', (done) => {
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token_invalid)
            .send(productData)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(401)
                done()
            })
        })
    })
})

describe('Testing /deleteProduct', () => {
    describe('Success Case /deleteProduct', () => {
        test('Successfully Delete Product', (done) => {
            request(app)
            .delete(`/products/${id}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Product Deleted')
                done()
            })
        })
    })
    describe('Failed Case /deleteProduct', () => {
        test('Delete Product User Unauthorized', (done) => {
            request(app)
            .delete(`/products/${id}`)
            .set('access_token', access_token_invalid)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                done()
            })
        })
        test('Delete Product Invalid Id', (done) => {
            let id = 0
            request(app)
            .delete(`/products/${id}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(404)
                done()
            })
        })
    })
})
