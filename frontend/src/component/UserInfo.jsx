import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user.js";
import "./UserInfo.scss";
import { persistor } from "../main.jsx";

const UserInfo = () => {
  //const dispatch = useDispatch();
  //const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleClick = useCallback(async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/api/auth/logout", {}, { withCredentials: true })
        .then(async () => {
          //location.reload();
          await persistor.purge();
        });
      //dispatch(setUser({ id: 0, name: "", email: "", nick: "" }));
      // setTimeout(async () => {
      //   location.reload();
      //   await persistor.purge();
      // }, 1000);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="LoggedIn">
      <Link to="#">
        <div className="userProfile">{user.nick}</div>
      </Link>
      <button type="button" onClick={handleClick}>
        로그아웃
      </button>
    </div>
  );
};

export default UserInfo;
