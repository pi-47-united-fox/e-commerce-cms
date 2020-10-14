const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User } = require('../models/index')
const Helper = require('../helper/helper')


let access_token
let customer_access_token


beforeAll((done) => {
    const userData = {
        email: 'admin@mail.com',
        password: '1234',
        role: 'admin'
    }
    User.findOne({
        where: {
            email: userData.email
        }
    })
        .then(response => {
            let data_admin = {
                id: response.id,
                email: response.email,
                role: response.role
            }
            access_token = Helper.signToken(data_admin);
            const userData2 = {
                email: 'customer@mail.com',
                password: '1234',
                role: 'customer'
            }
            return User.findOne({
                where: {
                    email: userData2.email
                }
            })
        })
        .then((response) => {
            let data_customer = {
                id: response.id,
                email: response.email,
                role: response.role
            }
            customer_access_token = Helper.signToken(data_customer);
            // console.log(access_token)
            // console.log(customer_access_token)
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

describe('Testing Product', () => {
    test('Successfully Add Product', (done) => {
        request(app)
            .post('/product')
            .set('access_token', access_token)
            .send(obj)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
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

    test("Failed Add Data, Dont Have Access Token", done => {
        const obj = {
            name: 'carvil bag',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 100000,
            stock: 10,
            category: 'fashion'
        }
        request(app)
            .post('/product')
            .set('Accept', 'application/json')
            .send(obj)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', "You are not authenticated")
                done()
            })
    })

    test("Failed Add Data, Image URL is Empty", done => {
        const obj = {
            name: 'carvil bag',
            image_url: '',
            price: 100000,
            stock: 10,
            category: 'fashion'
        }
        request(app)
            .post('/product')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', "Image URL Can't Empty")
                done()
            })
    })

    test("Failed Add Data, Image URL is not URL Format", done => {
        const obj = {
            name: 'carvil bag',
            image_url: 'aaaaa',
            price: 100000,
            stock: 10,
            category: 'fashion'
        }
        request(app)
            .post('/product')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', "Must Be URL Format")
                done()
            })
    })

    test("Failed Add Data, Not Admin's Access Token", (done) => {
        const obj = {
            name: 'carvil bag',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 100000,
            stock: 10,
            category: 'fashion'
        }
        request(app)
            .post('/product')
            .set('Accept', 'application/json')
            .set('access_token', customer_access_token)
            .send(obj)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(403)
                expect(body).toHaveProperty('message', "You do not have access!")
                done()
            })
    })

    test("Failed Add Data, price stock is not higher than 0", (done) => {
        const obj = {
            name: 'carvil bag',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 100000,
            stock: 0,
            category: 'fashion'
        }
        request(app)
            .post('/product')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                //console.log(access_token)
                const { status, body } = response
                expect(status).toBe(400)
                console.log(body.message)
                expect(body).toHaveProperty('message', "Validation min on stock failed")
                done()
            })
    })

    test("Failed Add Data, Category is empty", (done) => {
        const obj = {
            name: 'carvil bag',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 100000,
            stock: 10,
            category: ''
        }
        request(app)
            .post('/product')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                //console.log(access_token)
                const { status, body } = response
                expect(status).toBe(400)
                console.log(body.message)
                expect(body).toHaveProperty('message', "Category Can't Empty")
                done()
            })
    })

    test("Failed Add Data, Name's Character is not more than 2", (done) => {
        const obj = {
            name: 'aa',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 100000,
            stock: 10,
            category: 'fashion'
        }
        request(app)
            .post('/product')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                //console.log(access_token)
                const { status, body } = response
                expect(status).toBe(400)
                console.log(body.message)
                expect(body).toHaveProperty('message', "Character Must Be greater then 2")
                done()
            })
    })

    test("Failed Add Data, price stock is not higher than 100", (done) => {
        const obj = {
            name: 'carvil bag',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 10,
            stock: 5,
            category: 'fashion'
        }
        request(app)
            .post('/product')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                //console.log(access_token)
                const { status, body } = response
                expect(status).toBe(400)
                console.log(body.message)
                expect(body).toHaveProperty('message', "Validation min on price failed")
                done()
            })
    })

    test("Failed Add Data, name is empty", (done) => {
        const obj = {
            name: '',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 100000,
            stock: 10,
            category: 'fashion'
        }
        request(app)
            .post('/product')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', "Name Can't Empty")
                //console.log(body.message)
                done()
            })
    })

    test("Failed Add Data, price fill with string", (done) => {
        const obj = {
            name: 'carvil bag',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 'angka',
            stock: 10,
            category: 'fashion'
        }
        request(app)
            .post('/product')
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', "Must be an integer number")
                done()
            })
    })





    test('Successfully Fetch All Product', (done) => {
        request(app)
            .get('/product')
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
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


    test('Successfully Put Product', (done) => {
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
            .set('access_token', access_token)
            .send(objUpdate)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
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

    test('Failed Put Product,Dont Have Access Token', (done) => {
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
            .send(objUpdate)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', "You are not authenticated")
                done()
            })
    })

    test('Failed Put Product,Not An Admin Token', (done) => {
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
            .send(objUpdate)
            .set('Accept', 'application/json')
            .set('access_token', customer_access_token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(403)
                expect(body).toHaveProperty('message', "You do not have access!")
                done()
            })
    })

    test("Failed Put Data, Image URL is Empty", done => {
        const obj = {
            name: 'carvil tas',
            image_url: '',
            price: 50000,
            stock: 10,
            category: 'fashion'
        }
        request(app)
            .put(`/product/${idUpdate}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', "Image URL Can't Empty")
                done()
            })
    })

    test("Failed Put Data, Image URL is not URL Format", done => {
        const obj = {
            name: 'carvil tas',
            image_url: 'aaaaa',
            price: 50000,
            stock: 10,
            category: 'fashion'
        }
        request(app)
            .put(`/product/${idUpdate}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', "Must Be URL Format")
                done()
            })
    })

    test("Failed Put Data, Category is empty", (done) => {
        const obj = {
            name: 'carvil bag',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 100000,
            stock: 10,
            category: ''
        }
        request(app)
            .put(`/product/${idUpdate}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                //console.log(access_token)
                const { status, body } = response
                expect(status).toBe(400)
                console.log(body.message)
                expect(body).toHaveProperty('message', "Category Can't Empty")
                done()
            })
    })

    test("Failed Put Data, price stock is not higher than 0", (done) => {
        const obj = {
            name: 'carvil bag',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 100000,
            stock: 0,
            category: 'fashion'
        }
        request(app)
            .put(`/product/${idUpdate}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                //console.log(access_token)
                const { status, body } = response
                expect(status).toBe(400)
                console.log(body.message)
                expect(body).toHaveProperty('message', "Validation min on stock failed")
                done()
            })
    })

    test("Failed Put Data, price stock is not higher than 100", (done) => {
        const obj = {
            name: 'carvil bag',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 10,
            stock: 5,
            category: 'fashion'
        }
        request(app)
            .put(`/product/${idUpdate}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .send(obj)
            .then(response => {
                //console.log(access_token)
                const { status, body } = response
                expect(status).toBe(400)
                console.log(body.message)
                expect(body).toHaveProperty('message', "Validation min on price failed")
                done()
            })
    })

    test('Failed Put Product,stock field filled with minus number', (done) => {
        const objUpdate = {
            name: 'carvil tas',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 50000,
            stock: -1,
            category: 'fashion'
        }
        //console.log(idUpdate)
        request(app)
            .put(`/product/${idUpdate}`)
            .send(objUpdate)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', body.message)
                done()
            })
    })

    test('Failed Put Product,stock field filled with string', (done) => {
        const objUpdate = {
            name: 'carvil tas',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: 50000,
            stock: 'angka',
            category: 'fashion'
        }
        //console.log(idUpdate)
        request(app)
            .put(`/product/${idUpdate}`)
            .send(objUpdate)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', "Must be an integer number")
                done()
            })
    })

    test('Failed Put Product,price field filled with minus number', (done) => {
        const objUpdate = {
            name: 'carvil tas',
            image_url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/18/batch-upload/batch-upload_bd784ea6-18d2-4efa-9882-78ab2306a3d7.jpeg',
            price: -1,
            stock: 15,
            category: 'fashion'
        }
        //console.log(idUpdate)
        request(app)
            .put(`/product/${idUpdate}`)
            .send(objUpdate)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', "Validation min on price failed")
                done()
            })
    })

    test('Delete Successfully', (done) => {
        //console.log(idUpdate)
        request(app)
            .delete(`/product/${idUpdate}`)
            .set('Accept', 'application/json')
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', "Product success to delete")
                done()
            })
    })

    test('Delete Failed, Dont Have Access Token', (done) => {
        //console.log(idUpdate)
        request(app)
            .delete(`/product/${idUpdate}`)
            .set('Accept', 'application/json')
            .then(response => {
                const { status, body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', "You are not authenticated")
                done()
            })
    })

    test('Delete Failed, Not An Admin Access Token', (done) => {
        //console.log(idUpdate)
        request(app)
            .delete(`/product/${idUpdate}`)
            .set('Accept', 'application/json')
            .set('access_token', customer_access_token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(403)
                expect(body).toHaveProperty('message', "You do not have access!")
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
            //console.log(err)
            done()
        })
})
