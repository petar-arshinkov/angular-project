const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { stockController } = require('../controllers');


// middleware that is specific to this router

router.get('/', stockController.getAllStocks);
router.post('/', auth(), stockController.createStock);

router.get('/:stockId', stockController.getStock);
// router.get('/watch/:stockId', stockController.watch);

router.put('/:stockId', auth(), stockController.editStock);
router.delete('/delete/:stockId', auth(), stockController.deleteStock);

router.put('/watch/:stockId', auth(), stockController.watch);
router.put('/unwatch/:stockId', auth(), stockController.unwatch);



module.exports = router