import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCommissions, getProduct, setLoading} from "../redux/actions/products";
import LinkHome from "../components/LinkHome";
import LinkList from "../components/LinkList";

const Product = ({match, location}) => {

    const dispatch = useDispatch();
    const urlId = match.params.name



    const history = []
    const products = useSelector(({products}) => products.item);
    const data = useSelector(({products}) => products.pricesJournal);
    const requestCommissions = {
        "offer_id": products.offer_id,
        "product_id": products.id,
        "sku": 0
    }






    useEffect(() => {
        dispatch(getProduct(urlId))
    }, [])

    useEffect(() => {
        if(products.offer_id) dispatch(getCommissions(requestCommissions))
    }, [products.offer_id])


    const objHistory = data.find( x => x.art === products.offer_id.toString())

    if (objHistory) objHistory.history.forEach( element => {
        history.push(element)
    })



    return (
        <div>
            <LinkHome/>
            <LinkList model={location.model}/>
            <div className="row">
                <div className="col s4 text-center journal">
                    <div className="journal__wrapper">
                        <h5 className="journal__title">Журнал изменения цен</h5>
                        {/*<ul className="collection">*/}
                        {/*    {history.length !== 0*/}
                        {/*    ? history.map((item, index) => {*/}

                        {/*       return <li key={`product-history-${index}`} className="collection-item">{item.data} - {item.price} р.</li>*/}
                        {/*        })*/}
                        {/*        :  <li className="collection-item">Изменений цены не было</li>*/}
                        {/*    }*/}

                        {/*</ul>*/}
                    </div>

                </div>

                <div className="col s8 text-center">
                    <img src={products.images} alt="test" style={{width: "350px"}}/>
                    <ul>
                        <li>Атрибут: {products.id}</li>
                        <li>Наименование: {products.name}</li>
                        <li>Цена: {`${parseInt(products.price)} р.`}</li>
                        <li>Коммиссия: {products.commissions
                            ?`${parseInt(products.commissions[0].value)} р.`
                            : `Загрузка ...`
                        }</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Product;