import { useState, useEffect } from "react";
import LoginWithSession from './LoginWithSession';
import LoginWithoutSession from './LoginWithoutSession'
import Axios from "axios";

function Login(){

  const [logginStatus, setLogginStatus] =  useState(undefined)

  function changeStatusTrue() {
    setLogginStatus(true);
  }
  function changeStatusFalse() {
    setLogginStatus(false);
  }

  function getLogin() {
    return new Promise((resolve, reject) => {
        Axios.get(`http://localhost:3001/login`)
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
  
  useEffect(() => {   
    getLogin().then((result)=>{
      console.log(result.loggedIn)
      setLogginStatus(result.loggedIn)
    })
  },[]);


    if (logginStatus) {
      return(<LoginWithSession changeStatus={changeStatusFalse}/>)
    } 
    if(logginStatus === undefined){
      return(
        <div>Cargando...</div>
      )
    }  
    else {
      return(<LoginWithoutSession changeStatus={changeStatusTrue}/>)
    }
}
export default Login;