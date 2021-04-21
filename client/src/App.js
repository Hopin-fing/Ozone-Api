import React, {useEffect, useState} from 'react'
import 'materialize-css'
import {useHttp} from "./hooks/http.hook";
import {useMessage} from "./hooks/message.hook";
import CreateFullRequest from "./methods/ozon/createFullRequest";

function App() {

    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        name: '',
        message: ''
    })




    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name] : event.target.value})
    }

    const reviewHandler = async () => {
        try {
            const data = await request('api/review/review', 'POST', {...form})
                message(data.message)
        }catch (e) {
            
        }
    }

    // -------------------------------------

    // fetch('http://example.com/movies.json')
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         console.log(data);
    //     });




    // const headers = {
    //     "Client-Id": 52496,
    //     "Api-Key":"4d9d2744-e2c4-4e6d-900a-a0f54b0af790",
    //     "Content-Type":"application/json"
    // }

    // function sendRequestGet(url) {
    //
    //     return fetch(url, {
    //         method: "GET",
    //         headers
    //     })
    //         .then(response => {
    //             return response.json()
    //         })
    // }


    // function sendRequestPost( url, body = null) {
    //
    //
    //     return fetch(url, {
    //         method: "POST",
    //         body :JSON.stringify(body),
    //         headers
    //     })
    //         .then(response => {
    //             return response.json()
    //         })
    // }

    // const requestUrl = 'https://api-seller.ozon.ru/v2/product/import'

    // --/v2/category/attribute

    // const body = {
    //     "attribute_type": "optional",
    //     "category_id": 17035115,
    //     "language": "RU"
    // }

    // --/v2/category/attribute/values

   // const body = {
   //     "category_id": 17035115,
   //     "attribute_id": 4389,
   //     "language": "RU",
   //     "last_value_id": 0,
   //     "limit": 50
   // }

    // --/v2/product/import


    // sendRequestGet( requestUrl )
    //     .then(data => console.log('GET :',  data))
    //     .catch(err => console.log(err))



    // const handlerRequest = () => {
    //     sendRequestPost( requestUrl, body )
    //         .then(data => console.log('POST :',  data))
    //         .catch(err => console.log(err))
    // }


    // const getMethod = async requestUrl => {
    //
    //     const response = await axios.get(
    //         requestUrl
    //     ).then(data => console.log('GET :',  data))
    // };

    // -------------------------------------------


  return (
    <div className="container">
      <div className="row">
          <div className="col s6 offset-s3">
              <div className="card blue-grey darken-2">
                  <div className="card-content white-text">
                      <span className="card-title">Переформатирование запроса в запрос API OZONE</span>

                  </div>
                  <div className="card-action">
                      <button
                          className="green btn darken-3"
                          onClick={CreateFullRequest}
                          disabled={loading}

                      >Отправить запрос</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
