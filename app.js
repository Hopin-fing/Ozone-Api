const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({limit: '10mb', extended: true}))
app.use(express.urlencoded({limit: '10mb', extended: true}))
app.use('/api/price', require('./routes/price.routes'))
app.use('/api/product', require('./routes/products.routes'))
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))


    } catch (e) {
        console.log('Serv1er error: ', e.message)
        process.exit(1)
    }
}

start()

exports.start = start


