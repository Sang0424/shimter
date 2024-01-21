import { Navigate } from "react-router-dom";
import { getCookie } from "./Cookie";

const PrivateRoute = ({ component, path }) => {
  const token = getCookie("refreshToken");
  if (!token) {
    alert("로그인이 필요합니다");
    return <Navigate to={`/?redirectUrl=${path}`}></Navigate>;
  }
  return component;
};

export default PrivateRoute;
