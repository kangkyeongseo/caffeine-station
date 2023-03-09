import { sessionState } from "Atom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

interface Form {
  existingPassword: string;
  changingPassword: string;
  confirmPassword: string;
}

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
    <>
      <h1>비밀번호 변경</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("existingPassword", { required: "입력해주세요." })}
          type="password"
        />
        <span>{errors.existingPassword?.message}</span>
        <input
          {...register("changingPassword", { required: "입력해주세요." })}
          type="password"
        />
        <span>{errors.changingPassword?.message}</span>
        <input
          {...register("confirmPassword", { required: "입력해주세요." })}
          type="password"
        />
        <span>{errors.confirmPassword?.message}</span>
        <input type="submit" value="변경하기" />
      </form>
    </>
  );
};

export default ChangePassword;
