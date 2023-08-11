const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({include: [Product], where: {userId: req.user.id}});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const products = await Cart.findAll( 
        {where: {userId: req.user.id}, 
        attributes: ['quantity', 'userId', 'productId'], 
        raw: true })

    const purchases = await Purchase.bulkCreate(products)
    await Cart.destroy({where: {userId: req.user.id}})
    return res.status(201).json(purchases);
});

// const create = catchError (async(req, res) => {
//     const products = await Cart.findAll({where: {userId: req.user.id}})
//     const purchases = products.map((item) => Purchase.create({
//         productId: item.productId,
//         quantity: item.quantity,
//         purchaseId: item.purchaseId,
//         userId: item.userId

//     }))

//     await Cart.destroy({where: {userId: req.user.id}})
//     const finalPurchase = await Promise.all(purchases)
//     return res.status(201).json(finalPurchase)
// })


const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchase.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Purchase.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchase.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}


// 1. Nsh4E@zU
// 2. !K4^DT@X