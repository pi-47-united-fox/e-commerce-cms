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
let productId


beforeAll((done) => {
    access_token = sign(userData)
    console.log(access_token);
    // queryInterface.bulkDelete('Products')
    // .then(() => {
    //     done()
    // })
    // .catch(err => {
    //     console.log(err)
    //     done()
    // })
    done()
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

let productData = {
    name: "sepatu",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRT49_FYIGSIqnhCutkAlxyXg9_tvnGxyZV-A&usqp=CAU",
    price: 300000,
    stock: 100,
    CategoryId: 1
}
// let productData_noname = {
//     name: "",
//     image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRT49_FYIGSIqnhCutkAlxyXg9_tvnGxyZV-A&usqp=CAU",
//     price: 300000,
//     stock: 100,
//     CategoryId: 1
// }
// let productData_noimage = {
//     name: "sepatu",
//     image_url: "",
//     price: 300000,
//     stock: 100,
//     CategoryId: 1
// }
// let productData_noimage = {
//     name: "sepatu",
//     image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRT49_FYIGSIqnhCutkAlxyXg9_tvnGxyZV-A&usqp=CAU",
//     price: 0,
//     stock: 100,
//     CategoryId: 1
// }

let productData2 = {
    name: "sepatu",
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRT49_FYIGSIqnhCutkAlxyXg9_tvnGxyZV-A&usqp=CAU",
    price: 300000,
    stock: 50,
    CategoryId: 1
}

describe('Success Create Product', ()=>{
    it('Success Product', (done) => {
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
})


describe('Fail Create Product', ()=>{
    it('no access token, should return 401', (done) => {
        request(app)
        .post('/product')
        .send(productData) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(401) 
            expect(body).toHaveProperty('msg', 'Unauthenticated. You need to login first')  
            done()
        })
    })

    let data = {...productData,name:''} 
    it('no name input, should return 400', (done) => {
        request(app)
        .post('/product')
        .set('access_token', access_token)
        .send(data) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Product's name cannot be empty")  
            done()
        })
    })
    let data2 = {...productData,image_url:''} 
    it('no image input, should return 400', (done) => {
        request(app)
        .post('/product')
        .set('access_token', access_token)
        .send(data2) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Product's image cannot be empty")  
            done()
        })
    })
    let data3 = {...productData,price:''} 
    it('empty price input, should return 400', (done) => {
        request(app)
        .post('/product')
        .set('access_token', access_token)
        .send(data3) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Input price cannot be empty")  
            done()
        })
    })
    let data4 = {...productData,price:0} 
    it('0 price input, should return 400', (done) => {
        request(app)
        .post('/product')
        .set('access_token', access_token)
        .send(data4) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Price cannot be less than one")  
            done()
        })
    })
    let data5 = {...productData,stock:''} 
    it('empty stock input, should return 400', (done) => {
        request(app)
        .post('/product')
        .set('access_token', access_token)
        .send(data5) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Input stock cannot be empty")  
            done()
        })
    })
    let data6 = {...productData,stock:-1} 
    it('-1 stock input, should return 400', (done) => {
        request(app)
        .post('/product')
        .set('access_token', access_token)
        .send(data6) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Stock cannot be less than zero")  
            done()
        })
    })
    let data7 = {...productData,CategoryId:''} 
    it('empty CategoryId input, should return 400', (done) => {
        request(app)
        .post('/product')
        .set('access_token', access_token)
        .send(data7) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Category cannot be empty")  
            done()
        })
    })

})

describe('Success Read Product', () => {
    it('Read Products', (done) => {
        request(app)
        .get('/products') 
        .set('access_token', access_token) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(200)
            // console.log(body); 
            expect(body[0]).toHaveProperty('name', expect.any(String))
            expect(body[0]).toHaveProperty('image_url', expect.any(String))
            expect(body[0]).toHaveProperty('price', expect.any(Number))
            expect(body[0]).toHaveProperty('stock', expect.any(Number))
            done()
        })
    })
})
describe('Fail Read Product', () => {
    it('No Access_token, Should return 401', (done) => {
        request(app)
        .get('/products')  
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(401)
            // console.log(body); 
            expect(body).toHaveProperty('msg', 'Unauthenticated. You need to login first') 
            done()
        })
    })
})



describe('Success Update Product',()=>{
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
            expect(body).toHaveProperty('msg', 'Updated Successfully') 
            done()
        })
    }) 
})
describe('Fail Update Product',()=>{
    
    it('no access token, should return 401', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .send(productData2) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(401) 
            expect(body).toHaveProperty('msg', 'Unauthenticated. You need to login first')  
            done()
        })
    })
    
    it('wrong parameter id, should return 401', (done) => {
        request(app)
        .put(`/product/x`)
        .send(productData2) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(401) 
            expect(body).toHaveProperty('msg', 'Unauthenticated. You need to login first')  
            done()
        })
    })

    let data8 = {...productData2,name:''} 
    it('no name input, should return 400', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .set('access_token', access_token)
        .send(data8) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Product's name cannot be empty")  
            done()
        })
    })
    let data9 = {...productData2,image_url:''} 
    it('no image input, should return 400', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .set('access_token', access_token)
        .send(data9) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Product's image cannot be empty")  
            done()
        })
    })
    let data10 = {...productData2,price:''} 
    it('empty price input, should return 400', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .set('access_token', access_token)
        .send(data10) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Input price cannot be empty")  
            done()
        })
    })
    let data11 = {...productData2,price:0} 
    it('0 price input, should return 400', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .set('access_token', access_token)
        .send(data11) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Price cannot be less than one")  
            done()
        })
    })
    let data12 = {...productData2,stock:''} 
    it('empty stock input, should return 400', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .set('access_token', access_token)
        .send(data12) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Input stock cannot be empty")  
            done()
        })
    })
    let data13 = {...productData2,stock:-1} 
    it('-1 stock input, should return 400', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .set('access_token', access_token)
        .send(data13) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Stock cannot be less than zero")  
            done()
        })
    })
    let data14 = {...productData2,CategoryId:''} 
    it('empty CategoryId input, should return 400', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .set('access_token', access_token)
        .send(data14) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Category cannot be empty")  
            done()
        })
    })
})

describe('Delete Product',()=>{ 
 
    it('Should Delete Successfully', (done) => {
        request(app)
        .delete(`/product/${productId}`) 
        .set('access_token', access_token) 
        .then(response => { 
            const {status, body} = response
            expect(status).toBe(200)
            // console.log(body); 
            expect(body).toHaveProperty('msg', 'Deleted Successfully') 
            done()
        })
    })
    it('no access_token, should return 401', (done) => {
        request(app)
        .delete(`/product/${productId}`)  
        .then(response => { 
            const {status, body} = response
            expect(status).toBe(401)
            // console.log(body); 
            expect(body).toHaveProperty('msg', 'Unauthenticated. You need to login first') 
            done()
        })
    })
})