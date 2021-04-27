import React from 'react'
import 'materialize-css'

import CommandPanel from "./components/CommandPanel";
import {useSelector} from "react-redux";
import Tables from "./components/Tables";
// import UpdateResponseJson from "./methods/ozon/updateResponseJson";

function App() {

    const isOpen = useSelector(({tables}) => tables.isOpen);


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
    <div className="had-container">
      <div className="row">
          <CommandPanel/>
      </div>
        {isOpen ?
            <Tables/> : null}
    </div>
  );
}

export default App;
