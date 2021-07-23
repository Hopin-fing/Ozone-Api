import React, {useEffect, useState} from 'react';
import TabContent from "./TabContent";

const Tabs = ({productTree} ) => {

    //TODO: Не изменяется минимальные цены у каждой категории при обновлении самих цен

    const [ active, setActive ] = React.useState(null);
    const openTab = e => setActive(+e.target.dataset.index);

     return (
         <> {productTree.length !== 0
         ?<div className="row">
                 <div className="col s12">
                     <div className="tab">

                         {Object.keys(productTree).map((n, i) => (
                             <button
                                 className={`tablinks ${i === active ? 'active' : ''}`}
                                 onClick={openTab}
                                 key={`button-tab-${i}`}
                                 data-index={i}
                             >{n}</button>
                         ))}
                     </div>
                     {productTree[Object.keys(productTree)[active]]
                     && <TabContent title = {Object.keys(productTree)[active]}
                                 cabinetInfo = {productTree[Object.keys(productTree)[active]]}
                     />}

                     {/*<Pagination totalRecords={products.result.items.length} />*/}
                 </div>


             </div>
         : null}

         </>
    );
};

export default Tabs;