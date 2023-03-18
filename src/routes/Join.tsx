import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  margin: 0 auto;
  padding: 70px 0px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 22px;
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

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
`;

const ErrorMsg = styled.span`
  color: #e63946;
`;

const Join = () => {
  const navigate = useNavigate();
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
    });
    if (response.status === 200) {
      navigate("/login");
    }
  };
  return (
    <Container>
      <Title>가입하기</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("id", { required: "아이디를 입력해주세요." })}
          type="text"
          placeholder="ID"
        />
        <input
          {...register("password", { required: "비밀번호를 입력해주세요." })}
          type="password"
          placeholder="Password"
        />
        <input
          {...register("confirmPassword", {
            required: "비밀번호를 입력해주세요.",
          })}
          type="password"
          placeholder="Confirm Password"
        />
        <input type="submit" value="가입" />
      </Form>
      <ErrorContainer>
        <ErrorMsg>{errors.id?.message}</ErrorMsg>
        <ErrorMsg>{errors.password?.message}</ErrorMsg>
        <ErrorMsg>{errors.confirmPassword?.message}</ErrorMsg>
      </ErrorContainer>
    </Container>
  );
};

export default Join;
