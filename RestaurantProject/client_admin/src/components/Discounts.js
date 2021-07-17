import Axios from 'axios';
import { useEffect, useState } from 'react';
import ModalDiscount from '../components/ModalDiscount'

function Discounts(){
    
    const[discounts, setDiscounts] = useState([])

    function ADM_discounts() {
        return new Promise((resolve, reject) => {
            Axios.get(`http://localhost:3001/adm_discounts`)
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
    function deleteDiscount(id){
        Axios.post('http://localhost:3001/delete/discount',{
            id: id
        }).then((result)=>{alert("Registro Eliminado")})
    }
    function convertDate(time){
        let date = new Date(time.toString());
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }           
        let dateString = dt +'-' + month + '-'+ year
        return dateString;
    }

    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [discounts_info, setdiscountsINfo] = useState([])

    function useModal (initialValue = false) {
        const [isOpen, setIsOpen] = useState(initialValue);
        const openModal = (disParams) => {
          setIsOpen(true); 
          setdiscountsINfo(disParams)
        };
        const closeModal = () => setIsOpen(false);
        return [isOpen, openModal, closeModal];
      };

    useEffect(()=>{
        ADM_discounts()
        .then((result) => {
            setDiscounts(result)
        })
    },[discounts])
    return(
        <div>    
            <table>
                <thead>
                    <tr>
                        <th>DESCUENTO(ID)</th>
                        <th>COMIDA</th>
                        <th>NOMBRE DEL DESCUENTO</th>
                        <th>DESCRIPCION</th>
                        <th>% DESCUENTO</th>
                        <th>ACTIVO</th>
                        <th>CREACION</th>
                        <th>ULTIMA MODIFICACION</th>
                        <th>MODIFICAR</th>
                        <th>ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        discounts.map((discount) => {
                            let active = discount.active === 1 ? "Activo" : "No activo";
                            let color = discount.active === 1 ? "green" : "red";
                            let color_property = {color: color, fontWeight: "bold"}

                            let time_created = convertDate(discount.time_created)
                            let time_modified = convertDate(discount.time_modified)

                            return(
                                <tr key={discount.discount_id}>
                                    <td>{discount.discount_id}</td>
                                    <td>{discount.dish_name}</td>
                                    <td>{discount.name}</td>
                                    <td>{discount.description}</td>
                                    <td>{discount.discount_percent}</td>
                                    <td style={color_property} >{active}</td>
                                    <td>{time_created}</td>
                                    <td>{time_modified}</td>
                                    <td onClick={()=>{
                                        openModal({
                                            id_discount: discount.discount_id,
                                            name_dish: discount.dish_name, 
                                            name_discount:discount.name, 
                                            description:discount.description,
                                            percent : discount.discount_percent,
                                        })}}><button>MODIFICAR</button></td>
                                    <td><button onClick={()=>{deleteDiscount(discount.discount_id)}}>ELIMINAR</button></td>
                                </tr>
                            )
                        })  
                    }
                    <ModalDiscount disParams={discounts_info} isOpen={isOpenModal} closeModal={closeModal} />
                </tbody>
            </table>      
        </div>
    );
}
export default Discounts;