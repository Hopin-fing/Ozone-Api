const fs = require('fs');
const originalDB = require('./dataServer/Alcon.json')

const rewriteJson = () => {
    const data = []

    //Скрипт создания нового json файла, который объединяет в себе информацию из дб и cvs с озона

    originalDB.forEach((element, index) => {
        const searchAttr = (
            typeAttr,
            secondIndex = 0,
            valueParam = "value") => {

            const attr = originalDB[index].addin.find(x => x.type === typeAttr)

            if (( typeof attr === 'undefined') && typeAttr === "Оптическая сила") {
                return "0.00"
            }
            const result = attr.params[secondIndex][valueParam]
            if (result !== undefined) return result
        }

        // const brand = searchAttr( 'Наименование').replace(/[^A-Za-z]*$/ , "" );
        const name = searchAttr( 'Наименование')
        // if(
        //     name.includes('Alcon Dailies Aquacomfort Plus')
        //     || name.includes('Alcon Air Optix Aqua')     1 первая часть
        //     || name.includes("HydroGlyde")
        //     || name.includes("night & day")
        //     || name.includes("Air Optix Night & Day")
        //     || name.includes("Totalone")
        // )  data.push(element)

        // if(
        //     name.includes('Однодневные контактные линзы Dailies Total1')
        //     || name.includes('Контактные линзы Air Optix plus HydraGlyde')
        //     || name.includes('Линзы Air Optix Colors')
        //     || name.includes('Air Optix HydraGlyde')
        //     || name.includes('Air Optix HydraGlyde')
        //
        // )
            data.push(element)

    })
    // console.log(data)

    fs.writeFile ('./dataServer/sourcePrices.json', JSON.stringify(data, null, 2), function(err) {
            if (err) console.log(err) ;
            console.log('complete');
        }
    );

}

rewriteJson()