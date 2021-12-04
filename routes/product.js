var express = require('express');
var router = express.Router();
var controller = require('../controllers/product');

/* GET products listing. Please establish connection with getProduct function from controllers/product.js  */
router.get('/', function (req, res, next) {
  const q = req.query.q;
  const data = controller.getProducts(q);
  res.send(data);
});

module.exports = router;
