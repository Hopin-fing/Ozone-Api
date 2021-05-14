import React from 'react';
import CreateFullRequest from "../methods/ozon/import/createFullRequest";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchProductInfo,
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

    const pricesBody = {
        "prices": [
            {
                "offer_id": "100175508539",
                "old_price": "7213",
                "premium_price": "0",
                "price": "4000",
                "product_id": 73438434
            }
        ]
    }


    const onOpenTables = () => {
        dispatch(openTables())
        data.forEach((element, index) => {
            if(index % 999 === 0) {
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

    const handlerSendPrices = () => {
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

                    >Импортировать товары</button>


                </div>
                <div className="card-action center">
                    <button
                        className="orange waves-effect waves-light btn darken-3"
                        onClick={handlerGetPrices}
                        disabled={isLoading}

                    >Получить информацию по цене</button>


                </div>
                <div className="card-action center">
                    <button
                        className="yellow waves-effect waves-light btn darken-3"
                        onClick={handlerSendPrices}
                        disabled={isLoading}

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