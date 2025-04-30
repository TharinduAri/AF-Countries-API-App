import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "../components/premitives";
import DefaultLayout from "../layouts/default";
import { authService } from "../services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);
      const response = await authService.login(email, password);
      
      // Check if login was successful by looking for token
      if (response.token) {
        localStorage.setItem("token", response.token);
        console.log("Login successful:", response);
        navigate("/home");
      } else {
        // If we get a response but no token, it's probably an error message
        setError(response.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return React.createElement(DefaultLayout, null, 
    React.createElement("section", { 
      className: "flex flex-col items-center justify-center gap-4 py-8 md:py-10" 
    }, [
      React.createElement("div", { 
        className: "inline-block max-w-lg text-center justify-center",
        key: "header"
      }, [
        React.createElement("span", { 
          className: title(),
          key: "title"
        }, "Login"),
        React.createElement("div", { 
          className: subtitle({ class: "mt-4" }),
          key: "subtitle"
        }, "Enter your credentials to access your account.")
      ]),
      
      error && React.createElement("div", {
        className: "w-full max-w-md p-3 my-2 text-sm text-red-500 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-300",
        key: "error"
      }, error),
      
      React.createElement("form", {
        onSubmit: handleSubmit,
        className: "w-full max-w-md flex flex-col gap-4",
        key: "form"
      }, [
        React.createElement(Input, {
          type: "email",
          placeholder: "Email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          disabled: isLoading,
          key: "email"
        }),
        React.createElement(Input, {
          type: "password",
          placeholder: "Password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          disabled: isLoading,
          key: "password"
        }),
        React.createElement("button", {
          type: "submit",
          className: buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          }),
          disabled: isLoading,
          key: "submit"
        }, isLoading ? "Logging in..." : "Login")
      ]),
      
      React.createElement("p", { 
        className: "mt-4",
        key: "register-prompt"
      }, [
        "Don't have an account? ",
        React.createElement(Link, {
          href: "/register",
          className: "text-blue-500",
          key: "register-link"
        }, "Register")
      ])
    ])
  );
}