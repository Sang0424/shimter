import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="#">전체</Link>
        </li>
        <li>
          <Link to="#">휴식</Link>
        </li>
        <li>
          <Link to="#">힐링</Link>
        </li>
        <li>
          <Link to="#">웃음</Link>
        </li>
        <li>
          <Link to="#">칭찬</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
