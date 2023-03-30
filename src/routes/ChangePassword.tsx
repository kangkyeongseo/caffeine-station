import { flashState, sessionState } from "Atom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
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
  min-height: calc(100vh - 110px);
  margin: 0 auto;
  padding: 70px 0px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 22px;
`;

const Form = styled.form<{
  existingFocus: boolean;
  changingFocus: boolean;
  confirmFocus: boolean;
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
      props.existingFocus ? "1px solid #e63946" : "0.5px solid #000000"};
  }
  input:nth-child(3) {
    border: ${(props) =>
      props.changingFocus ? "1px solid #e63946" : "0.5px solid #000000"};
  }
  input:nth-child(5) {
    border: ${(props) =>
      props.confirmFocus ? "1px solid #e63946" : "0.5px solid #000000"};
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

const ChangePassword = () => {
  const navigate = useNavigate();
  const setSession = useSetRecoilState(sessionState);
  const setFlash = useSetRecoilState(flashState);
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
      setFlash(response.message);
      setError(
        "existingPassword",
        { message: "현재 비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    } else {
      setSession({
        loggedIn: false,
        user: null,
      });
      setFlash(response.message);
      navigate("/login");
    }
  };
  return (
    <Container>
      <Title>비밀번호 변경</Title>
      <Form
        onSubmit={handleSubmit(onValid)}
        existingFocus={errors.existingPassword ? true : false}
        changingFocus={errors.changingPassword ? true : false}
        confirmFocus={errors.confirmPassword ? true : false}
      >
        <input
          {...register("existingPassword", {
            required: "현재 비밀번호를 입력해주세요.",
          })}
          type="password"
          placeholder="현재 비밀번호"
        />
        <ErrorMsg display={errors.existingPassword ? true : false}>
          {errors.existingPassword?.message}
        </ErrorMsg>
        <input
          {...register("changingPassword", {
            required: "변경할 비밀번호를 입력해주세요.",
          })}
          type="password"
          placeholder="변경할 비밀번호"
        />
        <ErrorMsg display={errors.changingPassword ? true : false}>
          {errors.changingPassword?.message}
        </ErrorMsg>
        <input
          {...register("confirmPassword", {
            required: "변경할 비밀번호를 입력해주세요.",
          })}
          type="password"
          placeholder="비밀번호 확인"
        />
        <ErrorMsg display={errors.confirmPassword ? true : false}>
          {errors.confirmPassword?.message}
        </ErrorMsg>
        <input type="submit" value="변경하기" />
      </Form>
    </Container>
  );
};

export default ChangePassword;
