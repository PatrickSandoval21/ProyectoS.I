import Axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import ListOrders from './ListOrders'
import '../styles/RegisteLo.css';

function LoginWithSession({changeStatus}) {

    const [logginStatus,setLogginStatus] = useState(undefined)
    const [account, setAccount] = useState([])


    useEffect(()=>{
        Axios.get("http://localhost:3001/login").then((response) => { 
            if (response.data.loggedIn) {
                setAccount(response.data)
                setLogginStatus(true) 
            }
        });
    },[])

    function logout() {
        Axios.post("http://localhost:3001/logout")
        .then((result) => {
            /* console.log(result) */
        });
        /* setLogginStatus(false) */
        changeStatus();
    }

    if (logginStatus) {
            
        return(
            <div>
                <div className="info_account">
                    <h4>Informacion de la Cuenta</h4>
                    <div>
                        <p>Email:</p>
                        <p>{account.data.email}</p>
                    </div>
                    <div>
                        <p>Direccion:</p>
                        <p>{account.data.address}</p>
                    </div>
                    <div>
                        <p>Nombres:</p>
                        <p>{account.data.first_name}</p>
                    </div>
                    <div>
                        <p>Apellidos:</p>
                        <p>{account.data.last_name}</p>
                    </div>
                    <div>
                        <p>Telefono de Contacto:</p>
                        <p>{account.data.cellphone}</p>
                    </div>
                    <div>
                        <p>Creacion de la Cuenta</p>
                        <p>{account.data.time_joined}</p>
                    </div>
                    <div>
                     <button onClick={logout}>cerrar sesion</button>
                    </div>
                    
                </div>
                <div>
                    <ListOrders/>
                </div>
            </div>
            
            
        )
    } if(logginStatus === undefined){
        return(
            <div>Cargando...</div>
        )
    }
    else {
        return(<Redirect to="/Menu" />)
    }
    
}
export default LoginWithSession;