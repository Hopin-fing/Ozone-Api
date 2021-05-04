import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProduct, setLoading} from "../redux/actions/products";
import LinkHome from "../components/LinkHome";

const Product = ({match}) => {

    const dispatch = useDispatch();
    const urlId = match.params.name

    const isOpen = useSelector(({products}) => products.isOpen);

    useEffect(() => {
        dispatch(getProduct(urlId))
    }, [])


    const products = useSelector(({products}) => products.item);

    return (
        <div>
            <LinkHome/>
            <div className="row">
                <div className="col s8 offset-s2 text-center">
                    <img src={products.images} alt="test" style={{width: "350px"}}/>
                    <ul>
                        <li>Атрибут: {products.id}</li>
                        <li>Наименование: {products.name}</li>
                        <li>Цена: {`${parseInt(products.price)} р.`}</li>
                    </ul>
                </div>

            </div>





        </div>
    );
};

export default Product;