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
            const dataPrices = await request("/api/price/get_price")
            dispatch(getPriceJournal(dataPrices.docs))
            dispatch(fetchProductInfo(data))


        }catch (e) {
            console.log("Ошибка :" , e)
        }

    }

    const createPrice = (element, price, oldPricesJournal, pricesBody) => {
        const priceString = price.toString()
        const result = {
            "offer_id": element["offer_id"],
            "old_price": Number(element["oldPrice"]) >  priceString
                ? element["oldPrice"]
                : "0",
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

        const addError = (item) => {
            reqLog.push(item)
            console.log('Error!')
        }


        Object.keys(listModels).forEach(item => {
            listModels[item].forEach(element => {
                let price = element["price"]
                let minPrice = element["minPrice"]
                let maxPrice = minPrice + 200
                let priceIndex = element["price_index"]
                let recommendedPrice = Number(parseInt(element["recommended_price"]))
                const createPercent = (price , percent) => {
                   return Math.round((price/100) * percent)
                }
                const round10 = value => {
                    return Math.round(value / 10) * 10;
                }
                switch (true) {
                    case(priceIndex >= 1.07
                        && minPrice === price):
                        break;
                    case (priceIndex > 1.07
                        && price > minPrice) :
                        if(recommendedPrice >= minPrice) createPrice(element, recommendedPrice, pricesBody);
                        createPrice(element, minPrice, pricesBody);
                        break;
                    case (priceIndex === 1.07):
                        createPrice(element, minPrice, pricesBody);
                        break;
                    case (priceIndex >= 1
                        && priceIndex <= 1.05):
                        price +=  createPercent(price, 1)
                        price =  round10(price)
                        if(price <= maxPrice) createPrice(element, price, pricesBody);
                        break;
                    case (priceIndex === 0) :
                        minPrice += 50
                        if(minPrice !== price) createPrice(element, minPrice, pricesBody);
                        break;
                    case (priceIndex < 1.0
                        && priceIndex !== 0
                        && recommendedPrice >= minPrice):
                        if(recommendedPrice !== price) createPrice(element, recommendedPrice, pricesBody);
                        break;
                    default:
                        return
                }
            })
        })
        let requestJourney = []
        let reqLog = []

        dispatch(sendPrice(pricesBody, "allRequests"))
        for (let i = 0; oldPricesJournal.length > i; i++) { // Делим запрос на запросы по 150 элементов
            requestJourney.push(oldPricesJournal[i])
            if (requestJourney.length === 150) {
                const responseServer = await request("/api/price/send_price", "POST", requestJourney)
                console.log(responseServer)
                if(requestJourney["status"] === "error") addError(requestJourney)
                requestJourney = []
            }
        }
        while(reqLog.length !== 0) {
            for (const item of reqLog) {
                try {
                    const response =  await request("/api/price/send_price", "POST", item)
                    if (response["status"] === "error") {
                        addError(item)
                    }
                    reqLog = reqLog.slice(1)

                } catch (e) {
                    console.log("Повторная ошибка" , e)
                }
            }
        }
        dispatch(setLoading())
        const responseServer = await request("/api/price/send_price", "POST", requestJourney)
        dispatch(fetchProductInfo(data))
        console.log(responseServer)
        console.log("Запись журнала успешно закончена!")
        dispatch(endLoading())


    }

    const handlerSendMinPrice = async () => {
        const pricesBody = []
        const oldPricesJournal = pricesJournal
        Object.keys(listModels).forEach(item => {
            listModels[item].forEach(element => {
                let minimalPrice = element["minimalPriceForIncome"]
                createPrice(element, minimalPrice, oldPricesJournal, pricesBody);
            })

        })
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