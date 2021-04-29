import React from 'react';
import CommandPanel from "../components/CommandPanel";
import Tables from "../components/Tables";
import {useSelector} from "react-redux";

const Home = () => {
    const isLoaded = useSelector(({tables}) => tables.isLoaded);

    return (
        <div>
            <div className="row">
                <CommandPanel/>
            </div>
            {isLoaded ?
                <Tables/> : null}
        </div>
    );
};

export default Home;