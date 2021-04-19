import React from 'react';

const GetExistedAttributes = (indexItem) => {
    const sourceData  = require('../../data/maxima.json');

    // const [objectRequest, setObjectRequest] = useState(null)


    const arrAllAttr = []


    for (let index = 0; indexItem > index; index++) {
        const searchAttr = (
            typeAttr,
            secondIndex = 0,
            valueParam = "value") => {

            return sourceData[index].addin.find(x => x.type === typeAttr).params[secondIndex][valueParam]
        }

        const id = sourceData[index].id;
        const brand = searchAttr( 'Бренд', 0);
        const name = searchAttr( 'Наименование', 0);
        const description = searchAttr( 'Описание', 0);
        const equipment = searchAttr( 'Комплектация', 0);
        const oxyCof = Math.floor(searchAttr( 'Коэффициент пропускания кислорода', 0, "count")).toString();
        const diameter = Math.floor(searchAttr( 'Диаметр МКЛ', 0, "count"));
        const optPwr = searchAttr( 'Оптическая сила', 0).replace(/[.5]$/ , "50" ).replace(/[.5]$/ , "00" ); //Добавлял перед значением тавара id-шник для поиска списочных аттребутов
        const radCurvature = searchAttr( 'Радиус кривизны', 0);

        const packWidth = searchAttr( 'Ширина упаковки', 0, "count");
        const packWidthUnit = searchAttr( 'Ширина упаковки', 0, "units");

        const packHeight = searchAttr( 'Высота упаковки', 0, "count");
        const packHeightUnit = searchAttr( 'Высота упаковки', 0, "units");

        const packDepth = searchAttr( 'Глубина упаковки', 0, "count");
        const packDepthUnit = searchAttr( 'Глубина упаковки', 0, "units");

        const packAmount  = searchAttr('Количество предметов в упаковке', 0).replace(/\D/g,'');
        const wearMode  = searchAttr( 'Режим ношения', 0);
        const timeDay  = 'Дневной';
        const packWeight  = searchAttr( 'Вес товара с упаковкой (г)', 0, "count");
        const moistureCont  = searchAttr( 'Влагосодержание', 0, "count");
        const barcode  = sourceData[index].nomenclatures[0].variations[0].barcodes[0];
        const price  = sourceData[index].nomenclatures[0].variations[0].addin[0].params[0].count;
        const image  = sourceData[index].nomenclatures[0].addin[1].params[0].value;

        const objRequest = {
            variable : {
                id,
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
                image
            },
            list : {
                oxyCof,
                optPwr,
                timeDay,
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