/* eslint-disable react/prop-types */
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import notification_icon from "../../assets/notification.png";
import more_icon from "../../assets/more.png";
import profile_icon from "../../assets/user_icon.jpg";
import { Link } from "react-router-dom";

const Navbar = ({ setSidebar }) => {
  return (
    <nav>
      <div className="nav-left">
        <img
          className="menu_icon"
          src={menu_icon}
          alt="Menu"
          onClick={() => {
            setSidebar((prev) => !prev);
          }}
        />
        <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="nav-middle">
        <div className="searchbox">
          <input type="text" placeholder="Search" />
          <img src={search_icon} alt="Search" />
        </div>
      </div>
      <div className="nav-right">
        <img src={upload_icon} alt="Upload" />
        <img src={more_icon} alt="More" />
        <img src={notification_icon} alt="Notifications" />
        <img className="profile_icon" src={profile_icon} alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
