import  {useEffect, useState} from 'react'
import Axios from 'axios'
import '../styles/RegisteLo.css';

function ListOrders(){

    const [items, setItems] = useState([])
    const [final_price, setFinalPrice] = useState(0)
    const [idCustomer, setIdCustomer] = useState(0)
    const [nivSatis, setSatis] = useState(0)
    const [change, setChange] = useState(0)
    const [orderStatus, setOrderStatus] = useState([])

    function ProcessPurchase(){
       if(items.length === 0){
           alert("Debe añadir productos")
       }else{
            Axios.post("http://localhost:3001/generateOrder",{
                idCustomer: idCustomer,
                final_price: final_price,
                satisfaction: nivSatis
            }).then((result)=>{alert("Orden Generada!")})
        }
    }

    function deleteItem(item){
        Axios.post("http://localhost:3001/deleteItems",{
            idCustomer: idCustomer,
            id_dish :item.dish_id
        }).then((result)=>{alert(" Plato Eliminado")})
        setChange(1)

    }
    

    function getItems(id_customer){
        console.log(id_customer )
        Axios.post("http://localhost:3001/purchaseList",{
            idcustomer: id_customer
        })
        .then((result) => { 
            setItems(result.data)
            let price_total = 0;
            result.data.forEach((item) => { price_total += item.previousPrice})
            setFinalPrice(price_total)
        });
    }

    function detectedOrder(id){
        Axios.post("http://localhost:3001/orders",{
            id_customer: id
        }).then((result) =>{
            console.log(result)
            setOrderStatus(result)
        })
    }

    useEffect(()=>{
        Axios.get("http://localhost:3001/login").then((response) => { 
            if (response.data.loggedIn) {
                setIdCustomer(response.data.data.customer_id)
                getItems(response.data.data.customer_id)
                detectedOrder(response.data.data.customer_id)
            }
        });

        
    },[change])

    if(!orderStatus || orderStatus.data?.length > 0/* orderStatus.data?.state_purchase === 1 */) {
        return(
            <div className="listorder">
                <p>Por politica del Restaurante solo se puede registrar una orden por cliente, hasta que esta sea entregada</p>
                Orden Registrada
                <p>Numero de Orden: {orderStatus.data[0].order_id}</p>
                <p>Fecha de registro: {orderStatus.data[0].time_created}</p>
                <p>Monto de la Compra: S/{orderStatus.data[0].final_price}</p>
                <p>Estado de la orden: {orderStatus.data[0].state_purchase ? "En Proceso" : "Entregada"}</p>
            </div>)
        }else{
return(
    <div>
        <h1>Lista de Pedidos</h1>
        <div className="allitems">
        {
        items.map((item) =>{           
            return(
                <div key={item.dish_id} className="items_order">
                    <div>{item.dish_name}</div>
                    <div>{item.price}</div>
                    <div>{item.quantity}</div>
                    <div>{item.previousPrice}</div>
                    <div><button onClick={()=>{deleteItem(item)}}>X</button></div>
                </div>
            )
        })

        }
        </div>
        <div className="final_price">Precio Final: {final_price.toFixed(2)}</div>
        <div onChange={event => setSatis(Number(event.target.attributes[2].value))}>
            <div>Nivel de Satisfaction:</div>
            <input type="radio" name="empleoactual" value="5"/> Muy Satisfecho
            <input type="radio" name="empleoactual" value="4"/> Satisfecho
            <input type="radio" name="empleoactual" value="3"/> Neutral
            <input type="radio" name="empleoactual" value="2"/> Insatisfecho
            <input type="radio" name="empleoactual" value="1"/> Muy Insatisfecho
        </div>
        <div>
            <button onClick={ProcessPurchase}>Procesar Compra</button>
        </div>

    </div>
)
    }
    
    
}
export default ListOrders;