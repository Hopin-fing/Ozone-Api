import React, {useEffect, useState} from 'react';
import CreateFullRequest from "../methods/ozon/createFullRequest";
import CustomRequest from "../methods/ozon/customRequest";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import {useDispatch, useSelector} from "react-redux";
import {openTables} from "../redux/actions/tables";

const CommandPanel = () => {

    const dispatch = useDispatch();

    const { isOpen, isLoaded, items} = useSelector(({tables}) => tables);


    const onOpenTables = () => {
        dispatch(openTables())
        console.log(isOpen)
    }

    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        name: '',
        message: ''
    })

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name] : event.target.value})
    }

    const reviewHandler = async () => {
        try {
            const data = await request('api/review/review', 'POST', {...form})
            message(data.message)
        }catch (e) {

        }
    }




    return (
        <div className="col s8 offset-s2">
            <div className="card blue-grey darken-2">
                <div className="card-content white-text">
                    <span className="card-title">Переформатирование запроса в запрос API OZONE</span>

                </div>
                <div className="card-action center">
                    <button
                        className="green btn darken-3"
                        onClick={CreateFullRequest}
                        disabled={loading}

                    >Отправить запрос</button>
                    <button
                        className="orange btn accent-4"
                        onClick={CustomRequest}
                        disabled={loading}

                    >Тестовый запрос</button>

                </div>
            </div>
            <div className="card">
                <div className="card-action center brown lighten-5">
                    <button
                        className="indigo btn  darken-1"
                        onClick={onOpenTables}

                    >Загрузить таблицу</button>
                </div>
            </div>

        </div>

    );
};

export default CommandPanel;