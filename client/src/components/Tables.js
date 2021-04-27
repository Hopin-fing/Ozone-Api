import React from 'react';
import {useDispatch, useSelector} from "react-redux";



const Tables = () => {

    const dispatch = useDispatch();

    const {items} = useSelector(({tables}) => tables);
    return (
        <div className="row">
            <div className="col s12">
                <table className="striped centered">
                    <thead>
                    <tr>
                        <th>Артикул</th>
                        <th>Название товара</th>
                        <th>Штрихкод</th>
                        <th>Цена</th>
                        <th>Статус</th>
                        <th>Комиссия</th>
                        <th>Мин. цена</th>
                        <th>Прибыль</th>

                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>Alvin</td>
                        <td>Alvin</td>
                        <td>Alvin</td>
                        <td>Alvin</td>
                        <td>Eclair</td>
                        <td>$0.87</td>
                        <td>$0.87</td>
                        <td>$0.87</td>
                    </tr>
                    <tr>
                        <td>Alan</td>
                        <td>Alan</td>
                        <td>Alan</td>
                        <td>Alan</td>
                        <td>Jellybean</td>
                        <td>$3.76</td>
                        <td>$3.76</td>
                        <td>$3.76</td>
                    </tr>
                    <tr>
                        <td>Jonathan</td>
                        <td>Jonathan</td>
                        <td>Lollipop</td>
                        <td>Lollipop</td>
                        <td>Lollipop</td>
                        <td>$7.00</td>
                        <td>$7.00</td>
                        <td>$7.00</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tables;