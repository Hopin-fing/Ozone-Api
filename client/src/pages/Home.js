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
                ? <div className="row">
                    <div className="col s12 text-center">
                        <p className="center-align">
                            Загрузка...
                        </p>

                    </div>
                </div>
                : <Tables products={products}/>}
        </div>
    );
};

export default Home;