const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const Review = require('../models/Review')
const router = Router()

 //TODO: Переписать этот метод в отдельный node.js файлй
const fs = require('fs');
const productJson = require('../dataServer/products.json')
const finishJson = require('../dataServer/finish.json')
const newJson = require('../dataServer/new.json')


const maximaJson = require('../dataServer/maxima.json')

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

//889071619393

const rewriteJson = () => {
    // const data = finishJson


    for (let i=0; i < maximaJson.length ; i++) {
        const maximaBarcode = maximaJson[i]["nomenclatures"][0]["variations"][0]["barcodes"]
        // const newBarcode = newJson.find(x => x["barcodeOld"] === maximaBarcode)
        const newBarcode = newJson.find(x => x["barcodeOld"] == maximaBarcode)
        console.log("maximaBarcode:",  maximaBarcode, "barcodeOld", newBarcode)

    }

    // fs.writeFile ('./dataServer/new.json', JSON.stringify(data), function(err) {
    //         if (err) console.log(err) ;
    //         console.log('complete');
    //     }
    // );
}

// rewriteJson()


// /api/auth/review
router.post(
    '/review',
    [
        check('name', 'Имя пользователья должно содержать минимум 2 символа').isLength({min: 2}),
        check('message', 'Минимальная длина отзыва 10 символов').isLength({min: 10}),
    ],
    async (req, res) => {
        console.log(req.body)

        try{

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные для отправки отзыва'
            })
        }

        const {name, message} = req.body

        const review = new Review({name, message})

        await review.save()

        res.status(201).json({message: 'Отзыв оставлен'})
    }catch (e) {
        res.status(500).json({ message: ' Some error, try again'})
    }
})

module.exports = router