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

    const requestUrl = 'https://api-seller.ozon.ru/v2/product/import'

    // --/v2/category/attribute

    // const body = {
    //     "attribute_type": "optional",
    //     "category_id": 17035115,
    //     "language": "RU"
    // }

    // --/v2/category/attribute/values

   // const body = {
   //     "category_id": 17035115,
   //     "attribute_id": 10289,
   //     "language": "RU",
   //     "last_value_id": 0,
   //     "limit": 50
   // }

    // --/v2/product/import

    const body = {
        "items": [
          {
                "attributes": [
                    {
                        "complex_id": 0,
                        "id": 85,
                        "values": [
                            {
                                "dictionary_value_id": 0,
                                "value": "Maxima Optics"
                            }
                        ]
                    },
                   {
                        "complex_id": 0,
                        "id": 4191,
                        "values": [
                            {
                                "dictionary_value_id": 0,
                                "value": "Контактные линзы Maxima 55 Comfort Plus - это линзы ежемесячной замены, имеющие асферический дизайн и изготовленные из биосовместимого материала. Эти контактные линзы разработаны специально для людей имеющих небольшую степень астигматизма, а также желающих ощущать чувство полного комфорта в течение целого дня.Асферическая поверхность контактной линзы помогает формировать более контрастное и четкое изображение. В Maxima 55 Comfort Plus все лучи, в том числе и проходящие через периферию, собираются вместе, тем самым минимизируя оптические искажения. Другим достоинством этих линз является материал из которого они изготовлены. Контактные линзы Maxima 55 Comfort Plus обладают низким уровнем образования отложений, превосходно удерживают воду и отлично пропускают кислород к роговице глаза. Все это стало возможно благодаря совершенно новому биосовместимому материалу, благодаря ему ношение контактных линз стало еще более удобным и комфортным.Замена через 1 месяц."
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 4194,
                        "values": [
                            {
                                "dictionary_value_id": 0,
                                "value": "https://img1.wildberries.ru/big/new/13730000/13739378-1.jpg"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 4384,
                        "values": [
                            {
                                "dictionary_value_id": 0,
                                "value": "контактные линзы"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 7694,
                        "values": [
                            {
                                "dictionary_value_id": 44632,
                                "value": "Ежемесячные"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 7696,
                        "values": [
                            {
                                "dictionary_value_id": 43040,
                                "value": "Дневной"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 7701,
                        "values": [
                            {
                                "dictionary_value_id": 81616,
                                "value": "-0.50"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 7702,
                        "values": [
                            {
                                "dictionary_value_id": 81102,
                                "value": "8.6"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 7703,
                        "values": [
                            {
                                "dictionary_value_id": 0,
                                "value": "14"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 7704,
                        "values": [
                            {
                                "dictionary_value_id": 45620,
                                "value": "6"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 7706,
                        "values": [
                            {
                                "dictionary_value_id": 0,
                                "value": "58"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 7709,
                        "values": [
                            {
                                "dictionary_value_id": 45574,
                                "value": "24"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 8205,
                        "values": [
                            {
                                "dictionary_value_id": 0,
                                "value": "1095"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 8229,
                        "values": [
                            {
                                "dictionary_value_id": 93512,
                                "value": "Контактные линзы"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 9048,
                        "values": [
                            {
                                "dictionary_value_id": 0,
                                "value": "Контактные линзы Maxima Optics Maxima контактные линзы 55 Comfort Plus 6шт / 8.6 Ежемесячные, +2.50 / 14,2 / 8.6, 6 шт"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 9782,
                        "values": [
                            {
                                "dictionary_value_id": 970661099,
                                "value": "Не опасен"
                            }
                        ]
                    },
                    {
                        "complex_id": 0,
                        "id": 10289,
                        "values": [
                            {
                                "dictionary_value_id": 0,
                                "value": "maxima"
                            }
                        ]
                    }
                ],
                "barcode": "8886393784626",
                "category_id": 17035115,
                "complex_attributes": [
                    {
                        "attributes": [
                            {
                                "complex_id": 0,
                                "id": 0,
                                "values": [
                                    {
                                        "dictionary_value_id": 0,
                                        "value": "string"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "depth": 20,
                "dimension_unit": "mm",
                "height": 60,
                "image_group_id": "1",
                "images": [
                    "https://img1.wildberries.ru/big/new/13730000/13739378-1.jpg"
                ],
                "images360": [
                    ""
                ],
                "name": "Контактные линзы Maxima Optics Maxima контактные линзы 55 Comfort Plus 6шт / 8.6 Ежемесячные, -0.50 / 14,2 / 8.6, 6 шт.",
                "offer_id": "19342360",
                "old_price": "",
                "pdf_list": [
                    {
                        "index": 0,
                        "name": "string",
                        "src_url": "string"
                    }
                ],
                "premium_price": "string",
                "price": "1321",
                "vat": "0.2",
                "weight": 30,
                "weight_unit": "g",
                "width": 100
            }
        ]
    }


    // sendRequestGet( requestUrl )
    //     .then(data => console.log('GET :',  data))
    //     .catch(err => console.log(err))



    const handlerRequest = () => {
        sendRequestPost( requestUrl, body )
            .then(data => console.log('POST :',  data))
            .catch(err => console.log(err))
    }


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
                          onClick={handlerRequest}
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
