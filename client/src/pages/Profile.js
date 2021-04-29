import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Profile = () => {

    const items = useSelector(({tables}) => tables.items);

    return (
        <div>
            <Link to="/">
                <div>Стартовая страница</div>
            </Link>
            <h1>Profile</h1>

        </div>
    );
};

export default Profile;