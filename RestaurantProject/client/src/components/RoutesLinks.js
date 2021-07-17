import React from "react";
import {Link} from "react-router-dom";

function RoutesLinks() {
  return(
      <div>
        <nav>
          <ul>
            <li className="li-nav">
              <Link to="/Login" className="a-nav">Mi cuenta</Link>
            </li>
            <li  className="li-nav">
              <Link to="/Register" className="a-nav" >Registrarse</Link>
            </li>
            <li  className="li-nav">
              <Link to="/Menu" className="a-nav">Menú</Link>
            </li>
            <li  className="li-nav">
              <Link to="/" className="a-nav">Home</Link>
            </li>
          </ul>
        </nav>
      </div>

  );
}
export default RoutesLinks;
