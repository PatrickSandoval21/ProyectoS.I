import React, {useState } from "react";
import Axios from "axios";
import '../styles/RegisteLo.css';


export default function RegisterSection() {

  const initialStateRegister = {
    name: "",
    lastname: "",
    tel: "",
    direction: "",
    email: "",
    passw: ""
  }
  const [paramsRegister, setParamsRegister] = useState(initialStateRegister)

  const [RegisterStatus, setRegisterStatus] = useState("")

  Axios.defaults.withCredentials = true;

  const register = (e) => {
    e.preventDefault()
    Axios.post("http://localhost:3001/register", {
      email : paramsRegister.email,
      password : paramsRegister.passw,
      firstName : paramsRegister.name,
      lastName : paramsRegister.lastname,
      cellphone : paramsRegister.tel,
      address: paramsRegister.direction,
    }).then((response) => {
      setRegisterStatus(response.data.message);
    });
  };
 
  function setStates() {
      let Iname = document.getElementById("name").value
      let Ilastname = document.getElementById("lastname").value
      let Itel= document.getElementById("tel").value
      let Idirection = document.getElementById("direction").value
      let Iemail = document.getElementById("email").value
      let Ipassw = document.getElementById("passw").value

      setParamsRegister({
        name : Iname,
        lastname : Ilastname,
        tel: Itel,
        direction: Idirection,
        email: Iemail,
        passw: Ipassw
      })
      
  }
  return (
    <form className="Register" onSubmit={(e)=>register(e)}>
      <h1>Registrate</h1>
      <div>
        <label>Nombres:</label>
        <input type="text" id="name" onChange ={setStates} value = {paramsRegister.name.toString()} required />
      </div>
      <div>
        <label>Apellidos:</label>
        <input type="text" id="lastname" onChange ={setStates} value = {paramsRegister.lastname} required/>
      </div>
      <div>
        <label>Telefono:</label>
        <input type="tel" id="tel" onChange ={setStates} value = {paramsRegister.tel} required/>
      </div>
      <div>  
        <label>Dirección:</label>
        <input type="text" id="direction" onChange ={setStates} value = {paramsRegister.direction} required/>
      </div>
      <div>  
        <label>Email:</label>
        <input type="email" id="email" onChange ={setStates} value = {paramsRegister.email} required/>
      </div>
      <div>  
        <label>Contraseña:</label>
        <input type="password" id="passw" onChange ={setStates} value = {paramsRegister.passw} required/>
      </div>
      <div>
        <button type="submit">Registrarse</button>
      </div>
      

      <h1>{RegisterStatus}</h1>
    </form>
  );
}