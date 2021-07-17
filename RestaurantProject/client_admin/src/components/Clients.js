import { useState, useEffect } from 'react';
import Axios from 'axios';
function Clients(){

    const [clients, setClients] = useState([]);
    function ADM_getClients() {
        return new Promise((resolve, reject) => {
            Axios.get(`http://localhost:3001/customer`)
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

    useEffect(()=>{
        ADM_getClients()
        .then((result)=>{
            setClients(result)
        })
    },[])

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>CLIENTES(ID)</th>
                        <th>NOMBRES</th>
                        <th>APELLIDOS</th>
                        <th>EMAIL</th>
                        <th>TELEFONO CELULAR</th>
                        <th>DIRECCION</th>
                        <th>CREACION</th>
                        <th>ULTIMA ACTUALIZACION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    clients.map((client)=>{
                            let time_created = convertDate(client.time_joined)
                            let time_modified = convertDate(client.time_modified)
                        return(
                        <tr>
                            <td>{client.customer_id}</td>
                            <td>{client.first_name}</td>
                            <td>{client.last_name}</td>
                            <td>{client.email}</td>
                            <td>{client.cellphone}</td>
                            <td>{client.address}</td>
                            <td>{time_created}</td>
                            <td>{time_modified}</td>
                        </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )

}
export default Clients;