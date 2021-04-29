import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Pagination from "./Pagination";
import {Link} from "react-router-dom";



const Tables = () => {



    const items = useSelector(({tables}) => tables.items);

    const commission = price => {
        return (price * 20)/100
    }



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
                            <th>Кол-во на складе</th>
                            <th>Комиссия</th>
                            <th>Мин. цена</th>
                            <th>Прибыль</th>
                            <th> </th>

                        </tr>
                    </thead>

                    <tbody>
                        {items.result.items.map((item,index) =>
                                <tr key={`product_${index}`}>
                                    <td>{item.offer_id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.barcode}</td>
                                    <td>{item.price.replace(/(00$)/ , "" )}</td>
                                    <td>{item.stocks.coming}</td>
                                    <td>{commission(item.price)}</td>
                                    <td>?????</td>
                                    <td>?????</td>
                                    <td>
                                        <Link to={`/profile/` + item.offer_id}>
                                            <i className="material-icons">chevron_right</i>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <Pagination totalRecords={items.result.items.length} />
            </div>


        </div>
    );
};

export default Tables;