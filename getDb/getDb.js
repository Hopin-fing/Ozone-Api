const fetch = require("node-fetch");
const fs = require('fs');
const md5 = require("crypto-js/md5")
const moment = require("moment")

const createFeedback = require("./createFeedback")
const fullCards = require("./data/fullWBCards.json")
const productDB = require('./data/newCardsAlcon.json')
const ozonDB = require('../converterJson/dataServer/dataOzonAdminPanel.json')


const arrTrash = []


const createFullCardsWB =  async () => {
    const sign = md5(moment().format("YYYY-MM-DD") + '2c428475c53106048f6364b5eb163431').toString()
    const response = await fetch(`https://viplinza.ru/export/price.php?sign=${sign}`)
    const resp = await response.json()

    const arrCardWB = []

    const checkAllItems = (arrayItem, artWB) => {
        return Boolean(arrayItem.find(item => item === artWB))
    }

    productDB.forEach(element => {
        const articleIp =  resp.find(item =>
            ("article_wb" in item
                &&  "ip" in item["article_wb"]
                &&checkAllItems(item["article_wb"]["ip"], element["art_wb"].toString())))
        const articleOoo =  resp.find(item => ("article_wb" in item
            && "ooo" in item["article_wb"]
            && checkAllItems(item["article_wb"]["ooo"], element["art_wb"].toString())))

        if(articleIp) {
            element.priceInfo = articleIp
            arrCardWB.push(element)
        }
        if(articleOoo)  {
            element.priceInfo = articleOoo
            arrCardWB.push(element)
        }
        if(!articleIp && !articleOoo) {
            arrTrash.push(element)
        }


    })
    fs.writeFile ('./data/fullWBCards.json', JSON.stringify(arrCardWB), async (err) => {
            if (err) console.log(err) ;
            await createSourcePrice()
            await createFeedback()
            await createTrashArr()

        }
    );

}


const createSourcePrice = () => {
    const data = []

    ozonDB.forEach((element) => {
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
        fullCards.forEach(item => {
            try{
                const check = item["barcode"].includes(shortBarcode)
                if (check)  {

                    objProduct = item
                }
            }catch (e) {
            }
        })



        if (objProduct) {
            objResult["art"] = element["Артикул"]
            objResult["Ozon_Product_ID"] = element["Ozon Product ID"]
            objResult["FBO_OZON_SKU_ID"] = element["FBO OZON SKU ID"]
            objResult["FBS_OZON_SKU_ID"] = element["FBS OZON SKU ID"]
            objResult["Barcode"] = element["Barcode"]
            objResult["Name"] = element["Наименование товара"]
            objResult["Brand"] = element["Бренд"]
            objResult["BuyingPrice"] = objProduct["priceInfo"]["price"]
            objResult["CurrentPrice"] = element["Текущая цена с учетом скидки, руб."]
            objResult["market_price"] = element["Рыночная цена, руб."]
            objResult["count"] = objProduct["priceInfo"]["balance"]

            data.push(objResult)
        }

    })

    fs.writeFile ('../client/src/data/responseData/sourcePrices.json', JSON.stringify(data), async (err) => {
            if (err) console.log(err) ;

        }
    );
    return true
}

const createTrashArr = () => {

    fs.writeFile ('./data/trashCards.json', JSON.stringify(arrTrash), function(err) {
            if (err) console.log(err) ;
        }
    );

    return true

}


createFullCardsWB()


