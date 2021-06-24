const fetch = require("node-fetch");
const fs = require('fs');
const md5 = require("crypto-js/md5")
const moment = require("moment")
const productDB = require('./dataServer/neoCosmoCardWB.json')

const arrTrash = []


const createFullCardsWB =  async () => {
    const sign = md5(moment().format("YYYY-MM-DD") + '2c428475c53106048f6364b5eb163431').toString()
    const response = await fetch(`https://viplinza.ru/export/price.php?sign=${sign}`)
    const resp = await response.json()

    const arrCardWB = []

    productDB.forEach(element => {
        const date =  element.wbCard.updatedAt.replace(/-.*$/g , "")
        // const articleIp =  resp.find(item =>
        //     ("article_wb" in item
        //         &&  "ip" in item["article_wb"]
        //         &&checkAllItems(item["article_wb"]["ip"], element["art_wb"].toString())))
        // const articleOoo =  resp.find(item => ("article_wb" in item
        //     && "ooo" in item["article_wb"]
        //     && checkAllItems(item["article_wb"]["ooo"], element["art_wb"].toString())))

        if(date >= 2021) arrCardWB.push(element)



    })
    fs.writeFile ('./dataServer/result.json', JSON.stringify(arrCardWB), async (err) => {
            if (err) console.log(err) ;
            console.log("test!")

        }
    );
    // fs.writeFile ('./dataServer/notExist.json', JSON.stringify(arrBad), async (err) => {
    //         if (err) console.log(err) ;
    //         // await createSourcePrice()
    //         // await createFeedback()
    //         // await createTrashArr()
    //         console.log("test!!!!")
    //
    //     }
    // );

}

createFullCardsWB()