import React, { useEffect, useState} from "react";

import style from "./Main.css"
import Card from "./Card/Card";
import Auxillary from "../../../containers/Hoc/Auxillary";
import dataHandler from "../../../axiosService";


const Main = props => {

    const [ fetchedData, setFetchedData ] = useState([]);

    useEffect(( ) => {

            dataHandler.get('posts')
            .then( result => {
                // console.log(result)
                return setFetchedData(result.data) 
            })
        
        
    }, [])

    const posts = Object.values(fetchedData).map( post => {
        return post
    })
    return (
        <Auxillary AuxClass={style.AuxClass} >
            <h1 className={style.Main}>Main</h1>
            <div className={style.Row}>
                <Card title="title" description="desc" price="$10.00"  />
                <Card title="title" description="desc" price="$10.00"  />
                <Card title="title" description="desc" price="$10.00"  />
                <Card title="title" description="desc" price="$10.00"  />
            </div>
            
        </Auxillary>
    )
}

export default Main