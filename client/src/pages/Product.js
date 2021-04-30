import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProduct, setLoading} from "../redux/actions/products";

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
            <Link to="/">
                <div>Стартовая страница</div>
            </Link>
            <ul>
                <li>Атрибут: {products.id}</li>
                <li>Наименование: {products.name}</li>
                <li>Изображение: <img src={products.images} alt="test" style={{width: "350px"}}/></li>
            </ul>

        </div>
    );
};

export default Product;