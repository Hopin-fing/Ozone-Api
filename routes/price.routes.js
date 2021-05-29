const {Router} = require('express')
const Price = require('../models/Price')
const router = Router()



router.get('/get_price', async (req, res) => {
    try{
        const docs = await Price.find();
        return res.status(200).json({docs})
    }catch (e) {
        res.status(500).json({ message: ' Some error, try again'})
    }
    // try{
    //     const product = await Price.findOne({art: 709470112}, async (err, prices) => {
    //         if(prices) {
    //             prices.history = [{"data": "111111111"}]
    //             await prices.save()
    //         }
    //     })
    //     if (!product) {
    //         const newProduct = await new Price( {art: "1111111", name: "Artur", history : ["Pirojcov"] } )
    //         newProduct.save()
    //         return res.status(200).json({newProduct})
    //     }
    //
    //     return res.status(200).json({product})
    // }catch (e) {
    //     res.status(500).json({ message: ' Some error, try again'})
    // }


})

router.post('/send_price', async (req, res) => {
    try{
        for(let i = 0; req.body.length > i; i++) {
            const {art, name, history} = req.body[i]
            const product = await Price.findOne({art: art}, async (err, prices) => {
                if(prices) {
                    prices.history = history
                    await prices.save()
                }
            })
            if (!product) {
                const newProduct = await new Price( {art: art, name: name, history : history } )
                newProduct.save()
            }

        }
        return res.status(200).json({"status" : "ok" })
    }catch (e) {
        res.status(500).json({ message: ' Some error, try again'})
    }
})

module.exports = router