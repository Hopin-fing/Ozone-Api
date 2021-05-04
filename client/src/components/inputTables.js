import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {sendPrice} from "../redux/actions/products";

const InputTables = ({item}) => {

    const [inputActive, setInputActive] = useState( false)
    const [value, setValue] = useState(parseInt(item.price))

    const dispatch = useDispatch();


    const bodyRequestPrice = {
        "prices": [
            {
                "offer_id": "0",
                "old_price": "0",
                "premium_price": "0",
                "price": "99999999",
                "product_id": 70946605
            }
        ]
    }

    const onSubmit = event => {
        if(event.key !== 'Enter') {
            return
        }

        if(value.trim()) {
            console.log("Все вводится - ", value )
            dispatch(sendPrice(bodyRequestPrice))
            setInputActive( false)
        }


    }

    const handlerInput = () => {
        setInputActive(true)
    }

    return (
        <td className="cursor-pointer" onClick={handlerInput}>
            {inputActive
                ? <input
                    onChange={event => setValue(event.target.value.replace(/[^\d]/g, ""))}
                    type="text"
                    value={value}
                    onKeyPress={onSubmit}/>
                :parseInt(item.price) }
        </td>
    );
};

export default InputTables;