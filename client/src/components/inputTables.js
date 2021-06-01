import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {sendPrice} from "../redux/actions/products";

const InputTables = ({item}) => {

    const [inputActive, setInputActive] = useState( false)
    const [value, setValue] = useState(parseInt(item.price))

    const dispatch = useDispatch();


    const bodyRequestPrice =  [
            {
                "offer_id": item["offer_id"],
                "old_price": "0",
                "premium_price": "0",
                "price": value.toString(),
                "product_id": item["id"]
            }
        ]

    const onSubmit = event => {
        if(event.key !== 'Enter') {
            return
        }

        if(value.toString().trim()) {
            dispatch(sendPrice(bodyRequestPrice))
            setValue(value)
            setInputActive( false)
        }


    }

    const handlerInput = () => {
        setInputActive(true)
    }

    const onChangeHandler = event => {
        const result = event.target.value.replace(/[^\d]/g, "")
        setValue(result)
    }

    return (
        <td className="cursor-pointer" onClick={handlerInput}>
            {inputActive
                ? <input
                    onChange={event => onChangeHandler(event)}
                    type="text"
                    value={value}
                    onKeyPress={onSubmit}/>
                :value }
        </td>
    );
};

export default InputTables;