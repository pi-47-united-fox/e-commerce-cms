const request = require("supertest")
const app = require("../app")
const { decodeToken } = require("../helpers/jwt")

let access_token = ''

let userData = decodeToken(access_token)

let newProduct = {
    name: 'xbox s',
    image_url: 'google.com',
    price: 3000000,
    stock: 7
}

describe('View all products', () => {
    test('Successfully view all products', () => {
        request(app)
            .get('/tasks')
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toBe('application/json')
                if(response.body.length > 0) {
                    expect(body[0]).toHaveProperty('id', expect.any(Number))
                    expect(body[0]).toHaveProperty('name', expect.any(String))
                    expect(body[0]).toHaveProperty('image_url', expect.any(String))
                    expect(body[0]).toHaveProperty('price', expect.any(Number))
                    expect(body[0]).toHaveProperty('stock', expect.any(Number))
                    expect(body[0]).toHaveProperty('createdAt', expect.any(Date))
                    expect(body[0]).toHaveProperty('updatedAt', expect.any(Date))
                }
            })
    })

    test('Add a product', () => {
        request(app)
            .post('/tasks')
            .set('access_token', access_token)
            .send(newProduct)
            .then(response => {
                const { status, body } = response
                expect(status).toBe(200)
                expect(body).toBe('application/json')
            })
    })
})