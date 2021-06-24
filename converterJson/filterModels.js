const fs = require('fs');
const originalDB = require('./dataServer/CooperVision.json')

const rewriteJson = () => {
    const data = []
    const newData =[]


    originalDB.forEach((element) => {
        const string = "Контактные линзы для астигматизма"
        const nameWB = element.name.replace(/\/.*$/g , "" )
        const checkCard = data.find(item => item === nameWB)
        if(!checkCard) data.push(nameWB)
        if(element.name.includes(string)) newData.push(element.name)
    })

    // fs.writeFile ('./dataServer/namesCooper.json', JSON.stringify(data), function(err) {
    //         if (err) console.log(err) ;
    //         console.log('complete');
    //     }
    // );

    fs.writeFile ('./dataServer/specialArr.json', JSON.stringify(newData), function(err) {
            if (err) console.log(err) ;
            console.log('complete');
        }
    );

}

rewriteJson()