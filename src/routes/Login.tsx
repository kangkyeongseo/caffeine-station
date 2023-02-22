import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [id, setId] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setId(value);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="ID" onChange={onChange} value={id} />
        <input type="password" placeholder="Password" />
        <input type="submit" placeholder="Login" />
      </form>
      <Link to="/join">Join</Link>
    </>
  );
};

export default Login;
