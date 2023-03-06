import { sessionState } from "Atom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

interface Form {
  id: string;
  password: string;
}

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
    <>
      <form onSubmit={handleSubmit(onValid)}>
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
        <input type="submit" placeholder="Login" />
      </form>
      {loginMessage}
      <Link to="/join">Join</Link>
    </>
  );
};

export default Login;
