const request = require('supertest');
const app = require('../app.js');
const Image = require('../models/Image.js');
require('../models')


let id;
let token; 

beforeAll(async () => {
  const res = await request(app).post('/users/login').send({
        email: 'tester@gmail.com',
        password: 'tester123',
    })
    token = res.body.accessToken
})

test('GET /products must display all products', async () => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /products must create a product', async () => {

    const product = {
        "title": "CYBORG 15 A12V",
        "description": "LKASNDF  OPIAHSGOIFN ASOIMGOPISHOGIUAPOSIMH,DAMOIHFDOAIHSDGOIA,DOGHIPADHMPOAIMHSGOIUAHSDFMOIH,ASGOIAPOSIGHMOAP",
        "brand": "MSI",
        "price": 750.00,
        "categoryId": 1
    }

    const res = await request(app).post('/products').send(product).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.title).toBe(product.title)
    expect(res.body.id).toBeDefined()
});

test('POST /products/:id/images must set the product images', async () => {

    const image = await Image.create({
        url: "www.google.com",
        publicId: "anything"
    })


    const res = await request(app).post(`/products/${id}/images`).send([image.id]).set('Authorization', `Bearer ${token}`)

    await image.destroy()
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

});

test('PUT /products', async () => {
    const product = {
        title: 'CYBORG 15 A13V"'
    }
    const res = await request(app).put(`/products/${id}`).send(product).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.title).toBe(product.title)
});

test('DELETE /products must remove a product', async () => {
    const res = await request(app).delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});