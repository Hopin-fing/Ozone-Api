const {Router} = require('express')
const Product = require('../models/Product')
const router = Router()

// /api/auth/Product

// router.post('/product', async (req, res) => {
//
//         try{
//
//
//         const product  = await Product.findOne({art : 194905800696})
//
//         if(product) {
//             console.log("Its work!!")
//         }
//
//         await product.save()
//
//         res.status(201).json({message: 'Отзыв оставлен'})
//     }catch (e) {
//         res.status(500).json({ message: ' Some error, try again'})
//     }
// })

module.exports = router