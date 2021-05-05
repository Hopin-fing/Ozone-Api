const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;

const app = express()

// app.use(express.json({extended: true}))
app.use('/api/products', require('./routes/products.routes'))


const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        // const User = mongoose.model('productslists', {
        //     art_wb: Number,
        //     art: String,
        //     name: String,
        //     model: String,
        //     brand: String,
        //     barcode: String,
        //     chrt_id: Number,
        //     supplier: String,
        //     wbCard: Object,
        //     isClone: Boolean
        // });
        // User.find({ name: 'Однодневные контактные линзы 1-day Acuvue TruEye, -1.25, 8.5, 30 линз'}, function (err, docs) {
        //     if (err){
        //         console.log(err);
        //     }
        //     else{
        //         console.log("First function call : ", docs);
        //     }
        // });

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
        // MongoClient.connect(config.get('mongoUri'), function(err, db) {
        //     if (err) throw err;
        //     let dbo = db.db("parserV2");
        //     //Find the first document in the customers collection:
        //     dbo.collection("productslists").find({}).toArray(function(err, result) {
        //         if (err) throw err;
        //         console.log(result);
        //         db.close();
        //     });
        // });

    } catch (e) {
        console.log('Server error: ', e.message)
        process.exit(1)
    }
}

start()

