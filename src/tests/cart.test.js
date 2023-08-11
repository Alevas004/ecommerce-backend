const request = require('supertest');
const app = require('../app.js');
const Image = require('../models/Image.js');
const Product = require('../models/Product.js');
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

test('GET /carts must display all carts', async () => {
    const res = await request(app).get('/carts').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /carts must create a cart with a product', async () => {

    const products = await Product.create ( {
        title: "ACER NITRO 5",
        description: "LKASNDF  OPIAHSGOIFN ASOIMGOPISHOGIUAPOSIMH,DAMOIHFDOAIHSDGOIA,DOGHIPADHMPOAIMHSGOIUAHSDFMOIH,ASGOIAPOSIGHMOAP",
        brand: "ACER",
        price: 700.00,
        categoryId: 1
    })

    const cart = {
        productId: products.id,
        quantity: 3
    }

    const res = await request(app).post('/carts').send(cart).set('Authorization', `Bearer ${token}`)
    await products.destroy()
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.quantity).toBe(cart.quantity)
    expect(res.body.id).toBeDefined()
});


test('DELETE /carts must remove a cart', async () => {
    const res = await request(app).delete(`/carts/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});