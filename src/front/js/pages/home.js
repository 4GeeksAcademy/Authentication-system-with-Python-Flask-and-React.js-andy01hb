import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
    const { actions } = useContext(Context);

    // Estados para el registro
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    // Estados para el login
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleRegister = async () => {
        const success = await actions.register(registerEmail, registerPassword);
        if (success) {
            console.log("Registration successful");
        } else {
            console.log("Registration failed");
        }
    };

    const handleLogin = async () => {
        const success = await actions.login(loginEmail, loginPassword);
        if (success) {
            console.log("Login successful");
        } else {
            console.log("Login failed");
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>Register</h1>
            <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleRegister}>Register</button>

            <h1>Login</h1>
            <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};
