import * as auth from "auth-provider";
import React from "react";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (
  entpoint: string,
  { data, token, headers, ...customConfig }: Config = {},
) => {
  const config = {
    method: data ? "POST" : "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    entpoint += `?${Object.entries(data || {})
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&")}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${entpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};
export const useHttp = () => {
  const { user } = useAuth();
  return (...[entpoint, config]: Parameters<typeof http>) =>
    http(entpoint, { ...config, token: user?.token });
};
