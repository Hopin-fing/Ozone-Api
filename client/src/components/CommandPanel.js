import React from 'react';
import CreateFullRequest from "../methods/ozon/import/createFullRequest";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchProductInfo, getPriceJournal,
    getPrices,
    importProduct,
    openTables, resetData,
    sendPrice,
    testRequest
} from "../redux/actions/products";
import {useHttp} from "../hooks/http.hook";
import moment from "moment";

const data = require("../data/responseData/sourcePrices.json")

const CommandPanel = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(({products}) => products.isOpen);
    const isLoading = useSelector(({products}) => products.loading);
    const listModels = useSelector(({products}) => products.listModels);
    const pricesJournal = useSelector(({products}) => products.pricesJournal);

    const {request} = useHttp()

    const bodyRequestInfoList = {
        "offer_id": [],
        "product_id": [],
        "sku": []
    }

    const testBody = {
        "offer_id": "100175508539",
        "product_id": 73438434,
        "sku": 0
    }


    const productBody = {
        "offer_id": "100175508539",
        "product_id": 73438434,
        "sku": 0
    }

    const priceBody = {
        "page": 1,
        "page_size": 1000
    }


    const existListModels = Object.keys(listModels).length

    const onOpenTables = async () => {
        try {
            dispatch(openTables())
            // const dataPrices = await request("/api/price/get_price")
            // dispatch(getPriceJournal(dataPrices.docs))
            dispatch(fetchProductInfo(data))
        }catch (e) {
            console.log("Ошибка :" , e)
        }

    }

    const handlerImportRequest = () => {
        const request = CreateFullRequest()
        dispatch(importProduct(request))
    }

    const handlerTestRequest = () => {
        dispatch(testRequest(testBody))
    }

    const handlerGetPrices = () => {
        dispatch(getPrices(productBody))
    }

    const handlerResetData = () => {
        dispatch(resetData())
        try {
            dispatch(openTables())
            // const dataPrices = await request("/api/price/get_price")
            // dispatch(getPriceJournal(dataPrices.docs))
            dispatch(fetchProductInfo(data))
        }catch (e) {
            console.log("Ошибка :" , e)
        }
    }


    const handlerSendPrices = async () => {
        const pricesBody = []
        const oldPricesJournal = pricesJournal


        const createPrice = (element, price) => {
            const priceString = price.toString()
            const result = {
                "offer_id": element["offer_id"],
                "old_price": "0",
                "premium_price": "0",
                "price": priceString,
                "product_id": element["id"]
            }
            // const actualData = moment().format('MMMM Do YYYY, h:mm:ss a');
            // const elementPriceJournal = oldPricesJournal.find(x => x.art === element["offer_id"])
            // const dataObj = {
            //     data : actualData,
            //     price : priceString
            // }
            // const productObj = {
            //     history : [dataObj],
            //     art : element["offer_id"],
            //     name : element["name"]
            // }
            // if (elementPriceJournal)  {
            //     elementPriceJournal["history"].push(dataObj)
            //     if(elementPriceJournal["history"].length > 10) elementPriceJournal["history"].slice(-10)
            // }
            // if (!elementPriceJournal) oldPricesJournal.push(productObj)
            pricesBody.push(result)
        }

        Object.keys(listModels).forEach(item => {
            listModels[item].forEach(element => {
                let newPrice = element["price"]
                switch (true){
                    case (element["price"] < element["minimalPriceForIncome"]
                        && !(element["price_index"] >= 1.6) ) :
                        createPrice(element, element["minimalPriceForIncome"]);
                        break;
                    case (element["price_index"] > 1.7
                        && element["price"] > element["minimalPriceForIncome"] ):
                        newPrice -= Math.round((newPrice/100) * 5)
                        createPrice(element, newPrice);
                        break;
                    case (element["price_index"] === 1.7
                        && element["price"] > element["minimalPriceForIncome"] ):
                        newPrice -= Math.round((newPrice/100) * 2)
                        createPrice(element, newPrice);
                        break;
                    case (element["price_index"] < 1.0):
                        newPrice +=  Math.round((newPrice/100) * 5)
                        createPrice(element, newPrice);
                        break;
                    case (element["price_index"] === 1.0
                        || element["price_index"] <= 1.5):
                        newPrice +=  Math.round((newPrice/100) * 2)
                        createPrice(element, newPrice);
                        break;
                    default:
                        return
                }
            })
        })
        let requestJourney = []
        // for (let i = 0; oldPricesJournal.length > i; i++) {
        //     requestJourney.push(oldPricesJournal[i])
        //     if (requestJourney.length === 250) {
        //         const responseServer = await request("/api/price/send_price", "POST", requestJourney)
        //         console.log(responseServer)
        //         requestJourney = []
        //     }
        // }
            // const responseServer = await request("/api/price/send_price", "POST", requestJourney)
            // console.log(responseServer)
            dispatch(sendPrice(pricesBody))
    }




    return (
        <div className="col s8 offset-s2">
            <div className="card blue-grey darken-2">
                <div className="card-content white-text">
                    <span className="card-title">Переформатирование запроса в запрос API OZONE</span>

                </div>
                <div className="card-action center">
                    <button
                        className="green waves-effect waves-light btn darken-3"
                        onClick={handlerImportRequest}
                        // disabled={isLoading}
                        disabled={true}

                    >Импортировать товары</button>


                </div>
                <div className="card-action center">
                    <button
                        className="orange waves-effect waves-light btn darken-3"
                        onClick={handlerGetPrices}
                        disabled={!existListModels || isLoading}

                    >Получить информацию о неправильных ценах</button>


                </div>
                <div className="card-action center">
                    <button
                        className="yellow waves-effect waves-light btn darken-3"
                        onClick={handlerSendPrices}
                        disabled={!existListModels || isLoading}

                    >Отправить новую цену</button>

                </div>

                <div className="card-action center">
                    <button
                        className="purple waves-effect waves-light btn darken-3"
                        onClick={handlerTestRequest}

                    >Тестовый запрос</button>

                </div>
            </div>

            <div className="card">
                <div className="card-action center brown lighten-5">
                    {isOpen ? <button
                        className="indigo waves-effect waves-light btn  darken-1"
                        onClick={handlerResetData}
                    >Перезагрузить</button> :
                        <button
                            className="indigo waves-effect waves-light btn  darken-1"
                            onClick={onOpenTables}
                        >Загрузить таблицу</button>
                    }

                </div>
            </div>

        </div>

    );
};

export default CommandPanel;