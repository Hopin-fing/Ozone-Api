const fs = require('fs');
const sourcePrices = require('../client/src/data/responseData/sourcePrices.json')
const productWbDb = require('../client/src/data/productDB/Alcon.json')

const createFeedback = () => {
    const data = []

    for (let i=0; i < sourcePrices.length ; i++) {

        const article = sourcePrices[i]["art"].toString()
        const ozonProdId = sourcePrices[i]["Ozon_Product_ID"]
        const fbo = sourcePrices[i]["FBO_OZON_SKU_ID"]
        const fbs = sourcePrices[i]["FBS_OZON_SKU_ID"]
        const name = sourcePrices[i]["Name"]
        const brand = sourcePrices[i]["Brand"]
        const currentPrice = sourcePrices[i]["CurrentPrice"]
        const count = sourcePrices[i]["count"]

        try{
            const barcodeOld = productWbDb.find( item => {
                    const arrBarcodes = item["nomenclatures"][0].variations[0].barcodes
                    if(arrBarcodes.length !== 0) {
                        if(arrBarcodes[0].slice(-9) === article.slice(-9))
                            return item
                    }
            })
            const objResult = {
                "art" : article,
                "Ozon_Product_ID" : ozonProdId,
                "FBO_OZON_SKU_ID" : fbo,
                "FBS_OZON_SKU_ID" : fbs,
                "barcodeOld" : !!barcodeOld ? barcodeOld["nomenclatures"][0].variations[0].barcodes[0] : null,
                "Name" : name,
                "Brand" : brand,
                currentPrice,
                count
            }
            data.push(objResult)
        }catch (e) {
            arrErrors.push(e)
        }


    }

    fs.writeFile ('../client/src/data/responseData/feedback.json', JSON.stringify(data), function(err) {
            if (err) console.log(err) ;
            console.log('feedback complete !');
        }
    );
}

module.exports = createFeedback
