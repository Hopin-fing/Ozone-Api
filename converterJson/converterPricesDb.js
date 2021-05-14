const fs = require('fs');
const originalDB = require('./dataServer/dataOzonAdminPanel.json')
const pricesDB = require('./dataServer/pricesDB.json')
const result = require('./dataServer/result.json')

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
            "BuyingPrice": 0,
            "CurrentPrice": 0,
            "Brand": "",
            "barcodeOld": 0,
            "count": 0,
            "market_price": 0
        }
        const barcode =  element["Barcode"].toString()
        const objProduct = pricesDB.find(x => x["barcode"] === barcode )
        console.log("objProduct: ", objProduct)
        // const oldBarcode = element["nomenclatures"][0]["variations"][0]["barcodes"].toString()
        // const shortBarcode = oldBarcode.slice(-9)
        // const clearOldBarcode = Number(`100${shortBarcode}`)
        if (objProduct) {
            console.log("test")
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

            objResult["count"] = element["Доступно на моих складах, шт"]
            data.push(objResult)
        }


        // console.log(element)


    })
    // console.log(data)

    fs.writeFile ('./dataServer/result.json', JSON.stringify(data), function(err) {
            if (err) console.log(err) ;
            console.log('complete');
        }
    );
}

rewriteJson()