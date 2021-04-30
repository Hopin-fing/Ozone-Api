import React from 'react';
import CommandPanel from "../components/CommandPanel";
import Tables from "../components/Tables";
import {useSelector} from "react-redux";

const Home = () => {
    const loading = useSelector(({products}) => products.loading);
    const products = useSelector(({products}) => products.listModels);



    return (
        <div>
            <div className="row">
                <CommandPanel/>
            </div>
            {loading
                ? <p className="text-center">Загрузка</p>
                : <Tables products={products}/>}
        </div>
    );
};

export default Home;