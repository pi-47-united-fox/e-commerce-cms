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
let bannerId


beforeAll((done) => {
    access_token = sign(userData)
    done()
})

afterAll((done) => {
    queryInterface.bulkDelete('banners')
    .then(() => {
        done()
    })
    .catch(err => {
        done()
    })
})

let bannerData = {
    name: "banner-1",
    image_url: "https://img.freepik.com/free-vector/currently-offline-twitch-banner-background-vector-template_1361-2541.jpg?size=626&ext=jpg",
    isActive: true, 
} 
 
let bannerData2 = {
    name: "banner-1",
    image_url: "https://img.freepik.com/free-vector/currently-offline-twitch-banner-background-vector-template_1361-2541.jpg?size=626&ext=jpg",
    isActive: false, 
} 
 

describe('Success Create banner', ()=>{
    it('Success banner', (done) => {
        request(app)
        .post('/banner')
        .send(bannerData)
        .set('access_token', access_token) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('name', bannerData.name)
            expect(body).toHaveProperty('image_url', bannerData.image_url)
            expect(body).toHaveProperty('isActive', bannerData.isActive) 
            bannerId = body.id
            done()
        })
    }) 
})


describe('Fail Create banner', ()=>{
    it('no access token, should return 401', (done) => {
        request(app)
        .post('/banner')
        .send(bannerData) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(401) 
            expect(body).toHaveProperty('msg', 'Unauthenticated. You need to login first')  
            done()
        })
    })

    let data = {...bannerData,name:''} 
    it('no name input, should return 400', (done) => {
        request(app)
        .post('/banner')
        .set('access_token', access_token)
        .send(data) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Banner's name cannot be empty")  
            done()
        })
    })
    let data2 = {...bannerData,image_url:''} 
    it('no image input, should return 400', (done) => {
        request(app)
        .post('/banner')
        .set('access_token', access_token)
        .send(data2) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Banner's url cannot be empty")  
            done()
        })
    })
    let data3 = {...bannerData,isActive:''} 
    it('empty price input, should return 400', (done) => {
        request(app)
        .post('/banner')
        .set('access_token', access_token)
        .send(data3) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Banner's status cannot be empty")  
            done()
        })
    })  

})

describe('Success Read banner', () => {
    it('Read banners', (done) => {
        request(app)
        .get('/banners') 
        .set('access_token', access_token) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(200)
            // console.log(body); 
            expect(body[0]).toHaveProperty('name', expect.any(String))
            expect(body[0]).toHaveProperty('image_url', expect.any(String))
            expect(body[0]).toHaveProperty('isActive', expect.any(Boolean)) 
            done()
        })
    })
})
describe('Fail Read banner', () => {
    it('No Access_token, Should return 401', (done) => {
        request(app)
        .get('/banners')  
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



describe('Success Update banner',()=>{
    it('Update banners', (done) => {
        request(app)
        .put(`/banner/${bannerId}`)
        .send(bannerData2)
        .set('access_token', access_token) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('msg', 'Updated Successfully') 
            done()
        })
    }) 
})
describe('Fail Update banner',()=>{
    
    it('no access token, should return 401', (done) => {
        request(app)
        .put(`/banner/${bannerId}`)
        .send(bannerData2) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(401) 
            expect(body).toHaveProperty('msg', 'Unauthenticated. You need to login first')  
            done()
        })
    })

    let data8 = {...bannerData2,name:''} 
    it('no name input, should return 400', (done) => {
        request(app)
        .put(`/banner/${bannerId}`)
        .set('access_token', access_token)
        .send(data8) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Banner's name cannot be empty")  
            done()
        })
    })
    let data9 = {...bannerData2,image_url:''} 
    it('no image input, should return 400', (done) => {
        request(app)
        .put(`/banner/${bannerId}`)
        .set('access_token', access_token)
        .send(data9) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Banner's url cannot be empty")  
            done()
        })
    })
    let data10 = {...bannerData2,isActive:''} 
    it('empty price input, should return 400', (done) => {
        request(app)
        .put(`/banner/${bannerId}`)
        .set('access_token', access_token)
        .send(data10) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "Banner's status cannot be empty")  
            done()
        })
    })
})

describe('Delete banner',()=>{ 
 
    it('Should Delete Successfully', (done) => {
        request(app)
        .delete(`/banner/${bannerId}`) 
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
        .delete(`/banner/${bannerId}`)  
        .then(response => { 
            const {status, body} = response
            expect(status).toBe(401)
            // console.log(body); 
            expect(body).toHaveProperty('msg', 'Unauthenticated. You need to login first') 
            done()
        })
    })
})