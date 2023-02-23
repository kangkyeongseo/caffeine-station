import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Form {
  id: string;
  password: string;
  confirmPassword: string;
}

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
    <>
      <form onSubmit={handleSubmit(onValid)}>
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
        <input type="submit" placeholder="Join" />
      </form>
    </>
  );
};

export default Join;
