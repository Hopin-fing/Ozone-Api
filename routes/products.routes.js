const {Router} = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const Product = require('../models/Product')
const router = Router()

 //TODO: Переписать этот метод в отдельный node.js файлй
const fs = require('fs');
const originalDB = require('../dataServer/originalData.json')
const ozonResponse = require('../dataServer/ozoneResponse.json')
const result = require('../dataServer/result.json')

// const rewriteJson = () => {
//     const data = finishJson
//
//
//     for (let i=0; i < finishJson.length ; i++) {
//         const finishArticle = finishJson[i]["Артикул"]
//         const currentCard = finishJson.find(x => x["Артикул"] === finishArticle)
//         const barcodeOld = currentCard["Barcode"]
//         const barcodeNew =  productJson.find(x => x["Артикул"] === finishArticle)["Barcode"]
//         currentCard["BarcodeOld"] =  barcodeOld
//         currentCard["Barcode"] =  barcodeNew
//     }
//
//     fs.writeFile ('./dataServer/new.json', JSON.stringify(data), function(err) {
//             if (err) console.log(err) ;
//             console.log('complete');
//         }
//     );
// }

// const arrExample = {
//     "art": 0,
//     "Ozon_Product_ID": 0,
//     "FBO_OZON_SKU_ID": 0,
//     "FBS_OZON_SKU_ID": 0,
//     "Barcode": "",
//     "Name": "",
//     "Brand": "",
//     "barcodeOld": 0,
//     "count": 0
// }

const rewriteJson = () => {
    const data = []

    //Скрипт создания нового json файла, который объединяет в себе информацию из дб и cvs с озона

    originalDB.forEach(element => {
        const objResult = {
            "art": 0,
            "Ozon_Product_ID": 0,
            "FBO_OZON_SKU_ID": 0,
            "FBS_OZON_SKU_ID": 0,
            "Barcode": "",
            "Name": "",
            "Brand": "",
            "barcodeOld": 0,
            "currentPrice": 0,
            "count": 0,
            "market_price": 0
        }
        const oldBarcode = element["nomenclatures"][0]["variations"][0]["barcodes"].toString()
        const shortBarcode = oldBarcode.slice(-9)
        const clearOldBarcode = Number(`100${shortBarcode}`)
        const objProduct = ozonResponse.find(x => x["Артикул"] === clearOldBarcode )
        objResult["art"] = objProduct["Артикул"]
        objResult["Ozon_Product_ID"] = objProduct["Ozon Product ID"]
        objResult["FBO_OZON_SKU_ID"] = objProduct["FBO OZON SKU ID"]
        objResult["FBS_OZON_SKU_ID"] = objProduct["FBS OZON SKU ID"]
        objResult["Barcode"] = objProduct["Barcode"]
        objResult["Name"] = objProduct["Наименование товара"]
        objResult["Brand"] = objProduct["Бренд"]
        objResult["barcodeOld"] = oldBarcode
        objResult["currentPrice"] = objProduct["Текущая цена с учетом скидки, руб."]
        objResult["market_price"] = objProduct["Рыночная цена, руб."]

        objResult["count"] = objProduct["Доступно на моих складах, шт"]
        data.push(objResult)
        // console.log(element)


    })
    // console.log(data)

    fs.writeFile ('./dataServer/result.json', JSON.stringify(data), function(err) {
            if (err) console.log(err) ;
            console.log('complete');
        }
    );
}

// rewriteJson()


// /api/auth/Product

router.post('/product', async (req, res) => {

        try{

        const {name, message} = req.body


        // const product = new Product({name, message})

        await product.save()

        res.status(201).json({message: 'Отзыв оставлен'})
    }catch (e) {
        res.status(500).json({ message: ' Some error, try again'})
    }
})

module.exports = router