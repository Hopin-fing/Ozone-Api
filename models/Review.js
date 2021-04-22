const {Schema, model} = require('mongoose')


// const fs = require('fs');
// const originalJson = require('../dataServer/maxima.json')
// const newJso1n = require('../dataServer/products.json')
//
// let data = {}
// data.table = []
// for (let i=0; i <26 ; i++){
//     let obj = {
//         id: i,
//         square: i * i
//     }
//     data.table.push(obj)
// }
// fs.writeFile ('./dataServer/products.json', JSON.stringify(data), (err) => {
//     if (err)
//         console.log(err);
//     else {
//         console.log("File written successfully\n");
//         console.log("The written has the following contents:");
//         console.log(fs.readFileSync("books.txt", "utf8"));
//     }
// });

const schema = new Schema({
    name: {type: String, required: true},
    message: {type: String, required: true}
})

module.exports = model('Review', schema)