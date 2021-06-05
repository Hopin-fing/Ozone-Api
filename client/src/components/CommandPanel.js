import React, {useEffect, useState} from 'react';
import CreateFullRequest from "../methods/ozon/import/createFullRequest";
import {useDispatch, useSelector} from "react-redux";
import {
    endLoading,
    fetchProductInfo, getPriceJournal,
    getPrices,
    importProduct, importStocks,
    openTables, resetData,
    sendPrice, setLoading,
    testRequest
} from "../redux/actions/products";
import {useHttp} from "../hooks/http.hook";
import moment from "moment";

const REACT_APP_WAREHOUSE_ID_MANEJ22 = process.env.REACT_APP_WAREHOUSE_ID_MANEJ22;

const data = require("../data/responseData/sourcePrices.json")

const CommandPanel = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(({products}) => products.isOpen);
    const isLoading = useSelector(({products}) => products.loading);
    const listModels = useSelector(({products}) => products.listModels);
    const pricesJournal = useSelector(({products}) => products.pricesJournal);
    const allItems = useSelector(({products}) => products.allItems);



    const {request} = useHttp()

    const bodyRequestInfoList = {
        "offer_id": [],
        "product_id": [],
        "sku": []
    }

    const testBody = {
        "offer_id": "100566929009",
        "product_id": 0,
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

    useEffect(() => {
        if(allItems.length !== 0 ) {
            const arrStocks = []
            allItems.forEach(item => {
                    const offerId = item["offer_id"]
                    const productId = item["id"]
                    const stock = item["balance"]
                    const stockOzon = item["stocks"]["present"]
                    const result = {
                        "product_id": productId,
                        "offer_id": offerId,
                        "stock": stock,
                        "warehouse_id": REACT_APP_WAREHOUSE_ID_MANEJ22
                    }
                    if(stock !== stockOzon) arrStocks.push(result)
                }
            )

            console.log("allItems ", allItems)
            console.log("arrStocks ", arrStocks)
            dispatch(importStocks(arrStocks))
        }
    }, [allItems])


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

    const handlerResetData = async () => {
        dispatch(resetData())
        try {
            dispatch(openTables())
            const dataPrices = await request("/api/price/get_price")
            dispatch(getPriceJournal(dataPrices.docs))
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
            const actualData = moment().format('MMMM Do YYYY, h:mm:ss a');
            const elementPriceJournal = oldPricesJournal.find(x => x.art === element["offer_id"])
            const dataObj = {
                data : actualData,
                price : priceString
            }
            const productObj = {
                history : [dataObj],
                art : element["offer_id"],
                name : element["name"]
            }
            if (elementPriceJournal)  {
                elementPriceJournal["history"].push(dataObj)
                if(elementPriceJournal["history"].length > 10)  elementPriceJournal["history"] = elementPriceJournal["history"].slice(-10)

            }
            if (!elementPriceJournal) oldPricesJournal.push(productObj)
            pricesBody.push(result)
        }
        const addError = (item) => {
            reqLog.push(item)
            console.log('Error!')
        }


        Object.keys(listModels).forEach(item => {
            listModels[item].forEach(element => {
                let newPrice = element["price"]
                let minimalPrice = element["minimalPriceForIncome"]
                const createPercent = (price , percent) => {
                   return Math.round((price/100) * percent)
                }
                const round10 = value => {
                    return Math.round(value / 10) * 10;
                }
                switch (true){
                    case (element["price"] < element["minimalPriceForIncome"]
                        && !(element["price_index"] >= 1.6) ) :
                        createPrice(element, element["minimalPriceForIncome"]);
                        break;
                    case (element["price_index"] > 1.7
                        && element["price"] > element["minimalPriceForIncome"] ):
                        newPrice -= createPercent(newPrice, 3)
                        newPrice =  round10(newPrice)

                        createPrice(element, newPrice);
                        break;
                    case (element["price_index"] === 1.7
                        && element["price"] > element["minimalPriceForIncome"] ):
                        newPrice -= createPercent(newPrice, 2)
                        newPrice =  round10(newPrice)
                        createPrice(element, newPrice);
                        break;
                    case (element["price_index"] < 1.0):
                        newPrice +=  createPercent(newPrice, 3)
                        newPrice =  round10(newPrice)
                        createPrice(element, newPrice);
                        break;
                    case (element["price_index"] === 1.0
                        || element["price_index"] <= 1.5):
                        newPrice +=  createPercent(newPrice, 2)
                        newPrice =  round10(newPrice)
                        createPrice(element, newPrice);
                        break;
                    default:
                        return
                }
            })
        })
        let requestJourney = []
        let reqLog = []

        dispatch(sendPrice(pricesBody, "allRequests"))
        // for (let i = 0; oldPricesJournal.length > i; i++) { // Делим запрос на запросы по 150 элементов
        //     requestJourney.push(oldPricesJournal[i])
        //     if (requestJourney.length === 150) {
        //         const responseServer = await request("/api/price/send_price", "POST", requestJourney)
        //         console.log(responseServer)
        //         if(requestJourney["status"] === "error") addError(requestJourney)
        //         requestJourney = []
        //     }
        // }
        // while(reqLog.length !== 0) {
        //     for (const item of reqLog) {
        //         try {
        //             const response =  await request("/api/price/send_price", "POST", item)
        //             if (response["status"] === "error") {
        //                 addError(item)
        //             }
        //             reqLog = reqLog.slice(1)
        //
        //         } catch (e) {
        //             console.log("Повторная ошибка" , e)
        //         }
        //     }
        // }
        dispatch(setLoading())
        // const responseServer = await request("/api/price/send_price", "POST", requestJourney)
        dispatch(fetchProductInfo(data))
        // console.log(responseServer)
        console.log("Запись журнала успешно закончена!")
        dispatch(endLoading())


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
                        disabled={isLoading}
                        // disabled={true}

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