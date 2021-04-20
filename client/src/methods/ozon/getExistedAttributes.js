import React from 'react';

const GetExistedAttributes = (indexItem) => {
    const sourceData  = require('../../data/maxima.json');

    // const [objectRequest, setObjectRequest] = useState(null)

    const arrAllAttr = []

    const arrModels = [
        {name : "Maxima 55 Comfort Plus", img : "http://www.fotolink.su/pic_s/3ea9db5147acc8e97874d25414ff08db.jpg"},
        {name : "Maxima 55 UV",  img : "http://www.fotolink.su/pic_s/270a068ab4a3984a581dab6656c00732.jpg"}
    ]

    const searchFlagGroup = (string) => {
        for (let i = 0; arrModels.length >= i; i++ ) {
            const regex = new RegExp(arrModels[i].name)
            if ( regex.test(string)) {
                return arrModels[i].name
            }
        }
    }

    const capitalizeFirstLetter = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }

    const cleaningBarcode = (barcode) => {
        return barcode.slice(-9)
    }

    const searchImg = (flag) => {
        return arrModels.find(x => x.name === flag).img
    }



    for (let index = 0; indexItem > index; index++) {
        const searchAttr = (
            typeAttr,
            secondIndex = 0,
            valueParam = "value") => {
            return sourceData[index].addin.find(x => x.type === typeAttr).params[secondIndex][valueParam]
        }

        const multiplicationToMm = (unit, value) => {
            if (unit === "см" || unit === "cm" ) {
                return value * 10
            }
        }


        const brand = searchAttr( 'Бренд', 0);

        const name = searchAttr( 'Наименование', 0);
        const description = searchAttr( 'Описание', 0);
        const equipment = searchAttr( 'Комплектация', 0);
        const oxyCof = Math.floor(searchAttr( 'Коэффициент пропускания кислорода', 0, "count")).toString();
        const diameter = Math.floor(searchAttr( 'Диаметр МКЛ', 0, "count")).toString();
        const optPwr = searchAttr( 'Оптическая сила', 0).replace(/([.5]{2}$)/ , ".50" ).replace(/([.0]{2}$)/ , ".00" ); //Добавлял перед значением тавара id-шник для поиска списочных аттребутов
        const radCurvature = searchAttr( 'Радиус кривизны', 0);

        const packWidth = searchAttr( 'Ширина упаковки', 0, "count");
        const packWidthUnit = searchAttr( 'Ширина упаковки', 0, "units") === "см"? "cm" : null ;

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


        const packAmount  = searchAttr('Количество предметов в упаковке', 0).replace(/\D/g,'');
        const wearMode  = capitalizeFirstLetter(searchAttr( 'Режим ношения', 0));
        const daysReplace  = searchAttr( 'Режим замены', 0);
        const packWeight  = searchAttr( 'Вес товара с упаковкой (г)', 0, "count");
        const moistureCont  = searchAttr( 'Влагосодержание', 0, "count").toString();
        const flagGroup = searchFlagGroup(name);
        const barcode  = sourceData[index].nomenclatures[0].variations[0].barcodes[0].toString();
        const article = "100" + cleaningBarcode(barcode);
        const price  = sourceData[index].nomenclatures[0].variations[0].addin[0].params[0].count.toString();
        const image  = searchImg(flagGroup);

        const objRequest = {
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
                image
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
        arrAllAttr.push(objRequest)
    }

    return arrAllAttr

};

export default GetExistedAttributes;