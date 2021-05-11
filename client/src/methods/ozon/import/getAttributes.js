import React from 'react';

const GetAttributes = (indexItem, sourceData) => {

    const arrModels = require("./dataTransferAttributes/modelsInfo.json")
    const arrColors = require("./dataTransferAttributes/modelsColor.json")
    const arrIdColorOzon = require("../../../data/ozonData/nameColor.json")
    const arrAddition = require("../../../data/ozonData/addition.json")
    const arrFlagCurrent = require("./dataTransferAttributes/modelsFlagCurrect.json")

    const arrAllAttr = []

    // const arrIdType = [
    //     {name : "прозрачные", id : "17035115"},
    //     {name : "цветные", id : "17035114"},
    //     {name : "однодневные", id : "17035118"},
    //     {name : "Раствор для контактных линз", id : "17035116"},
    //
    // ]





    const searchGlobalFlag = (string, isColoredWB, brand) => {
        const checkFlag  = () => {
            let result
            arrFlagCurrent.forEach (item => {
                if(string.includes(item["flagOld"])) {
                    result = item["flagNew"]
                }

            })
            return result
        }

        if(brand === "Alcon" && isColoredWB === "цветные") {
            return "Air Optix Colors"
        }

        // if(string.includes("Air Optix HydraGlyde")) {
        //     return "Air Optix plus HydraGlyde"
        // }
        // if(string.includes("night & day")) {
        //     return "Air Optix Night & Day"
        // }
        // if(string.includes("Totalone")) {
        //     return "Dailies Total1"
        // }

        for (let i = 0; arrModels.length >= i; i++ ) {
            try{
                const regex = new RegExp(arrModels[i].flag)
                if ( regex.test(string)) {
                    return arrModels[i].flag
                }
            }catch (e) {
               return checkFlag()
            }
        }




    }

    const searchColor = (string) => {
        try {
            for (let i = 0; arrColors.length > i; i++) {


                const currentValue = string
                    .replace(/[ие]{2}$/g, "ий ")
                    .replace(/[бые]{3}$/g, "бой ")
                    .replace(/[рые]{3}$/g, "рый ")
                    .replace(/[дный]{4}$/g, "д ")
                    .toLowerCase()


                if (currentValue.includes(arrColors[i].color.toLowerCase())) return {
                    color: arrColors[i].colorOzon,
                    id: arrColors[i].id
                }

                if (currentValue.includes(arrColors[i].colorOzon)) return {
                    color: arrColors[i].colorOzon,
                    id: arrColors[i].id
                }

                // const arrEndWord = {
                //     "ие" : "ий ",
                //     "бые" : "бой ",
                //     "рые" : "рый "
                // }
                // const rightEnd =  Object.keys(arrEndWord).forEach( item => {
                //     const valueRegex = new RegExp(item, "g")
                //     if (string.match(valueRegex)) {
                //         console.log("item ",item)
                //         return item
                //     }
                // })



            }
        }catch (e) {
            console.log("color ", string)
        }
    }

    const capitalizeFirstLetter = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }

    const cleaningBarcode = (barcode) => {

        if(barcode === null) {
            return null
        }
        return barcode.slice(-9)
    }

    const searchValue = (value, inputKey, outputKey,brand = null, count = false ) => {

        if(brand === "Alcon" && typeof arrModels.find(x => x[inputKey] === value) === undefined) {
            value = "Air Optix Colors"
            return arrModels.find(x => x[inputKey] === value)[outputKey]

        }
        try{
            const result = arrModels.find(x => x[inputKey] === value)[outputKey]
        } catch (e) {
            console.log(value)
            console.log(outputKey)
        }

        const result = arrModels.find(x => x[inputKey] === value)[outputKey]
        if(typeof result === "object" && !("main" in result)) {
            return result[count]
        }
        return result
    }


    for (let index = 0; indexItem > index; index++) {

        const searchAttr = (
            typeAttr,
            secondIndex = 0,
            valueParam = "value") => {

            const attr = sourceData[index].addin.find(x => x.type === typeAttr)

            if (( typeof attr === 'undefined') && typeAttr === "Оптическая сила") {
                return "0.00"
            }
            try{
                const result = attr.params[secondIndex][valueParam]
            }
            catch (e) {
                return null
            }
            const result = attr.params[secondIndex][valueParam]
            if (result !== undefined) return result
        }

        const multiplicationToMm = (unit, value) => {
            if (unit === "см" || unit === "cm" ) {
                return value * 10
            }
        }

        const doOzonFormat = (attr, oldFormat) => {
            if(attr === 'Оптическая сила')    {
                if(oldFormat === "00" ) {
                    return "0.00"
                }
                return oldFormat.replace(/(\.5$)/ , ".50" ).replace(/(\.0$)/ , ".00" );
            }

            if(attr === 'Режим замены') {
                if (oldFormat === "1 день") {
                    return "Однодневные"
                }
                return oldFormat
            }
        }
        const typeProduct =  sourceData[index].object

        const checkSolutions = (type) => {
            return type === "Растворы для контактных линз"
        }

        const searchAddition = (string) => {
            let result = ''
            arrAddition.result.forEach(element => {
                if(element.value === "MID") element.value = "MED"
                if(string.includes(element.value)) result = element.id
            })

            return result
        }

        const isSolutions = checkSolutions(typeProduct)


        const brand = searchAttr( 'Бренд').replace(/\+/ , " + " ); // Плюс добавлен для
        // именения компании Bausch+Lomb на + с отступами между словами

        const description = searchAttr( 'Описание');
        const equipment = searchAttr( 'Комплектация');



        const packHeightUnit = searchAttr( 'Высота упаковки', 0, "units");
        const packHeight = multiplicationToMm(
            packHeightUnit,
            searchAttr( 'Высота упаковки', 0, "count"),
        );

        const packDepthUnit = searchAttr( 'Глубина упаковки', 0, "units");
        const packDepth = multiplicationToMm(
            packDepthUnit,
            searchAttr( 'Глубина упаковки', 0, "count")
        )

        let barcode  = sourceData[index].nomenclatures[0].variations[0].barcodes;
        let isEmpty = false

        if(barcode.length !== 0) {
            barcode = barcode[0].toString()
        }
        if(barcode.length === 0) {
            isEmpty = true
        }



        const article = isEmpty ? null : "100" + cleaningBarcode(barcode);

        const price  = sourceData[index].nomenclatures[0].variations[0].addin[0].params[0].count.toString();

        // if (isSolutions) {
        //     const name = searchAttr( 'Ключевые слова', 2,);
        //
        //     const flagGroup = searchGlobalFlag(name);
        //     let image  = searchValue(flagGroup,"flag", "img");
        //
        //     const typeProductId = searchValue(flagGroup,"flag", "id");
        //
        //     const objRequest = {
        //         isSolutions,
        //         article,
        //         brand,
        //         name,
        //         description,
        //         equipment,
        //         packHeight,
        //         packHeightUnit,
        //         packDepth,
        //         packDepthUnit,
        //         barcode,
        //         price,
        //         image,
        //         typeProductId
        //
        //     }
        //
        //    arrAllAttr.push(objRequest)
        // }

        if (!isSolutions && !isEmpty) {
            const nameOriginal = searchAttr( 'Наименование');
            try {
                const isColorWB = searchAttr( 'Тип линз')
            } catch(e) {
                console.log(nameOriginal)
                console.log(barcode)
            }
            const isColorWB = searchAttr( 'Тип линз')
            const flagGroup = searchGlobalFlag(nameOriginal, isColorWB, brand);



            let name = flagGroup;

            const typeProductId = searchValue(flagGroup,"flag", "id", brand);

            const packWidth = searchAttr( 'Ширина упаковки', 0, "count");
            const packWidthUnit = searchAttr( 'Ширина упаковки', 0, "units") === "см"? "cm" : null ;

            const oxyCof = Math.floor(searchAttr( 'Коэффициент пропускания кислорода', 0, "count")).toString();
            const diameter = Math.floor(searchAttr( 'Диаметр МКЛ', 0, "count")).toString();
            const radCurvature = searchAttr( 'Радиус кривизны');
            const oldFormatOptPwr = searchAttr( 'Оптическая сила', 0)
            const optPwr = doOzonFormat("Оптическая сила", oldFormatOptPwr)

            const packAmount  = searchAttr('Количество предметов в упаковке') ? searchAttr('Количество предметов в упаковке').replace(/\D/g,'') : null;

            const wearMode  = capitalizeFirstLetter(searchAttr( 'Режим ношения'));
            const daysReplace  = doOzonFormat("Режим замены", searchAttr( "Режим замены"));
            const packWeight  = searchAttr( 'Вес товара с упаковкой (г)', 0, "count");
            const moistureCont  = searchAttr( 'Влагосодержание', 0, "count").toString();
            const modelProduct = `Контактные линзы ${brand} ${name}`

            const image  = searchValue(flagGroup,"flag", "img", brand, packAmount);

            name += `  / ${optPwr}/ ${radCurvature}/` // Дополнительная информация к названию

            const idMaterial = searchValue(flagGroup,"flag", "idMaterial",  brand);
            const idFeatures = searchValue(flagGroup,"flag", "features",  brand);
            const idCountry = searchValue(flagGroup,"flag", "countryId",  brand);
            const urlPdf = searchValue(flagGroup,"flag", "urlPdf",  brand);
            const isColored = searchValue(flagGroup,"flag", "type",  brand) === "цветные"
            const isMultifocal = nameOriginal.includes("мультифокальные")
            const isForAstigmatism = nameOriginal.includes("астигматизм")




            const objRequest = {
                isMultifocal,
                isForAstigmatism,
                isSolutions,
                isColored,
                idMaterial,
                idCountry,
                idFeatures,
                article,
                urlPdf,
                brand,
                name,
                description,
                equipment,
                diameter,
                packWidth,
                packWidthUnit,
                packHeight,
                packHeightUnit,
                packDepth,
                packDepthUnit,
                packWeight,
                moistureCont,
                barcode,
                price,
                flagGroup,
                image,
                typeProductId,
                modelProduct,
                oxyCof,
                optPwr,
                daysReplace,
                radCurvature,
                packAmount,
                wearMode

            }
            if(isMultifocal) objRequest.idAddition = searchAddition(nameOriginal)
            if(isColored) {
                const colorInfo = searchColor(nameOriginal);
                try {
                    const colorName = colorInfo.color

                }catch (e) {
                    console.log("colorInfo ", colorInfo)
                    console.log("colorName ", nameOriginal)
                }
                const colorName = colorInfo.color
                const colorId = colorInfo.id

                objRequest.colorName = colorName
                objRequest.colorId = colorId
                objRequest.colorProductNameId = arrIdColorOzon.result.find(x => x.value === colorName).id
            }
            if(isForAstigmatism) {

                const lensesAx = searchAttr( "Ось линзы");
                const lensesCYL = searchAttr("Оптическая сила цилиндра")

                objRequest.lensesAx = lensesAx
                objRequest.lensesCYL = lensesCYL


                if(objRequest.lensesAx === null) {
                    objRequest.lensesAx = nameOriginal
                        .replace(/^\D*\S*(?!AX:)/g, "")
                        .replace(/( CYL:\S*\s+\D*)/g, "")
                        .replace(/ \/\D*/g, "")
                }

                if(objRequest.lensesCYL === null) {
                    objRequest.lensesCYL = nameOriginal
                        .replace(/^\D*\S*(?!CYL:)/g, "")
                        .replace(/[^,]*$/g, "")
                        .replace(/ CYL:/g, "")
                        .replace(/,/g, "")
                }

            }

            arrAllAttr.push(objRequest)
        }

    }

    return arrAllAttr

};

export default GetAttributes;