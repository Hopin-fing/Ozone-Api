const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/Product')
const Price = require('../models/Price')

const fs = require('fs');
const md5 = require("crypto-js/md5")
const moment = require("moment")
const productDB = require('./dataServer/neo_barcodes.json')

const app = express()

app.use(express.json({extended: true}))


const PORT =  5000


const createFullCardsWB =  async () => {

    const arrCardWB = []
    try {
        await mongoose.connect("mongodb://80.78.255.21:27017/parserV2", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))

    // productDB.forEach(element => {
        const product = await Product.findOne( {barcode: "2000132844686"})
        console.log(product)
        arrCardWB.push(product)

    // })
    fs.writeFile ('./dataServer/neoCosmoCardWB.json', JSON.stringify(arrCardWB), async (err) => {
            if (err) console.log(err) ;
            console.log("test!")
        }
    );

} catch (e) {
        console.log('Server error: ', e.message)
        process.exit(1)
    }

}

createFullCardsWB()