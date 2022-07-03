const Product = require('../models/product');

//Produkte ausgeben
exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/product-list', {
            prods: products,
            docTitle: 'Products',
            path: '/shop/product-list'
        });
    })
    .catch(err => console.log(err));
};

exports.getProductId = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(product => {
        res.render('shop/product-detail', {
            prods: product,
            docTitle: product.title,
            path: '/shop/products'
        });
    })
    .catch(err => console.log(err));
};

//Warenkorb ausgeben
exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts();
    })
    .then(products => {
        //console.log(products);
        res.render('shop/cart', {
            prods: products,
            docTitle: 'Cart',
            path: '/shop/cart'
        });
    })
    .catch(err => console.log(err));
  };

//Warenkorb erweitern
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where: {id: prodId}});
    })
    .then(products => {
        let product;
        if(products.length > 0){    //Prüfen ob es schon das Produkt gibt
            product = products[0];
        }
        if(product){    //Produkt schon im Warenkorb vorhanden
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Product.findByPk(prodId) //Produkt noch nicht im Warenkorb
    })
    .then(product => {
        return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postDeleteItem = (req, res, next) => {
    const prodId = req.body.prodId;
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id: prodId}});
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

//Bestellung ausgeben
exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
    .then(orders => {
        res.render('shop/orders', {
            orders: orders,
            docTitle: 'Orders',
            path: '/shop/orders'
        });
    })
    .catch(err => console.log(err));
};

//Bestellung erstellen
exports.postOrders = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            return order.addProducts(products.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity };
                return product;
            }));
        })
        .catch(err => console.log(err));
    })
    .then(result => {
        return fetchedCart.setProducts(null);
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

//Checkout
exports.getCheckout = (req, res, next) => {
    res.render('/shop/checkout', {
        prods: [],
        docTitle: 'Checkout',
        path: 'shop/checkout'
    });
};

//Index ausgeben
exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/index', {
            prods: products,
            docTitle: 'Startseite',
            path: '/'
        });
    })
    .catch(err => console.log(err));
};
