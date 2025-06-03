'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import "./login.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [error, setError] = useState("")

  async function login() {

    if(username === "" || password === ""){
      setError("digite user e password !")
      return
    }

    if(username.length <= 4 || password.length <= 4){
      setError("digite um user ou password correto !")
      return
    }
    setError("Loading...")
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }), // use 'user' para bater com backend
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json()
    if(data.ok === 0){
      setError(data.status)
      return
    }
    if (res.ok) {
      setError("Connecting...")
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      // Login falhou, pega mensagem de erro e mostra no console (pode melhorar UI)
      setError("Login falhou ->: " + data.status)
    }
  }

  return (
    <div className="display-login">
      <h2>LOGIN VIA MYSQL E JWT PROTECT</h2>
      <Input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={login}>LOGIN</Button>
      {error ? (
        <h3 className="status_login">{error}</h3>
      ) : (<></>)}
    </div>
  );
}
