import React, {useEffect, useState} from 'react';
import {getListModel, openTables, setLoading} from "../redux/actions/products";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import LinkHome from "../components/LinkHome";
import InputTables from "../components/inputTables";

const List = ({match}) => {
    // const {getListModel,getRepos, loading, user, repos} = useContext(GithubContext)
    const urlName = match.params.name
    const dispatch = useDispatch();

    dispatch(getListModel(urlName))

    const products = useSelector(({products}) => products.listModel);
    return (
        <> {products.length !== 0

            ?<>
                <LinkHome/>
                <div className="row">
                    <div className="col s12">
                        <table className="striped centered">
                            <thead>
                            <tr>
                                <th>Артикул OZON</th>
                                <th>Артикул</th>
                                <th>Название товара</th>
                                <th>Штрихкод</th>
                                <th>Цена</th>
                                <th>Кол-во на складе </th>

                                <th> </th>

                            </tr>
                            </thead>

                            <tbody>
                            {products.map((item,index) =>
                                <tr key={`product_${index}`}>
                                    <td>{item.offer_id}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.barcode}</td>
                                    <InputTables item={item} />


                                    <td>{item.stocks.coming}</td>

                                    <td>
                                        <Link to={{pathname:`/product/` + item.id, model: urlName}}>
                                            <i className="material-icons">chevron_right</i>
                                        </Link>
                                    </td>
                                </tr>
                            )
                            }
                            </tbody>
                        </table>
                        {/*<Pagination totalRecords={products.result.items.length} />*/}
                    </div>


                </div>

            </>
            : null}

        </>
    );
};

export default List;