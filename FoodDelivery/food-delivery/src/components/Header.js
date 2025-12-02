import { imgPath } from "../utils/constants";
import {useState} from 'react';

const Header = () => {
  const [btn, setBtn] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
            <img className='logo' src={imgPath} alt='jsx-a11y/img-redundant-alt' />
      </div>

    <div className="nav-items">
      <ul>
        <li>Home</li>
        <li>About us</li>
        <li>Contact</li>
        <li>Cart</li>
        <li><button className="login-btn" onClick={()=>btn === "Login"?setBtn("Log-out"):setBtn("Login")}>{btn}</button></li>
      </ul>
    </div>
    </div>
  );
}

export default Header;