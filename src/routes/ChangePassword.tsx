import { sessionState } from "Atom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

interface Form {
  existingPassword: string;
  changingPassword: string;
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

const ChangePassword = () => {
  const navigate = useNavigate();
  const [session, setSession] = useRecoilState(sessionState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Form>();
  const onValid = async (data: Form) => {
    if (data.changingPassword !== data.confirmPassword) {
      setError(
        "confirmPassword",
        {
          message: "변경할 비밀번호가 일치하지 않습니다.",
        },
        { shouldFocus: true }
      );
      return;
    }
    const response = await fetch("http://localhost:8000/api/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((response) => response.json());
    if (!response.ok) {
      setError(
        "existingPassword",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    } else {
      setSession({
        loggedIn: false,
        user: null,
      });
      navigate("/login");
    }
  };
  return (
    <Container>
      <Title>비밀번호 변경</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("existingPassword", { required: "입력해주세요." })}
          type="password"
          placeholder="현재 비밀번호"
        />
        <span>{errors.existingPassword?.message}</span>
        <input
          {...register("changingPassword", { required: "입력해주세요." })}
          type="password"
          placeholder="변경할 비밀번호"
        />
        <span>{errors.changingPassword?.message}</span>
        <input
          {...register("confirmPassword", { required: "입력해주세요." })}
          type="password"
          placeholder="비밀번호 확인"
        />
        <span>{errors.confirmPassword?.message}</span>
        <input type="submit" value="변경하기" />
      </Form>
    </Container>
  );
};

export default ChangePassword;
