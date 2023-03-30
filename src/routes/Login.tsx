import { flashState, sessionState } from "Atom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

interface Form {
  id: string;
  password: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  min-height: calc(100vh - 110px);
  margin: 0 auto;
  padding: 70px 0px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 22px; ;
`;

const Form = styled.form<{ idFocus: boolean; passwordFocus: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  margin-top: 30px;
  input {
    padding: 10px;
    margin-bottom: 5px;
    &:focus {
      outline: none;
    }
  }
  input:first-child {
    border: ${(props) =>
      props.idFocus ? "1px solid #e63946" : "0.5px solid #000000"};
  }
  input:nth-child(3) {
    border: ${(props) =>
      props.passwordFocus ? "1px solid #e63946" : "0.5px solid #000000"};
  }
  input:last-child {
    cursor: pointer;
    color: white;
    border: none;
    background-color: #246653;
    &:hover {
      background-color: #144235;
    }
  }
`;

const Join = styled.div`
  margin-top: 30px;
`;

const ErrorMsg = styled.div<{ display: boolean }>`
  display: ${(props) => (props.display ? "block" : "none")};
  color: #e63946;
  font-size: 13px;
  padding: 7px;
  text-align: center;
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const setFlash = useSetRecoilState(flashState);
  const setSession = useSetRecoilState(sessionState);
  const navigate = useNavigate();
  const onValid = async (data: Form) => {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((response) => response.json());
    if (!response.ok) {
      setFlash(response.message);
    } else {
      setSession({
        loggedIn: response.session.loggedIn,
        user: response.session.user,
      });
      setFlash(response.message);
      navigate("/");
    }
  };
  return (
    <Container>
      <Title>로그인</Title>
      <Form
        onSubmit={handleSubmit(onValid)}
        idFocus={errors.id ? true : false}
        passwordFocus={errors.password ? true : false}
      >
        <input
          {...register("id", { required: "아이디를 입력해주세요." })}
          type="text"
          placeholder="ID"
        />
        <ErrorMsg display={errors.id ? true : false}>
          {errors.id?.message}
        </ErrorMsg>
        <input
          {...register("password", { required: "비밀번호를 입력해주세요." })}
          type="password"
          placeholder="Password"
        />
        <ErrorMsg display={errors.password ? true : false}>
          {errors.password?.message}
        </ErrorMsg>
        <input type="submit" value="Login" />
      </Form>
      <Join>
        <Link to="/join">Join</Link>
      </Join>
    </Container>
  );
};

export default Login;
