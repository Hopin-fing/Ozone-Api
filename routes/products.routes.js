const {Router} = require('express')
const Product = require('../models/Product')
const router = Router()


router.post('/get_cards', async (req, res) => {
    const result = []
    try{
        for(const [index,element] of req.body.entries()) {
            const product = await Product.findOne({art_wb: Number(element)})
            if(product) result.push(product)
        }
        return res.status(200).json({result})
    }catch (e) {
        console.log("Error message" , e)
        res.status(500).json({ "status": ' error'})
    }

})

module.exports = router