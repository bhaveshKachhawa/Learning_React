import { imgPath } from "../utils/constants";

const Header = () => {
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
      </ul>
    </div>
    </div>
  );
}

export default Header;