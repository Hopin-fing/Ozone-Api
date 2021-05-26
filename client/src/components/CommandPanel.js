import React from 'react';
import CreateFullRequest from "../methods/ozon/import/createFullRequest";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchProductInfo, fetchPurchasePrice,
    getPrices,
    importProduct,
    openTables,
    sendPrice,
    testRequest
} from "../redux/actions/products";

const data = require("../data/responseData/sourcePrices.json")

const CommandPanel = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(({products}) => products.isOpen);
    const isLoading = useSelector(({products}) => products.loading);
    const listModels = useSelector(({products}) => products.listModels);

    const bodyRequestInfoList = {
        "offer_id": [],
        "product_id": [],
        "sku": []
    }

    const testBody = {
        "category_id": 17035114,
        "attribute_id": 8729,
        "limit": 50
        // "last_value_id": 90544
    }


    const productBody = {
        "offer_id": "100175508539",
        "product_id": 73438434,
        "sku": 0
    }



    const existListModels = Object.keys(listModels).length

    const onOpenTables = () => {
        dispatch(openTables())
        data.forEach((element, index) => {
            if(index % 999 === 0 && index !== 0) {
                dispatch(fetchProductInfo(bodyRequestInfoList))
                bodyRequestInfoList.offer_id = []
            }
            bodyRequestInfoList.offer_id.push(element.art.toString())
        })
        dispatch(fetchProductInfo(bodyRequestInfoList))
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

    const handlerGetPurchasePrice = () => {
        dispatch(fetchPurchasePrice(productBody))
    }


    const handlerSendPrices = () => {
        const pricesBody = {
            "prices": []
        }
        Object.keys(listModels).forEach(item => {
            console.log(item)
            listModels[item].forEach(element => {
                if (element["price"] < element["minimalPriceForIncome"]) {
                    const content = {
                        "offer_id": element["offer_id"],
                        "old_price": "0",
                        "premium_price": "0",
                        "price": element["minimalPriceForIncome"].toString(),
                        "product_id": element["id"]
                    }
                    if (element["price"] === 999) {
                        dispatch(sendPrice(pricesBody))
                        element["price"] = []
                    }

                    pricesBody["prices"].push(content)
                }
            })
        })
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
                        className="pink waves-effect waves-light btn lighten-2"
                        onClick={handlerGetPurchasePrice}

                    >Получить данные отбазы данных</button>

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
                        onClick={onOpenTables}
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