const request = require('supertest')
const app = require('../app.js')
const { User, Product } = require('../models/index.js')
const { signToken } = require('../helpers/jwt.js')

let access_token_admin 
let access_token_customer
let stock_id

const admin = {
    email: "admin@mail.com",
    password: "123456" 
}

const customer = {
    email: "customer@mail.com",
    password: "123456"
}

//beforeAll hooks untuk mendapat access_token_admin
beforeAll(done => {
    User.findOne({
        where:{
            email: admin.email
        }
    })
        .then(user => {
            const access_token = signToken({id:user.id, email: user.email})
            access_token_admin = access_token
            return User.create(customer)
        })
        .then(customer => {
            const access_token_cust = signToken({id:customer.id, email: customer.email})
            access_token_customer = access_token_cust
            done()

        })
        .catch(err => {
            done(err)
        })
})

let product_data = {
    name: "Adidas Yeezy",
    image_url: "https://static.shop.adidas.co.id/media/wysiwyg/sold_out/DESKTOP_YEEZY_QNTM_SOLD_OUT_1.jpg",
    price: 3000000,
    stock: 5
}

let update_product = {
    name: "Adidas Yeezy",
    image_url: "https://static.shop.adidas.co.id/media/wysiwyg/sold_out/DESKTOP_YEEZY_QNTM_SOLD_OUT_1.jpg",
    price: 3500000,
    stock: 10
}

describe('POST /stocks', () => {
    test('Create stocks successfully', done => {
        request(app)
        .post('/stocks')
        .send(product_data)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(201)
            expect(body).toHaveProperty('name', expect.any(String))
            expect(body).toHaveProperty('image_url', expect.any(String))
            expect(body).toHaveProperty('price', expect.any(Number))
            expect(body).toHaveProperty('stock', expect.any(Number))
            stock_id = body.id
            done()
        }) 
    })

    // Failed Cases
    test('Failed in creating stock because no access token was provided', done => {
        request(app)
        .post('/stocks')
        .send(product_data)
        .set("access_token", '')
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(401)
            expect(body).toHaveProperty('name', 'Unauthorized')
            expect(body).toHaveProperty('message', "Invalid access!")
            done()
        }) 
    })

    test('Failed in creating stock because access token did not belong to admin', done => {
        request(app)
        .post('/stocks')
        .send(product_data)
        .set("access_token", access_token_customer)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(403)
            expect(body).toHaveProperty('name', 'Forbidden')
            expect(body).toHaveProperty('message', "You do not have access!")
            done()
        }) 
    })

    test('Failed in creating stock because of empty name column', done => {
        let obj = {...product_data, name: ''}
        request(app)
        .post('/stocks')
        .send(obj)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', 'Bad Request')
            // expect(body).toHaveProperty('message', "You do not have access!")
            done()
        }) 
    })

    test('Failed in creating stock because of empty image url column', done => {
        let obj = {...product_data, image_url: ''}
        request(app)
        .post('/stocks')
        .send(obj)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', 'Bad Request')
            done()
        }) 
    })

    test('Failed in creating stock because of zero value on price column', done => {
        let obj = {...product_data, price: 0}
        request(app)
        .post('/stocks')
        .send(obj)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', 'Bad Request')
            done()
        }) 
    })

    test('Failed in creating stock because of negative value on stock column', done => {
        let obj = {...product_data, stock: -1}
        request(app)
        .post('/stocks')
        .send(obj)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', 'Bad Request')
            done()
        }) 
    })

    test('Failed in creating stock because of invalid format on price column', done => {
        let obj = {...product_data, price: "A"}
        request(app)
        .post('/stocks')
        .send(obj)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', 'Bad Request')
            done()
        }) 
    })

    test('Failed in creating stock because of invalid format on stock column', done => {
        let obj = {...product_data, stock: "A"}
        request(app)
        .post('/stocks')
        .send(obj)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', 'Bad Request')
            done()
        }) 
    })

})

describe('GET /stocks', () => {
    test('Read stocks successfully', done => {
        request(app)
        .get('/stocks')
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(200)
            // expect(body).toBeArray()
            done()
        }) 
    })

    // Failed cases
    test('Failed in reading stock because no access token was provided', done => {
        request(app)
        .get('/stocks')
        .set("access_token", '')
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(401)
            expect(body).toHaveProperty('name', 'Unauthorized')
            expect(body).toHaveProperty('message', "Invalid access!")
            done()
        }) 
    })

    test('Failed in reading stock because access token did not belong to admin', done => {
        request(app)
        .get('/stocks')
        .set("access_token", access_token_customer)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(403)
            expect(body).toHaveProperty('name', 'Forbidden')
            expect(body).toHaveProperty('message', "You do not have access!")
            done()
        }) 
    })
})

describe('PUT /stocks/:id', () => {
    test('Update stocks successfully', done => {
        request(app)
        .put(`/stocks/${stock_id}`)
        .send(update_product)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'A Product has been updated.')
            done()
        }) 
    })

    // Failed Cases
    test('Failed in updating stock because no access token was provided', done => {
        request(app)
        .put(`/stocks/${stock_id}`)
        .send(update_product)
        .set("access_token", '')
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(401)
            expect(body).toHaveProperty('name', 'Unauthorized')
            expect(body).toHaveProperty('message', "Invalid access!")
            done()
        }) 
    })

    test('Failed in updating stock because access token did not belong to admin', done => {
        request(app)
        .put(`/stocks/${stock_id}`)
        .send(update_product)
        .set("access_token", access_token_customer)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(403)
            expect(body).toHaveProperty('name', 'Forbidden')
            expect(body).toHaveProperty('message', "You do not have access!")
            done()
        }) 
    })

    test('Failed in updating stock because of empty name column', done => {
        let obj = {...update_product, name: ''}
        request(app)
        .put(`/stocks/${stock_id}`)
        .send(obj)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', 'Bad Request')
            // expect(body).toHaveProperty('message', "You do not have access!")
            done()
        }) 
    })

    test('Failed in updating stock because of empty image url column', done => {
        let obj = {...update_product, image_url: ''}
        request(app)
        .put(`/stocks/${stock_id}`)
        .send(obj)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', 'Bad Request')
            done()
        }) 
    })

    test('Failed in updating stock because of zero value on price column', done => {
        let obj = {...update_product, price: 0}
        request(app)
        .put(`/stocks/${stock_id}`)
        .send(obj)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', 'Bad Request')
            done()
        }) 
    })

    test('Failed in updating stock because of negative value on stock column', done => {
        let obj = {...update_product, stock: -1}
        request(app)
        .put(`/stocks/${stock_id}`)
        .send(obj)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', 'Bad Request')
            done()
        }) 
    })

    test('Failed in updating stock because of invalid format on price column', done => {
        let obj = {...update_product, price: "A"}
        request(app)
        .put(`/stocks/${stock_id}`)
        .send(obj)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', 'Bad Request')
            done()
        }) 
    })

    test('Failed in updating stock because of invalid format on stock column', done => {
        let obj = {...update_product, stock: "A"}
        request(app)
        .put(`/stocks/${stock_id}`)
        .send(obj)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', 'Bad Request')
            done()
        }) 
    })

})

describe('Delete /stocks/:id', () => {
    test('Delete stocks successfully', done => {
        request(app)
        .delete(`/stocks/${stock_id}`)
        .set("access_token", access_token_admin)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(200)
            expect(body).toHaveProperty('message', 'A Product has been deleted.')
            done()
        }) 
    })

    test('Failed in deleting stock because no access token was provided', done => {
        request(app)
        .delete(`/stocks/${stock_id}`)
        .set("access_token", '')
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(401)
            expect(body).toHaveProperty('name', 'Unauthorized')
            expect(body).toHaveProperty('message', "Invalid access!")
            done()
        }) 
    })

    test('Failed in deleting stock because access token did not belong to admin', done => {
        request(app)
        .delete(`/stocks/${stock_id}`)
        .set("access_token", access_token_customer)
        .then(response => {
            const {status, body} = response
            console.log(body)
            expect(status).toBe(403)
            expect(body).toHaveProperty('name', 'Forbidden')
            expect(body).toHaveProperty('message', "You do not have access!")
            done()
        }) 
    })
})

// afterAll hook untuk menghapus data di tabel Products
afterAll(done => {
    Product.destroy({truncate: true})
        .then(data => {
            return User.destroy({
                where: {
                    role: 'customer'
                }
            })
        })
        .then(user => {
            done()
        })
        .catch(err => {
            done(err)
        })
})