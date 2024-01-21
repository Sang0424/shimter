import Logo from "../assets/Logo.svg";
import Login from "./Login";
import NavBar from "./NavBar";
import UserInfo from "./UserInfo";
import jwtDecode from "jwt-decode";
import "./Header.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getCookie } from "../lib/Cookie";

const Header = ({ user }) => {
  // const token = useSelector((state) => state.user.token);
  // const user = token ? jwtDecode(token) : {};
  return (
    <div>
      <header>
        <div className="logo">
          <Link to="/">
            <img src={Logo} />
          </Link>
        </div>
        <div className="search_box">
          <input type="search" placeholder="검색어를 입력하세요" />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        {user.id > 0 ? <UserInfo user={user}></UserInfo> : <Login></Login>}
      </header>
      <div>
        <NavBar></NavBar>
      </div>
    </div>
  );
};

export default Header;
