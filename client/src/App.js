import React, {useEffect, useState} from 'react'
import 'materialize-css'
import {useHttp} from "./hooks/http.hook";
import {useMessage} from "./hooks/message.hook";

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

  return (
    <div className="container">
      <div className="row">
          <div className="col s6 offset-s3">
              <div className="card blue-grey darken-2">
                  <div className="card-content white-text">
                      <span className="card-title">Отзыв</span>
                      <div>
                          <div className="input-field">
                              <input
                                  className="white-text"
                                  placeholder="Введите имя"
                                  id="name"
                                  type="text"
                                  name="name"
                                  onChange={changeHandler}
                              />
                              <label htmlFor="name " >Имя</label>
                          </div>
                          <div className="input-field">
                              <textarea
                                  className="materialize-textarea white-text"
                                  placeholder="Ваш отзыв"
                                  id="name"
                                  name="message"
                                  onChange={changeHandler}
                              />
                              <label htmlFor="name">Текст отзыва</label>
                          </div>
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
