import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {endLoading, sendPrice} from "../redux/actions/products";
import moment from "moment";
import {useHttp} from "../hooks/http.hook";

const InputTables = ({item}) => {

    const [inputActive, setInputActive] = useState( false)
    const [value, setValue] = useState(parseInt(item.price))
    const pricesJournal = useSelector(({products}) => products.pricesJournal);
    const loading = useSelector(({products}) => products.loading);

    const dispatch = useDispatch();

    const {request} = useHttp()


    const bodyRequestPrice =  [
            {
                "offer_id": item["offer_id"],
                "old_price": "0",
                "premium_price": "0",
                "price": value.toString(),
                "product_id": item["id"]
            }
        ]

    const onSubmit = async event => {
        if(event.key !== 'Enter') {
            return
        }

        if(value.toString().trim()) {
            let requestJourney = []
            const oldPricesJournal = pricesJournal
            const actualData = moment().format('MMMM Do YYYY, h:mm:ss a')
            const elementPriceJournal = oldPricesJournal.find(x => x.art === item["offer_id"])
            const dataObj = {
                data : actualData,
                price : value.toString()
            }
            const productObj = {
                history : [dataObj],
                art : item["offer_id"],
                name : item["name"]
            }
            if (elementPriceJournal)  {
                elementPriceJournal["history"].push(dataObj)
                if(elementPriceJournal["history"].length > 10) elementPriceJournal["history"].slice(-10)
            }
            if (!elementPriceJournal) oldPricesJournal.push(productObj)



            requestJourney.push(elementPriceJournal)
            console.log("elementPriceJournal", elementPriceJournal)


            console.log("requestJourney", requestJourney)


            const response =  await request("/api/price/send_price", "POST", requestJourney)

            console.log("response ", response)

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
        <>{loading
            ? <td>
                Загрузка...
            </td>
            : <td className="cursor-pointer" onClick={handlerInput}>
                {inputActive
                    ? <input
                        onChange={event => onChangeHandler(event)}
                        type="text"
                        value={value}
                        onKeyPress={onSubmit}/>
                    :value }
            </td>

        }




        </>
    );
};

export default InputTables;