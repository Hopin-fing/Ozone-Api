import React from 'react';
import CreateFullRequest from "../methods/ozon/import/createFullRequest";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductInfo, openTables} from "../redux/actions/tables";

const data = require("../data/responseData/products.json")

const CommandPanel = () => {

    const dispatch = useDispatch();

    const isOpen = useSelector(({tables}) => tables.isOpen);

    const bodyRequestInfoList = {
        "offer_id": [],
        "product_id": [],
        "sku": []
    }


    const onOpenTables = () => {
        dispatch(openTables())
        data.forEach(element => {
            bodyRequestInfoList.offer_id.push(element.art.toString())
        })
        dispatch(fetchProductInfo(bodyRequestInfoList))
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
                        onClick={CreateFullRequest}

                    >Импортировать товары</button>
                    {/*<button*/}
                    {/*    className="orange waves-effect waves-light btn accent-4"*/}
                    {/*    onClick={onOpenTables}*/}

                    {/*>Тестовый запрос</button>*/}

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