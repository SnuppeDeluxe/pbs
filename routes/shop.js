const express = require('express');
const path = require('path');

const shopController = require('../controllers/shop');

const router = express.Router();

//Produktübersicht
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProductId); //Dynamische Routen IMMER als letzte Route angeben im Pfad!!!

//Warenkorb
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postDeleteItem);

//Bestellungen
router.get('/orders', shopController.getOrders);
router.post('/create-order', shopController.postOrders);

//Checkout
router.get('/checkout', shopController.getCheckout);

//Startseite
router.get('/', shopController.getIndex);

module.exports = router;