import Axios from 'axios';
import {useState, useEffect} from 'react';
import StockItems from './StockItems'
function Stock (){

    const[stocks, setStocks] = useState([])


    function ADM_getStocks() {
        return new Promise((resolve, reject) => {
            Axios.get(`http://localhost:3001/stocks`)
            .then((response) => {
              if (response) {
                return response.data
              }
              reject(
                "No hemos podido recuperar ese json. El código de respuesta del servidor es: " +
                  response.status
              );
            })
            .then((json) => resolve(json))
            .catch((err) => reject(err));
        });
    }


    useEffect (()=>{
        ADM_getStocks().then((result) => {
            setStocks(result)
        })
    },[stocks])

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>STOCK(ID)</th>
                        <th>NOMBRE DEL PLATO</th>
                        <th>CANTIDAD</th>
                        <th>FECHA CREACION</th>
                        <th>FECHA MODIFICACION</th>
                        <th>AGREGAR</th> 
                    </tr>
                </thead>
                
                <StockItems stocks={stocks}/>

                
            </table>
        </div>
    )
}
export default Stock;