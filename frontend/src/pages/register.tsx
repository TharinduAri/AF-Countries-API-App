import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Input } from "@heroui/input";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { authService } from '../services/authService';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const { username, email, password } = formData;
    
    // Basic validation
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await authService.register(username, email, password);
      
      if (response.token) {
        localStorage.setItem("token", response.token);
        console.log('Registration successful:', response);
        navigate('/home');
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError("An error occurred during registration. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Register</span>
          <div className={subtitle({ class: "mt-4" })}>
            Create an account to get started.
          </div>
        </div>

        {error && (
          <div className="w-full max-w-md p-3 my-2 text-sm text-red-500 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/" className="text-primary">
            Login
          </Link>
        </p>
      </section>
    </DefaultLayout>
  );
}