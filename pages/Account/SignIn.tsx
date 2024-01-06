// pages/Login.tsx
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./authContext";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password);

      router.push("/Territories/All");
      //   setError("Incorrect username or password");
    } catch (err) {
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="flex flex-col m-10 sm:flex-row bg-white border-2 border-black rounded-lg">
      <div className="w-1/2 p-6 flex items-center justify-center m-auto">
        <Image src="/Coder.svg" alt="SVG Image" width={500} height={300} />
      </div>
      <div className="w-full sm:w-1/2 p-6 flex items-center m-auto">
        <div className="w-full max-w-md mx-auto p-8 border rounded-lg bg-white shadow-md">
          <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="mb-1 font-medium">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
