const fs = require('fs');
const originalDB = require('./dataServer/Acuvue.json')
const pricesDB = require('./dataServer/pricesDB.json')
const result = require('./dataServer/result.json')

const rewriteJson = () => {
    const data = []

    //Скрипт создания нового json файла, который объединяет в себе информацию из дб и cvs с озона

    originalDB.forEach(element => {
        data.push(element["wbCard"])

        // console.log(element)


    })
    // console.log(data)

    fs.writeFile ('./dataServer/result.json', JSON.stringify(data), function(err) {
            if (err) console.log(err) ;
            console.log('complete');
        }
    );
}

rewriteJson()