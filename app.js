const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const Price = require('./models/Price')

const app = express()

app.use(express.json({extended: true}))
app.use('/api/price', require('./routes/price.routes'))


const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        const connection = mongoose.connection
        // const customerSchema = new mongoose.Schema({
        //     art: String,
        //     name: String,
        //     createdAt: String });
        // const price = new Price({art: "work!", name: "work!", createdAt: "1111"})
        // await price.save()
        // const Customer = mongoose.model('prices', customerSchema);
        // await Customer.create({ art: 'test', name: 'test', createdAt: 'test' });
        // await Customer.create({ name: 'A', age: 30, email: 'a@foo.bar' });
        // await Customer.create({ name: 'B', age: 28, email: 'b@foo.bar' });

        // const docs = await Price.find();
        // console.log(docs);
        // connection.db.getCollectionNames() .toArray(function (err, names) {
        //     // if (err) {
        //     //     console.log(err);
        //     // } else {
        //         console.log(names);
        //     // }
        //
        //     mongoose.connection.close();
        // });

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))


    } catch (e) {
        console.log('Server error: ', e.message)
        process.exit(1)
    }
}

start()

