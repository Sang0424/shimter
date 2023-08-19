import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),
    name: Yup.string().required("이름을 입력하세요"),
    nick: Yup.string()
      .min(2, "닉네임은 최소 2글자 이상입니다!")
      .max(20, "닉네임은 최대 20글자입니다!")
      .matches(
        /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]*$/,
        "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
      )
      .required("닉네임을 입력하세요!"),
    password: Yup.string()
      .min(8, "비밀번호는 최소 8자리 이상입니다")
      .max(16, "비밀번호는 최대 16자리입니다!")
      .required("패스워드를 입력하세요!")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[^\s]*$/,
        "알파벳, 숫자, 공백을 제외한 특수문자를 모두 포함해야 합니다!"
      ),
    passwordConf: Yup.string()
      .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다!")
      .required("필수 입력 값입니다!"),
  });
  const submit = async (values) => {
    const { email, name, nick, password } = values;
    try {
      await axios
        .post("/api/auth/signup", {
          email,
          name,
          nick,
          password,
        })
        .then((res) => console.log(res));
      setTimeout(() => {
        navigate("/");
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        nick: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({ values, handleSubmit, handleChange, errors }) => (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">이메일: </label>
          <input
            type="email"
            name="email"
            placeholder="이메일"
            values={values.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-msg">{errors.email}</div>}
          <label htmlFor="name">이름: </label>
          <input
            type="text"
            name="name"
            placeholder="이름"
            values={values.name}
            onChange={handleChange}
          />
          <label htmlFor="nick">닉네임: </label>
          <input
            type="text"
            name="nick"
            placeholder="닉네임"
            values={values.nick}
            onChange={handleChange}
          />
          {errors.nick && <div className="error-msg">{errors.nick}</div>}
          <label htmlFor="password">비밀번호: </label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            values={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="error-msg">{errors.password}</div>
          )}
          <label htmlFor="passwordConf">비밀번호 확인: </label>
          <input
            type="password"
            name="passwordConf"
            placeholder="비밀번호 확인"
            values={values.passwordConf}
            onChange={handleChange}
          />
          <button type="submit">회원가입</button>
          <button type="button">취소</button>
        </form>
      )}
    </Formik>
  );
};

export default SignUpPage;
