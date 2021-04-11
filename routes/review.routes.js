const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const Review = require('../models/Review')
const router = Router()


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