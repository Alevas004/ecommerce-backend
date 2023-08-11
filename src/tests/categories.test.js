const request = require('supertest');
const app = require('../app.js');

let id;
let token; 

beforeAll(async () => {
  const res = await request(app).post('/users/login').send({
        email: 'tester@gmail.com',
        password: 'tester123',
    })
    token = res.body.accessToken
})

test('GET /categories must display all categories', async () => {
    const res = await request(app).get('/categories')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /categories must create a category', async () => {

    const category = {
        name: 'Laptos'
    }

    const res = await request(app).post('/categories').send(category).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(category.name)
    expect(res.body.id).toBeDefined()
});

test('PUT /categories', async () => {
    const category = {
        name: 'laptosggg'
    }
    const res = await request(app).put(`/categories/${id}`).send(category).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(category.name)
});

test('DELETE /categories must remove a category', async () => {
    const res = await request(app).delete(`/categories/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});