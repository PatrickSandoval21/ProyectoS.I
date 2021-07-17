import { useState} from "react";
import Axios from "axios";
import '../styles/RegisteLo.css';

function LoginWithoutSession({changeStatus}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

  function loginSubmit(e) {
    e.preventDefault()
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setMessage(response.data.message);
      } else {
/*         console.log(response.data) */
        changeStatus();
      }
    });
  };

    return(
        <div>
            <p>{message}</p>
            <form onSubmit={(e) => {loginSubmit(e)}}>
            <div>
              <label>Email:</label>
              <input type="email" onChange ={(e)=>{setEmail(e.target.value)}} value = {email}/>
            </div>
            <div>
              <label>Contraseña:</label>
              <input type="password" onChange ={(e)=>{setPassword(e.target.value)}} value = {password}/>
            </div>
            <div>
              <button type="submit" >Iniciar Sesion</button>
            </div>
            
            
        </form>
        </div>
        
    )
}
export default LoginWithoutSession;