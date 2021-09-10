const {Router} = require('express')
const Product = require('../models/Product')
const router = Router()
const useHttp = require('../serverMethods/httpRequest')


router.post('/get_cards', async (req, res) => {
    const result = {
        "exist" : [],
        "empty" : []
    }
    try{
        for(const [index,element] of req.body.entries()) {
            const product = await Product.findOne({art_wb: Number(element)})
            if(product) result["exist"].push(product)
            if(!product) result["empty"].push(element)
        }
        return res.status(200).json({result})
    }catch (e) {
        console.log("Error message" , e)
        res.status(500).json({ "status": ' error'})
    }

})

router.post('/import_product', async (req, res) => {
    const headers = req.body.headers
    delete req.body.headers
    const body = req.body
    const url = "v2/product/import"
    try{
        const response = await useHttp(url, body, headers, "POST")
        const result = response.data.result["task_id"]
        if(!result) return res.status(500).json({"status": ' error on Ozon'})
        return res.status(200).json({"status": 'ok'})
    }catch (e) {
        res.status(500).json({ "status": ' error'})
    }

})

module.exports = router