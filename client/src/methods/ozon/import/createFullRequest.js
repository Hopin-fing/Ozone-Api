import GetAttributes from "./getAttributes";
import _ from "lodash";

const example = require('./templates/requestImport.json')
const sourceData = require('../../../data/productDB/Alcon.json')
const oxyCofData = require('../../../data/ozonData/oxygen_transmission.json')
const optPwrData = require('../../../data/ozonData/optical_power.json')
const radCurvatureData = require('../../../data/ozonData/radius_curvature.json')
const packAmountData = require('../../../data/ozonData/pack_amount.json')
const wearModeData = require('../../../data/ozonData/wear_mode.json')
const daysReplaceData = require('../../../data/ozonData/days_replace.json')
const axData = require('../../../data/ozonData/id_ax.json')
const cylData = require('../../../data/ozonData/id_cyl.json')
const arrCountry = require("../../../data/ozonData/country.json")


const CreateFullRequest = () => {


    const mainRequest = [] // В main запрос помещаютсфя запросы состоящие из  100 итемов и меньше(если больше итемов
    // для достижения 100  не осталось) и в CommandPanel вызываются
    let fullRequest = {"items": []}

    const newData = GetAttributes(sourceData.length , sourceData)

    // const arrAttrId = {      Id для запросов по атрибутам оставил для справочной информации
    //     oxyCof : 7709,
    //     optPwr : 7701,
    //     radCurvature : 7702,
    //     packAmount : 7704,
    //     wearMode : 7696,
    //     daysReplace : 7694
    // }
    let newIndex = 0 // добавил новый индекс для того чтобы обнулять его при достижении итемов в запросе до сотки, а исходный индекс будет с того же место перебирать элементы бд
    let numberItem = 100;

    console.log("sourceData.length:", sourceData.length)

    sourceData.forEach((sourceItem, index) => {
        const createNewProduct = () => {
            if(!newData[index]){
                //Итемы пустые из-за того что в бд  есть товары с пустым штрих кодом и растворы которые в импорт мы не добавляем
                newIndex++
                return fullRequest.items.push({})
            }
            fullRequest.items.push(_.cloneDeep(example.items[0]))
            try{
                let newItem = newData[index]

            } catch (e) {
                console.log(newData)
            }

            let newItem = newData[index],
                itemFinal = fullRequest.items[newIndex],
                isSolutions = newData[index].isSolutions,
                isColored = newData[index].isColored,
                isForAstigmatism = newData[index].isForAstigmatism



            const capitalize = (value) => {
                if (typeof value !== 'string') return ''
                return value.charAt(0).toUpperCase() + value.slice(1)
            }


            const addItemsFinal = () => {
                const searchAttrById = idValue => {
                    return itemFinal.attributes.find(x => x.id === idValue).values[0]
                }

                const searchAttrByIdList = (item, source) => {
                    if (item === "wearMode") {  //Из вайлдбериса приходит строка с мелкими буквами и мы тут делаем с первой большой буквой
                        return source.result.find(x => capitalize(x.value) === newData[index][item]).id
                    }
                    if (item !== "wearMode") {

                        try{
                            return (source.result.find(x => x.value === newData[index][item].trim()).id)
                        }catch (e) {
                            console.log("item: ", [item])
                            console.log("index: ", [index])
                            console.log("newData[index][item] ",  newData[index][item])
                        }
                        return source.result.find(x => x.value === newData[index][item].trim()).id
                    }
                }

                let createAttrObj = (idCategory, dictionaryValueId, value) => { //Происходит добавление нового атребута в значение ключа "attributes"
                    const arrComplexValue = []
                    if(Array.isArray(dictionaryValueId) && idCategory === 4195)  {
                        let stringUrl = ""
                        dictionaryValueId.forEach( (item, indexValue) => {
                            0 === indexValue ? stringUrl += item : stringUrl += " " + item
                        })
                        return {
                            "complex_id": 0,
                            "id": idCategory,
                            "values": [{
                                "dictionary_value_id": 0,
                                "value": stringUrl
                            }]
                        }
                    }
                    if(Array.isArray(dictionaryValueId))  {

                        dictionaryValueId.forEach( item => {
                            arrComplexValue.push({
                                "dictionary_value_id": item,
                                "value": ""
                            })
                        })
                        return {
                            "complex_id": idCategory,
                            "id": idCategory,
                            "values": arrComplexValue
                        }
                    }
                    if(!Array.isArray(dictionaryValueId)) {
                        return {
                            "complex_id": 0,
                            "id": idCategory,
                            "values": [{
                                "dictionary_value_id": dictionaryValueId,
                                "value": value
                            }
                            ]
                        }
                    }
                }

                itemFinal.barcode = newItem.barcode

                if (  newItem.barcode === "730821680654") {
                    console.log("name ", newItem.name)
                }

                itemFinal.depth = newItem.packDepth
                itemFinal["dimension_unit"] = newItem.packDepthUnit
                itemFinal.height = newItem.packHeight
                itemFinal.name = newItem.name
                itemFinal.price = newItem.price
                if (typeof newItem.image == "object" && "main" in newItem.image) { //Происходит фильтрация внутри объекта с ключом "img" в файле "modelsinfo.json"
                    itemFinal.images.push(newItem.image["main"])
                    if (isColored) {
                        try {
                            const arrAllImages = newItem.image["additional"]["allColors"]
                            const arrEveryImages = newItem.image["additional"][newItem.colorName]
                            if (arrAllImages){
                                itemFinal.attributes.push(createAttrObj(4195, arrAllImages, ""))
                            }

                            itemFinal.attributes.push(createAttrObj(4195, arrEveryImages, ""))

                            // newItem.image["additional"][newItem.colorName].forEach((element) => {
                            //     itemFinal.images.push(element)
                            // })
                        } catch {}

                    }
                    if(!isColored) {
                        // console.log("images has!!")
                        const arrAddImages = newItem.image["additional"]
                        itemFinal.attributes.push( createAttrObj(4195, arrAddImages, ""))

                        // newItem.image["additional"].forEach((element) => {
                        //     itemFinal.images.push(element)
                        // })
                    }
                    searchAttrById(4194).value = newItem.image["main"]

                }
                if (typeof newItem.image === "object" && "30" in newItem.image) {
                    searchAttrById(4194).value = newItem.image[newData[index].packAmount]
                }
                if (typeof newItem.image !== "object") {
                    itemFinal.images.push(newItem.image)
                    searchAttrById(4194).value = newItem.image
                }

                itemFinal.weight = newItem.packWeight
                itemFinal.width = newItem.packWidth
                itemFinal["offer_id"] = newItem.article
                itemFinal["category_id"] = newItem.typeProductId

                searchAttrById(85).value = newItem.brand
                searchAttrById(4191).value = newItem.description
                searchAttrById(4384).value = newItem.equipment



                // const addEveryItem = (value, idCategory, attrValue = "") => {
                //     if(Array.isArray(value)) {
                //         value.forEach( item => {
                //             itemFinal.attributes.push(createAttrObj(idCategory, item, attrValue, idCategory))
                //         })
                //     }
                //     if(!Array.isArray(value)) {
                //
                //
                //         itemFinal.attributes.push(createAttrObj(idCategory, value, attrValue))
                //     }
                // }


                if (!isSolutions) {

                    searchAttrById(7703).value = newItem.diameter
                    searchAttrById(7706).value = newItem.moistureCont

                    searchAttrById(9048).value = newItem.modelProduct
                    searchAttrById(10289).value = newItem.flagGroup

                    // if(newItem.flagGroup === "Freshlook Colors"
                    //     || newItem.flagGroup === "Freshlook ColorBlends"
                    //     || newItem.flagGroup === "Freshlook Dimensions"
                    // ) console.log("flag: ", newItem.flagGroup)
                    //Добавление в финальный запрос значений требующий как value так и id

                    searchAttrById(7709).value = newData[index].oxyCof
                    searchAttrById(7709).dictionary_value_id = searchAttrByIdList('oxyCof', oxyCofData)


                    searchAttrById(7701).value = newData[index].optPwr
                    searchAttrById(7701).dictionary_value_id = searchAttrByIdList('optPwr', optPwrData)


                    searchAttrById(7702).value = newData[index].radCurvature
                    searchAttrById(7702).dictionary_value_id = searchAttrByIdList('radCurvature', radCurvatureData)

                    searchAttrById(7704).value = newData[index].packAmount
                    searchAttrById(7704).dictionary_value_id = searchAttrByIdList('packAmount', packAmountData)


                    searchAttrById(7696).value = newData[index].wearMode
                    searchAttrById(7696).dictionary_value_id = searchAttrByIdList('wearMode', wearModeData)

                    searchAttrById(7694).value = newData[index].daysReplace
                    searchAttrById(7694).dictionary_value_id = searchAttrByIdList('daysReplace', daysReplaceData)

                    searchAttrById(7694).dictionary_value_id = searchAttrByIdList('daysReplace', daysReplaceData)

                    searchAttrById(8229).dictionary_value_id = newItem.idTypeAttr
                }

                if(newItem.idFeatures) itemFinal.attributes.push(createAttrObj(7707, newItem.idFeatures, ""))
                if(newItem.idMaterial) itemFinal.attributes.push(createAttrObj(7708, newItem.idMaterial, ""))
                if(newItem.isMultifocal) itemFinal.attributes.push(createAttrObj(9237, newItem.idAddition, ""))

                itemFinal.attributes.push(createAttrObj(7705,30682, ""))
                itemFinal.attributes.push(createAttrObj(4389,newItem.idCountry, ""))
                itemFinal.attributes.push(createAttrObj(8789,0, "Регистрационное удостоверение"))
                itemFinal.attributes.push(createAttrObj(8790,0, newItem.urlPdf))
                itemFinal.attributes.push(createAttrObj(95,0, newItem.line))

                if (isColored) {
                    itemFinal.attributes.push(createAttrObj(59, newItem.colorId, ""))
                    itemFinal.attributes.push(createAttrObj(8729, newItem.typeColorLen, ""))
                    itemFinal.attributes.push(createAttrObj(10096, newItem.colorProductNameId, ""))
                    itemFinal.attributes.push(createAttrObj(10097, 0, newItem.colorName))
                }

                if (isForAstigmatism) {

                    itemFinal.attributes.push(createAttrObj(8745, searchAttrByIdList('lensesAx', axData), ""))
                    itemFinal.attributes.push(createAttrObj(8746, searchAttrByIdList('lensesCYL', cylData), ""))
                }


                if (!isColored) {
                    itemFinal.attributes.push(createAttrObj(10096, 61572, "Прозрачный"))
                    itemFinal.attributes.push(createAttrObj(10097, 0, "Прозрачный"))

                }

            }
            if (index >= 0) {
                addItemsFinal()
            }
            newIndex++
        }

        if (numberItem === index) {
            let data = {
                "id" : mainRequest.length + 1,
                "request" : _.cloneDeep(fullRequest)
            }
            mainRequest.push(data)

            console.log(data)

            numberItem = numberItem + 100
            fullRequest = {items: []}
            newIndex -= 100
        }

        if (numberItem > newIndex) {
            createNewProduct()
        }


        if (sourceData.length === index + 1) {
            let data = {
                "id" : mainRequest.length + 1,
                "request" : _.cloneDeep(fullRequest)
            }
            mainRequest.push(data)

            console.log(data)
        }
    })

    return mainRequest


};

export default CreateFullRequest;