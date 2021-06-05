const fetch = require("node-fetch");
const originalDB = require('../converterJson/dataServer/dataOzonAdminPanel.json')
const fs = require('fs');
const md5 = require("crypto-js/md5")
const moment = require("moment")
const createFeedback = require("../converterJson/createFeedback")


const rewriteJson =  async () => {
    const sign = md5(moment().format("YYYY-MM-DD") + '2c428475c53106048f6364b5eb163431').toString()
    const response = await fetch(`https://viplinza.ru/export/price.php?sign=${sign}`)
    const resp = await response.json()
    const data = []

    originalDB.forEach(element => {
        const objResult = {
            "art": 0,
            "Ozon_Product_ID": 0,
            "FBO_OZON_SKU_ID": 0,
            "FBS_OZON_SKU_ID": 0,
            "Barcode": "",
            "Name": "",
            "BuyingPrice": 0,
            "CurrentPrice": 0,
            "Brand": "",
            "barcodeOld": 0,
            "count": 0,
            "market_price": 0
        }
        const article =  element["Артикул"].toString()
        const shortBarcode = article.slice(-9)
        let objProduct = ""
        resp.forEach(item => {
            const check = item["barcode"].includes(shortBarcode)
            if (check) objProduct = item
        })

        if (objProduct) {
            objResult["art"] = element["Артикул"]
            objResult["Ozon_Product_ID"] = element["Ozon Product ID"]
            objResult["FBO_OZON_SKU_ID"] = element["FBO OZON SKU ID"]
            objResult["FBS_OZON_SKU_ID"] = element["FBS OZON SKU ID"]
            objResult["Barcode"] = element["Barcode"]
            objResult["Name"] = element["Наименование товара"]
            objResult["Brand"] = element["Бренд"]
            objResult["BuyingPrice"] = objProduct["price"]
            objResult["CurrentPrice"] = element["Текущая цена с учетом скидки, руб."]
            objResult["market_price"] = element["Рыночная цена, руб."]

            objResult["count"] = objProduct["balance"]
            data.push(objResult)
        }

    })


    fs.writeFile ('../client/src/data/responseData/sourcePrices.json', JSON.stringify(data), function(err) {
            if (err) console.log(err) ;
            console.log('getDb complete');
            createFeedback()
        }
    );

}


rewriteJson()


