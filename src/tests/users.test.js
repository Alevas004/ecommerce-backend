const request = require('supertest');
const app = require('../app.js');


let id;
let token;


test('POST /users must create an user', async () => {
    
    const user = {
        firstName: "Ale",
        lastName: "Vasquez",
        email: "alejo1@gmail.com",
        password: "ale1234",
        phone: "3017661457"
    }

    const res = await request(app).post('/users').send(user);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
    expect(res.body.password).not.toBe(user.password);
});


test('POST /users/login', async () => {
    const body = {
        email: "alejo1@gmail.com",
        password: "ale1234"
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.accessToken;
    expect(res.status).toBe(201)
    expect(res.body.accessToken).toBeDefined();
    
    
    
});

test('GET /users display all users', async() => {

    const res = await request(app).get('/users')
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
} )





test('PUT /users must update user firstName, lastName and phone ', async () => {
    const user = {
        firstName: "Ale",
        lastName: "Restrepo",
        phone: "3017661458"
    }
    
    const res = await request(app).put(`/users/${id}`).send(user)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(user.firstName)
});



test('POST /users/login invalid credentials', async () => {
    const body = {
        email: "aleeeeee@gmail.com",
        password: "ale12eeeeeee34"
    }
   const res = await request(app).post('/users/login').send(body);

   expect(res.status).toBe(401)
});


test('DELETE /users must remove an user', async () => {
    const res = await request(app).delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});
