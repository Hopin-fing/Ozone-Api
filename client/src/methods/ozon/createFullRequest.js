import React from 'react';
import GetExistedAttributes from "./getExistedAttributes";
import _ from "lodash";
import RequestAttributes from "./requestAttributes";



const CreateFullRequest = () => {


    const example  = require('./data/exampleRequestMonth.json')
    const sourceData  = require('../../data/maxima.json')
    const oxyCofData = require('../../data/ozonData/oxygen_transmission.json')
    const optPwrData = require('../../data/ozonData/optical_power.json')
    const radCurvatureData = require('../../data/ozonData/radius_curvature.json')
    const packAmountData = require('../../data/ozonData/pack_amount.json')

    let fullRequest = {items: []}

    const newData = GetExistedAttributes(sourceData.length)

    const arrAttrId = {
        oxyCof : 7709,
        optPwr : 7701,
        radCurvature : 7702,
        packAmount : 7704,
        // wearMode : 7696
        // timeDay : 7696
    }

    // console.log(newData)
    // console.log('Value',  newData[0].list.oxyCof)


    // console.log( newData[0].list.oxyCof)
    // console.log(newData[0].list.optPwr, typeof newData[0].list.optPwr)
    // console.log(optPwrData.result.find(x => x.value === newData[0].list.optPwr).id)

    let newIndex = 0
    let numberItem = 100;

    sourceData.map((sourceItem, index) => {

            if (numberItem > index) {
                fullRequest.items.push(_.cloneDeep(example.items[0]))

                let newItem = newData[newIndex].variable,
                    itemFinal = fullRequest.items[newIndex]

                const searchAttrById = idValue => {
                    return itemFinal.attributes.find(x => x.id === idValue).values[0]
                }

                const searchAttrByIdList = (item, source) => {
                    return source.result.find(x => x.value === newData[newIndex].list[item]).id
                }

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
                    searchAttrById(7706).value = newItem.moistureCont

                    searchAttrById(7709).value = newData[newIndex].list.oxyCof
                    searchAttrById(7709).dictionary_value_id = searchAttrByIdList('oxyCof', oxyCofData)

                    searchAttrById(7701).value = newData[newIndex].list.optPwr
                    searchAttrById(7701).dictionary_value_id = searchAttrByIdList('optPwr', optPwrData)

                    searchAttrById(7702).value = newData[newIndex].list.radCurvature
                    searchAttrById(7702).dictionary_value_id = searchAttrByIdList('radCurvature', radCurvatureData)

                    searchAttrById(7704).value = newData[newIndex].list.packAmount
                    searchAttrById(7704).dictionary_value_id = searchAttrByIdList('packAmount', packAmountData)

                    // searchAttrById(7696).value = newData[newIndex].list.wearMode
                    // searchAttrById(7696).dictionary_value_id = searchAttrByIdList('wearMode', packAmountData)

                }

                if (newIndex === 0) {
                    addItemsFinal()
                }

                if (newIndex > 0) {
                    addItemsFinal()
                }
                newIndex++
            }

        if (numberItem === index) {
            console.log(fullRequest)
            numberItem += 100
            fullRequest = {items: []}

            newIndex -= 100


        }
            if(sourceData.length ===  index + 1) {
                console.log(fullRequest)
            }

    })






};

export default CreateFullRequest;