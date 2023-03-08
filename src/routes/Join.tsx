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
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
      return;
    }
    const response = await fetch("http://localhost:8000/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
          {...register("id", { required: "write here" })}
          type="text"
          placeholder="ID"
        />
        {errors.id?.message}
        <input
          {...register("password", { required: "write here" })}
          type="password"
          placeholder="Password"
        />
        {errors.password?.message}
        <input
          {...register("confirmPassword", { required: "write here" })}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword?.message}
        <input type="submit" value="가입" />
      </Form>
    </Container>
  );
};

export default Join;
