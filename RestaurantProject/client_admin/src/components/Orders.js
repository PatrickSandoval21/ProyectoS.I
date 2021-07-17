import Axios from 'axios';
import {useState, useEffect} from 'react';
function Orders(){

    const [orders, setOrders] = useState([]);

    function ADM_getCategories() {
        return new Promise((resolve, reject) => {
            Axios.get(`http://localhost:3001/purchaseList`)
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

    useEffect(()=>{
        ADM_getCategories()
        .then((result)=>{
            setOrders(result)
        })
    },[])

        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Detalles(ID)</th>
                            <th>Productos (ID)</th>
                            <th>Nombre del Producto</th>
                            <th>Cliente(ID)</th>
                            <th>Cantidad pedida</th>
                            <th>Precio Acumulado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order)=>{
                            return(
                            <tr key={order.order_dishes_id}>
                                <td>{order.order_dishes_id}</td>
                                <td>{order.dish_id}</td>
                                <td>{order.dish_name}</td>
                                <td>{order.customer_id}</td>
                                <td>{order.quantity}</td>
                                <td>{order.previousPrice}</td>
                            </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        )
    

}
export default Orders;
