import React from "react";
import { useAuth } from "context/auth-context";

export const RegisterScreen = () => {
  const { register, user } = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const register = (param: { username: string; password: string }) => {
      const apiUrl = process.env.REACT_APP_API_URL;
      fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
      }).then(async (response) => {});
    };
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="">用户名</label>
        <input type="text" name="" id="" />
      </div>
      <div>
        <label htmlFor="">密码</label>
        <input type="password" name="" id="" />
      </div>
      <button type={"submit"}>注册</button>
    </form>
  );
};
