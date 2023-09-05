import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("이메일 형식이 아닙니다")
      .required("이메일을 입력하세요"),
    password: Yup.string().required("비밀번호를 입력하세요"),
  });
  const submit = async (values) => {
    const { email, password } = values;
    try {
      const { data } = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(data));
      setTimeout(() => {
        navigate("/");
      }, 0);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ values, handleSubmit, handleChange }) => (
        <div className="login">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="이메일"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <button type="submit">로그인</button>
          </form>
          <div className="login_plus">
            <Link to="#">
              <span className="login_plus">아이디/비밀번호 찾기</span>
            </Link>
            <Link to="/signUp">
              <span className="login_plus">회원가입</span>
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
