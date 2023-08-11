const Cart = require("./Cart");
const Category = require("./Category");
const Image = require("./Image");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");


    Category.hasMany(Product)
    Product.belongsTo(Category)

    Image.belongsTo(Product)
    Product.hasMany(Image)
    //************ */
    
    Purchase.belongsTo(User)
    User.hasMany(Purchase)

    Purchase.belongsTo(Product)
    Product.hasMany(Purchase)

    //********** */
    User.hasMany(Cart)
    Cart.belongsTo(User)

    Cart.belongsTo(Product)
    Product.hasMany(Cart)