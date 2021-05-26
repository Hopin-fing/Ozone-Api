const fetch = require("node-fetch");
const fs = require('fs');
const md5 = require("crypto-js/md5")
const moment = require("moment")


const rewriteJson =  async () => {
    const sign = md5(moment().format("YYYY-MM-DD") + '2c428475c53106048f6364b5eb163431').toString()
    const response = await fetch(`https://viplinza.ru/export/price.php?sign=${sign}`)
    const resp = await response.json()

    fs.writeFile ('../client/src/data/responseData/sourcePrices.json', JSON.stringify(resp), function(err) {
            if (err) console.log(err) ;
            console.log('complete');
        }
    );
}

rewriteJson()

