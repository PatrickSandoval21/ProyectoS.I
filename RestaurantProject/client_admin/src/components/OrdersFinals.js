import Axios from 'axios';
import {useState, useEffect} from 'react';
function OrdersFinals(){

    const [orders, setOrders] = useState([]);

    function ADM_getCategories() {
        return new Promise((resolve, reject) => {
            Axios.get(`http://localhost:3001/getAllOrders`)
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

    function confirm(idD){
        Axios.post("http://localhost:3001/updateOrder",{
            state : 0,
            id: idD
        }).then((result)=>{
            console.log("actualizado")
        })
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
                            <th>Orden(ID)</th>
                            <th>Cliente (ID)</th>
                            <th>Nombre</th>
                            <th>Direccion</th>
                            <th>N° Contacto</th>
                            <th>Monto a Pagar</th>
                            <th>Satisfaccion</th>
                            <th>Estado del Pedido</th>
                            <th>Actualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order)=>{
                                let state = order.state_purchase  === 1 ? "No entregado" : "Entregado"
                                let colorS = order.state_purchase  === 1 ? "red" : "green"
                            return(
                            <tr key={order.order_id} style={{color: colorS }}>
                                <td>{order.order_id}</td>
                                <td>{order.id_customer}</td>
                                <td>{order.first_name}</td>
                                <td>{order.address}</td>
                                <td>{order.cellphone}</td>
                                <td>{order.final_price}</td>
                                <td>{order.satisfaction}</td>
                                <td>{state}</td>
                                <td><button onClick={()=>{confirm(order.order_id)}}>Confirmar Entrega</button></td>
                            </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        )
    

}
export default OrdersFinals;
