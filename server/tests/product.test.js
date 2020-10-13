const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const { User,Product } = require('../models')
const bcryptjs = require('bcryptjs')


let id
let admin_access_token
let customer_access_token


beforeAll((done)=>{
    User.findOne({where:{email:'admin@mail.com'}})
        .then((result)=>{
            admin_access_token = signToken({id:result.id,email:result.email,role:result.role})
            return User.create(
                {
                    email:'customer@mail.com',
                    password:bcryptjs.hashSync('1234',10),
                    role:'customer',
                })
        })
        .then((result2)=>{
            customer_access_token = signToken({id:result2.id,email:result2.email,role:result2.role}) 
            return done()
        })
        .catch(err=>{
            return done(err)
        })
})

afterAll((done)=>{
    User.destroy({where:{email:'customer@mail.com'}})
        .then(()=>{
            return Product.destroy({truncate:true})
        })
        .then(()=>{
            return done()
        })
        .catch(err=>{
            return done(err)
        })
})


let product = {
    name:'E-Bike H2L Black - 2 speed',
    image_url:'https://www-checkout.brompton.com/pub/media/catalog/product/e/b/ebike-h-type-l-version-black-sp6-1.jpg',
    price:49305804,
    stock:1
}




describe('test POST /product', ()=>{
    describe('Success add product', ()=>{
        test('should get status code 201 and send data array of object to db', (done)=>{
            request(app)
            .post('/product')
            .send(product)
            .set('access_token', admin_access_token)
            .then(response=>{
                const { status , body } = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', expect.any(String))
                expect(body).toHaveProperty('image_url', expect.any(String))
                expect(body).toHaveProperty('price', expect.any(Number))
                expect(body).toHaveProperty('stock', expect.any(Number))
                id = body.id
                return done()
            })
            .catch(err=>{
                return done(err)
            })
        })
    })

    describe('Fail add Product', ()=>{
        describe('invalid authentication add product',()=>{
            test('empty access_token', (done)=>{
                request(app)
                .post('/product')
                // .set('access_token','')
                .send(product)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'login first')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            }) 
        })

        describe('invalid authorization add product',()=>{
            test('empty access_token', (done)=>{
                request(app)
                .post('/product')
                .set('access_token',customer_access_token)
                .send(product)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'Not Authorized')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            }) 
        })


        describe('Field cannot be empty', ()=>{
            // name empty test
            test('name empty field', (done)=>{
                let emptyName = {...product,name:''}
                request(app)
                .post('/product')
                .send(emptyName)
                .set('access_token', admin_access_token)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'name cannot be empty')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            })
            // image url empty test
            test('image_url empty field', (done)=>{
                let imageurlEmpty = {...product,image_url:''}
                request(app)
                .post('/product')
                .send(imageurlEmpty)
                .set('access_token', admin_access_token)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'image_url cannot be empty')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            })
             // price empty test
             test('price empty field', (done)=>{
                let priceEmpty = {...product,price:''}
                request(app)
                .post('/product')
                .send(priceEmpty)
                .set('access_token', admin_access_token)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'price cannot be empty')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            })
            // stock empty test
            test('stock empty field', (done)=>{
                let stockEmpty = {...product,stock:''}
                request(app)
                .post('/product')
                .send(stockEmpty)
                .set('access_token', admin_access_token)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'stock cannot be empty')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            })
        })

        describe('Price and Stock must be greater or equal 1', ()=>{
            // price less than 1 test
            test('Price less than 1', (done)=>{
                let invalidPrice = {...product,price:0}
                request(app)
                .post('/product')
                .send(invalidPrice)
                .set('access_token', admin_access_token)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'price must be greater than 1')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            })
            // stock less than 1 test
            test('Stock less than 1', (done)=>{
                let invalidStock = {...product,stock:0}
                request(app)
                .post('/product')
                .send(invalidStock)
                .set('access_token', admin_access_token)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'stock must be greater than 1')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            })
        })

    })
})


describe('test GET /product', ()=>{
    // success get product
    describe('Success get all product',()=>{
        test('should get array of object with status code 200',(done)=>{
            request(app)
            .get('/product')
            .set('access_token', admin_access_token)
            .then(response=>{
                const { status , body } = response
                expect(status).toBe(200)
                expect(body).toBeTruthy()
                return done()
            })
            .catch(err=>{
                done(err)
            })
        })
    })
    // fail get product
    describe('Fail get all product', ()=>{
        describe('invalid authentication get product',()=>{
            test('empty access_token', (done)=>{
                request(app)
                .get('/product')
                // .set('','')
                .send(product)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message',  'login first')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            }) 
        })
    })
})


describe('test PUT /product/:id', ()=>{
    describe('Success Updated data', ()=>{
        test('Update Successfully with status 200', (done)=>{
            let updatedProduct = {...product,price:12000000,stock:10}
            request(app)
            .put(`/product/${id}`)
            .set('access_token', admin_access_token)
            .send(updatedProduct)
            .then(response=>{
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message','success update product')
                expect(body).not.toBeFalsy()
                return done()
            })
            .catch(err=>{
                return done(err)
            })
        })
    })

    describe('Fail update Product', ()=>{
        describe('invalid authentication update product',()=>{
            test('empty access_token', (done)=>{
                request(app)
                .put(`/product/${id}`)
                .send(product)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'login first')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            }) 
        })

        describe('invalid authorization update product',()=>{
            test('empty access_token', (done)=>{
                request(app)
                .put(`/product/${id}`)
                .set('access_token',customer_access_token)
                .send(product)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'Not Authorized')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            }) 
        })

        describe('Field cannot be empty', ()=>{
            // name empty test
            test('name empty field', (done)=>{
                let emptyName = {...product,name:''}
                request(app)
                .put(`/product/${id}`)
                .send(emptyName)
                .set('access_token', admin_access_token)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'name cannot be empty')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            })
            // image url empty test
            test('image_url empty field', (done)=>{
                let imageurlEmpty = {...product,image_url:''}
                request(app)
                .put(`/product/${id}`)
                .send(imageurlEmpty)
                .set('access_token', admin_access_token)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'image_url cannot be empty')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            })
             // price empty test
             test('price empty field', (done)=>{
                let priceEmpty = {...product,price:''}
                request(app)
                .put(`/product/${id}`)
                .send(priceEmpty)
                .set('access_token', admin_access_token)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'price cannot be empty')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            })
            // stock empty test
            test('stock empty field', (done)=>{
                let stockEmpty = {...product,stock:''}
                request(app)
                .put(`/product/${id}`)
                .send(stockEmpty)
                .set('access_token', admin_access_token)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'stock cannot be empty')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            })
        })

        describe('Price and Stock must be greater or equal 1', ()=>{
            // price less than 1 test
            test('Price less than 1', (done)=>{
                let invalidPrice = {...product,price:0}
                request(app)
                .put(`/product/${id}`)
                .send(invalidPrice)
                .set('access_token', admin_access_token)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'price must be greater than 1')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            })
            // stock less than 1 test
            test('Stock less than 1', (done)=>{
                let invalidStock = {...product,stock:0}
                request(app)
                .put(`/product/${id}`)
                .send(invalidStock)
                .set('access_token', admin_access_token)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'stock must be greater than 1')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            })
        })
    })

    describe('product not found/invalid id on update', ()=>{
        test('id invalid/product not found on update',(done)=>{
            const invalidId = -1
            request(app)
            .delete(`/product/${invalidId}`)
            .set('access_token',customer_access_token)
            .send(product)
            .then(response=>{
                const { status , body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Not Authorized')
                return done()
            })
            .catch(err=>{
                return done(err)
            })
        })
    })
})


describe('test DELETE /product/:id', ()=>{
    describe('Success Delete data', ()=>{
        test('Delete Successfully with status 200', (done)=>{
            request(app)
            .delete(`/product/${id}`)
            .set('access_token', admin_access_token)
            .then(response=>{
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message',`delete task id = ${id} successfully`)
                return done()
            })
            .catch(err=>{
                return done(err)
            })
        })
    })
    describe('Fail Delete Product', ()=>{
        describe('invalid authentication delete product',()=>{
            test('empty access_token', (done)=>{
                request(app)
                .delete(`/product/${id}`)
                .send(product)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'login first')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            }) 
        })

        describe('invalid authorization delete product',()=>{
            test('empty access_token', (done)=>{
                request(app)
                .delete(`/product/${id}`)
                .set('access_token',customer_access_token)
                .send(product)
                .then(response=>{
                    const { status , body } = response
                    expect(status).toBe(401)
                    expect(body).toHaveProperty('message', 'Not Authorized')
                    return done()
                })
                .catch(err=>{
                    return done(err)
                })
            }) 
        })
    })

    describe('product not found/invalid id on delete', ()=>{
        test('id invalid/product not found on delete',(done)=>{
            const invalidId = -1
            request(app)
            .delete(`/product/${invalidId}`)
            .set('access_token',customer_access_token)
            .send(product)
            .then(response=>{
                const { status , body } = response
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Not Authorized')
                return done()
            })
            .catch(err=>{
                return done(err)
            })
        })
    })

})