import React from 'react';
import AttributesLens from "./typeProduct/attributesLens";

const GetAttributes = (indexItem, sourceData) => {

    // const [objectRequest, setObjectRequest] = useState(null)

    const arrAllAttr = []

    const arrModels = [
        {flag : "Maxima 55 Comfort Plus", type : "прозрачные", id: "17035115", img : "http://images.vfl.ru/ii/1619076159/b194471e/34175967.jpg"},
        {flag : "Maxima 55 UV", type : "прозрачные", id: "17035115",  img : "http://images.vfl.ru/ii/1619076251/0074008c/34175979.jpg"},
        {flag : "Soflens Natural Colors", type : "цветные", id : "17035114",  img : "http://images.vfl.ru/ii/1619076251/0074008c/34175979.jpg"},
        {flag : "Optima FW", type : "прозрачные", id: "17035115",  img : "http://images.vfl.ru/ii/1619076251/0074008c/34175979.jpg"},
        {flag : "BioTrue Oneday", type : "однодневные", id : "17035118",  img : "http://images.vfl.ru/ii/1619076251/0074008c/34175979.jpg"},
        {flag : "Soflens 59", type : "прозрачные", id : "17035115",  img : "http://images.vfl.ru/ii/1619076251/0074008c/34175979.jpg"},
        {flag : "PureVision", type : "прозрачные", id : "17035115",  img : "http://images.vfl.ru/ii/1619076251/0074008c/34175979.jpg"},
        {flag : "ULTRA", type : "прозрачные", id : "17035115",  img : "http://images.vfl.ru/ii/1619076251/0074008c/34175979.jpg"},
        {flag : "SofLens Daily Disposable", type : "однодневные", id: "17035118",  img : "http://images.vfl.ru/ii/1619076251/0074008c/34175979.jpg"},
        {flag : "ReNu Multipurpose Solution", type : "раствор", id: "17035116",  img : "http://images.vfl.ru/ii/1619076251/0074008c/34175979.jpg"}
    ]

    // const arrIdType = [
    //     {name : "прозрачные", id : "17035115"},
    //     {name : "цветные", id : "17035114"},
    //     {name : "однодневные", id : "17035118"},
    //     {name : "Раствор для контактных линз", id : "17035116"},
    //
    // ]


    const searchGlobalFlag = (string) => {
        for (let i = 0; arrModels.length >= i; i++ ) {
            const regex = new RegExp(arrModels[i].flag)
            if ( regex.test(string)) {
                return arrModels[i].flag
            }
        }

    }

    const capitalizeFirstLetter = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }

    const cleaningBarcode = (barcode) => {
        return barcode.slice(-9)
    }

    const searchValue = (value, inputKey, outputKey) => {
        return arrModels.find(x => x[inputKey] === value)[outputKey]
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

        const isSolutions = checkSolutions(typeProduct)

        // let name = searchAttr( 'Ключевые слова').params;


        const brand = searchAttr( 'Бренд');
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

        const barcode  = sourceData[index].nomenclatures[0].variations[0].barcodes[0].toString();
        const article = "100" + cleaningBarcode(barcode);

        const price  = sourceData[index].nomenclatures[0].variations[0].addin[0].params[0].count.toString();

        if (isSolutions) {
            const name = searchAttr( 'Ключевые слова', 2,);

            const flagGroup = searchGlobalFlag(name);
            const image  = searchValue(flagGroup,"flag", "img");

            const typeProductId = searchValue(flagGroup,"flag", "id");

            const objRequest = {
                isSolutions,

                variable : {
                    article,
                    brand,
                    name,
                    description,
                    equipment,
                    // packWidth,
                    // packWidthUnit,
                    packHeight,
                    packHeightUnit,
                    packDepth,
                    packDepthUnit,
                    barcode,
                    price,
                    image,
                    typeProductId
                },

            }

           arrAllAttr.push(objRequest)
        }

        if (!isSolutions) {
            const nameOriginal = searchAttr( 'Наименование');
            const flagGroup = searchGlobalFlag(nameOriginal);
            const name = flagGroup;
            const image  = searchValue(flagGroup,"flag", "img");
            const typeProductId = searchValue(flagGroup,"flag", "id");

            const packWidth = searchAttr( 'Ширина упаковки', 0, "count");
            const packWidthUnit = searchAttr( 'Ширина упаковки', 0, "units") === "см"? "cm" : null ;

            const oxyCof = Math.floor(searchAttr( 'Коэффициент пропускания кислорода', 0, "count")).toString();
            const diameter = Math.floor(searchAttr( 'Диаметр МКЛ', 0, "count")).toString();
            const oldFormatOptPwr = searchAttr( 'Оптическая сила', 0)
            const optPwr = doOzonFormat("Оптическая сила", oldFormatOptPwr)
            const radCurvature = searchAttr( 'Радиус кривизны');


            const packAmount  = searchAttr('Количество предметов в упаковке').replace(/\D/g,'');
            const wearMode  = capitalizeFirstLetter(searchAttr( 'Режим ношения'));
            const daysReplace  = doOzonFormat("Режим замены", searchAttr( "Режим замены"));
            const packWeight  = searchAttr( 'Вес товара с упаковкой (г)', 0, "count");
            const moistureCont  = searchAttr( 'Влагосодержание', 0, "count").toString();
            const modelProduct = `Контактные линзы ${brand} ${name}`

            const isColored = searchValue(flagGroup,"flag", "type") === "цветные"


            // console.log(isColored)

            const objRequest = {
                isSolutions,
                variable : {
                    article,
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
                    modelProduct
                },
                list : {
                    oxyCof,
                    optPwr,
                    daysReplace,
                    radCurvature,
                    packAmount,
                    wearMode

                }

            }
            // if(isColored)
            arrAllAttr.push(objRequest)
        }

    }

    return arrAllAttr

};

export default GetAttributes;