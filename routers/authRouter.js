const express = require('express');
const router = express.Router();
const { getProducts, home, resgister} = require('../controllers/authController');


router.get('/', home);

router.get('/products', getProducts);
router.post('/register', resgister);


module.exports = router;