import React from 'react';
import GetAttributes from "./getAttributes";

const CreateFullRequest = () => {

    const example  = require('./data/exampleRequestMonth.json')
    const sourceData  = require('../../data/maxima.json')
    const fullRequest = example.items.concat()

    const newData = GetAttributes(sourceData.length)

    console.log('0' , fullRequest)





    for (let index = 0; sourceData.length > index; index++ ) {
        fullRequest.items.push(example.items[0])

    }

    console.log('Start' , fullRequest)

    for (let index = 0; sourceData.length > index; index++ ) {
        let newItem = newData[index].variable,
            itemFinal = fullRequest.items[index]

        const searchAttrById = idValue => {
            return itemFinal.attributes.find(x => x.id === idValue).values
        }


        // TODO: Записывается информация лишь из последнего итема  на все остальные в новом запросе

        const addItemsFinal = () => {

            itemFinal.barcode = newItem.barcode.toString()
            itemFinal.depth = newItem.packDepth
            itemFinal["dimension_unit"] = newItem.packDepthUnit
            itemFinal.height = newItem.packHeight
            itemFinal.name = newItem.name
            itemFinal.price = newItem.price.toString()
            itemFinal.weight = newItem.packWeight
            itemFinal.width = newItem.packWidth
            itemFinal["offer_id"] = newItem.id
            searchAttrById(85).value = newItem.brand
            searchAttrById(4191).value = newItem.description
            searchAttrById(4194).value = newItem.image
            searchAttrById(4384).value = newItem.equipment
            searchAttrById(7703).value = newItem.diameter
            searchAttrById(7706).value = newItem.brand

            // TODO: Сделать для каждой модели общий флаг на данном этапе не получается сортировать
        }


        if (index === 0) {
            addItemsFinal(index)
        }

        if (index > 0) {

            addItemsFinal(index)
        }

    }
    console.log('Final' , fullRequest)
    // sourceData.map((sourceItem, index) => {
    //
    //
    //
    //
    // })



};

export default CreateFullRequest;