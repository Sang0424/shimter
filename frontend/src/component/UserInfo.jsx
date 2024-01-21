import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import "./UserInfo.scss";
import { getCookie, removeCookie } from "../lib/Cookie.js";
import axios from "axios";
import { persistor } from "../main.jsx";

const UserInfo = ({ user }) => {
  const token = getCookie("accessToken");
  // const token = useSelector((state) => state.user.token);
  // const handleClick = useCallback(async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios
  //       .post("/api/auth/logout", {}, { withCredentials: true })
  //       .then(async () => {
  //         location.reload();
  //         await persistor.purge();
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  const handleClick = useCallback(
    async (e) => {
      e.preventDefault();
      removeCookie("accessToken", {
        expires: new Date(new Date().getTime() + 1 * 60000),
      });
      removeCookie("refreshToken", {
        expires: new Date(new Date().getTime() + 5 * 60000),
      });
      persistor.purge();
      await axios.get("/api/auth/logout", {
        headers: { authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    },
    [token]
  );

  return (
    <div className="LoggedIn">
      <Link to={`/profile/${user.id}`}>
        <div className="userProfile">{user.nick}</div>
      </Link>
      <button type="button" onClick={handleClick}>
        로그아웃
      </button>
    </div>
  );
};

export default UserInfo;
