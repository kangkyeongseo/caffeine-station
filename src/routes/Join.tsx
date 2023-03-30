import { flashState } from "Atom";
import { response } from "express";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

interface Form {
  id: string;
  password: string;
  confirmPassword: string;
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
  font-size: 22px;
`;

const Form = styled.form<{
  idFocus: boolean;
  passwordFocus: boolean;
  confrimFocus: boolean;
}>`
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
  input:nth-child(5) {
    border: ${(props) =>
      props.confrimFocus ? "1px solid #e63946" : "0.5px solid #000000"};
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

const ErrorMsg = styled.div<{ display: boolean }>`
  display: ${(props) => (props.display ? "block" : "none")};
  color: #e63946;
  font-size: 13px;
  padding: 7px;
  text-align: center;
`;

const Join = () => {
  const navigate = useNavigate();
  const setFlash = useSetRecoilState(flashState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Form>();
  const onValid = async (data: Form) => {
    if (data.password !== data.confirmPassword) {
      setError(
        "confirmPassword",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
      return;
    }
    const response = await fetch("http://localhost:8000/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((response) => response.json());
    if (response.ok === true) {
      setFlash(response.message);
      navigate("/login");
    } else {
      setFlash(response.message);
    }
  };
  return (
    <Container>
      <Title>가입하기</Title>
      <Form
        onSubmit={handleSubmit(onValid)}
        idFocus={errors.id ? true : false}
        passwordFocus={errors.password ? true : false}
        confrimFocus={errors.confirmPassword ? true : false}
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
        <input
          {...register("confirmPassword", {
            required: "비밀번호를 입력해주세요.",
          })}
          type="password"
          placeholder="Confirm Password"
        />
        <ErrorMsg display={errors.confirmPassword ? true : false}>
          {errors.confirmPassword?.message}
        </ErrorMsg>
        <input type="submit" value="가입" />
      </Form>
    </Container>
  );
};

export default Join;
