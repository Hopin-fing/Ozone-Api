import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";



const Tables = ({products} ) => {

    const commission = arrPrice => {
        const price =  averagePrice(arrPrice)
        return Math.floor((price * 20)/100)
    }

    const averagePrice = arrPrice => {
        const count = arrPrice.length
        const sum = sumPriceModels(arrPrice)
        return Math.floor(sum/count)

    }

    const sumPriceModels = arrModels => {
        let sum = 0
        arrModels.forEach(model => {
            sum += model.price
        })
        return sum
    }

    const maxPurchasePrice = arrModels => {
        let arrPrices = []
        arrModels.forEach(model => {
            arrPrices.push(model["PurchasePrice"])
        })
        return Math.max.apply(null, arrPrices)
    }


     return (
         <> {products.length !== 0
         ?<div className="row">
                 <div className="col s12">
                     <table className="striped centered">
                         <thead>
                         <tr>
                             {/*<th>Артикул</th>*/}
                             <th>Название товара</th>
                             <th>Средняя цена за модель</th>
                             <th>Максимальная закупочная цена </th>
                             <th>Минимальная цена</th>
                             <th>Продано за неделю</th>

                             {/*<th>Цена</th>*/}
                             {/*<th>Кол-во на складе</th>*/}
                             {/*<th>Комиссия</th>*/}
                             {/*<th>Мин. цена</th>*/}
                             {/*<th>Прибыль</th>*/}
                             <th> </th>

                         </tr>
                         </thead>

                         <tbody>
                         {Object.keys(products).map((item,index) =>
                             <tr key={`model_${index}`}>
                                 {/*<td>{item.offer_id}</td>*/}
                                 <td>{item.replace(/_/g, " ")}</td>
                                 <td>{`${averagePrice(products[item])} р.`}</td>
                                 <td>{`${maxPurchasePrice(products[item])} р.`}</td>
                                 <td>{`${commission(products[item])} р.`}</td>
                                 <td>?????</td>
                                 {/*<td>{item.barcode}</td>*/}
                                 {/*<td>{item.price.replace(/(00$)/ , "" )}</td>*/}
                                 {/*<td>{item.stocks.coming}</td>*/}
                                 {/*<td>{commission(item.price)}</td>*/}
                                 {/*<td>?????</td>*/}
                                 {/*<td>?????</td>*/}
                                 <td>
                                     <Link to={`/list/` + item}>
                                         <i className="material-icons">chevron_right</i>
                                     </Link>
                                 </td>
                             </tr>
                         )
                         }
                         </tbody>
                     </table>
                     {/*<Pagination totalRecords={products.result.items.length} />*/}
                 </div>


             </div>
         : null}

         </>
    );
};

export default Tables;