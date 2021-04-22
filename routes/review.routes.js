const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const Review = require('../models/Review')
const router = Router()

 //TODO: Переписать этот метод в отдельный node.js файлй
// const fs = require('fs');
// const originalJson = require('../dataServer/maxima.json')
// const newJson = require('../dataServer/products.json')
// const finishJson = require('../dataServer/finish.json')
//
// const testRun = () => {
//     let data = [],
//     dataRightKey = ["Артикул",
//         "Ozon Product ID",
//         "FBO OZON SKU ID",
//         "FBS OZON SKU ID",
//         "Barcode",
//         "Наименование товара",
//         "Бренд",
//         "BarcodeOld"
//     ]

    // console.log("newJson ", typeof newJson)
    // console.log("newJson[0] ", typeof newJson[0][0])

    // console.log(newJson)
    // for (let i=0; i < newJson.length ; i++) {
    //     data.push({})
    //     dataRightKey.forEach(key => {
    //         if(key === "BarcodeOld") {
    //             for (let j=0; j < newJson.length ; j++) {
    //                if(newJson[i]["Barcode"].slice(-9) === newJson[j]["Barcode"].slice(-9)) {
    //                    data[i]["BarcodeOld"]  = newJson[j]["Barcode"]
    //                }
    //
    //             }
    //         }
    //         if(key !== "BarcodeOld") {
    //             data[i][key] = newJson[i][key]
    //         }
    //     })
    // }
    //
    // console.log(data)

    // fs.writeFile ('./dataServer/finish.json', JSON.stringify(data), function(err) {
    //         if (err) console.log(err) ;
    //         console.log('complete');
    //     }
    // );
// }

// testRun()


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