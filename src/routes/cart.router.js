const { getAll, create, getOne, remove, update } = require('../controllers/cart.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const cartProduct = express.Router();

cartProduct.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

cartProduct.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = cartProduct;