const { getAll, create, getOne, remove, update } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const imageRouter = express.Router();

imageRouter.route('/')
    .get(verifyJWT, getAll)
    .post(upload.single('image'), verifyJWT, create);

imageRouter.route('/:id')
    // .get(getOne)
    .delete(upload.single('image'), verifyJWT, remove)
    // .put(update);

module.exports = imageRouter;