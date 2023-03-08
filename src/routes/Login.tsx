import { sessionState } from "Atom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
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
  margin: 0 auto;
  padding: 70px 0px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 22px; ;
`;

const Form = styled.form`
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
  input:last-child {
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

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const [loginMessage, setLoginMessage] = useState("");
  const [session, setSassion] = useRecoilState(sessionState);
  const navigate = useNavigate();
  const onValid = async (data: Form) => {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((response) => response.json());
    if (!response.ok) {
      setLoginMessage(response.message);
    } else {
      setSassion({
        loggedIn: response.session.loggedIn,
        user: response.session.user,
      });
      navigate("/");
    }
  };
  return (
    <Container>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("id", { required: "Write here" })}
          type="text"
          placeholder="ID"
        />
        {errors.id?.message}
        <input
          {...register("password", { required: "Write here" })}
          type="password"
          placeholder="Password"
        />
        {errors.password?.message}
        <input type="submit" value="Login" />
      </Form>
      {loginMessage}
      <Join>
        <Link to="/join">Join</Link>
      </Join>
    </Container>
  );
};

export default Login;
