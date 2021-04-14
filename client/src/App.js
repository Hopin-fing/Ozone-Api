import React, {useEffect, useState} from 'react'
import 'materialize-css'
import {useHttp} from "./hooks/http.hook";
import {useMessage} from "./hooks/message.hook";
import axios from "axios";

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




    const headers = {
        "Client-Id": 52496,
        "Api-Key":"4d9d2744-e2c4-4e6d-900a-a0f54b0af790",
        "Content-Type":"application/json"
    }

    function sendRequestGet(url) {

        return fetch(url, {
            method: "GET",
            headers
        })
            .then(response => {
                return response.json()
            })
    }


    function sendRequestPost( url, body = null) {


        return fetch(url, {
            method: "POST",
            body :JSON.stringify(body),
            headers
        })
            .then(response => {
                return response.json()
            })
    }

    const requestUrl = 'https://api-seller.ozon.ru/v2/category/attribute'

    const body = {
        "attribute_type": "required",
        "category_id": 17035115,
        "language": "RU"
    }


    // sendRequestGet( requestUrl )
    //     .then(data => console.log('GET :',  data))
    //     .catch(err => console.log(err))

    sendRequestPost( requestUrl, body )
        .then(data => console.log('POST :',  data))
        .catch(err => console.log(err))


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
                      <span className="card-title">Отзыв</span>
                      <div>
                          {/*<div className="input-field">*/}
                          {/*    <input*/}
                          {/*        className="white-text"*/}
                          {/*        placeholder="Введите имя"*/}
                          {/*        id="name"*/}
                          {/*        type="text"*/}
                          {/*        name="name"*/}
                          {/*        onChange={changeHandler}*/}
                          {/*    />*/}
                          {/*    <label htmlFor="name " >Имя</label>*/}
                          {/*</div>*/}
                          {/*<div className="input-field">*/}
                          {/*    <textarea*/}
                          {/*        className="materialize-textarea white-text"*/}
                          {/*        placeholder="Ваш отзыв"*/}
                          {/*        id="name"*/}
                          {/*        name="message"*/}
                          {/*        onChange={changeHandler}*/}
                          {/*    />*/}
                          {/*    <label htmlFor="name">Текст отзыва</label>*/}
                          {/*</div>*/}
                      </div>

                  </div>
                  <div className="card-action">
                      <button
                          className="green btn darken-3"
                          onClick={reviewHandler}
                          disabled={loading}

                      >Оставить отзыв</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
