"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [googlePending, setGooglePending] = useState(false);
  const { login } = useAuth();

  const handleGoogle = async () => {
    setGooglePending(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/auth/callback",
      });
    } catch {
      toast.error("Could not start Google sign-in. Please try again.");
      setGooglePending(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const formData = new FormData(e.target);
      const { email, password } = Object.fromEntries(formData.entries());

      await login({ email, password });
      toast.success("Welcome back!");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Login failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-[#151516] p-10 shadow">
      <Form onSubmit={onSubmit} className="space-y-4">
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label className="text-white">Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField isRequired name="password" type="password">
          <Label className="text-white">Password</Label>
          <Input placeholder="Enter your password" />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit" className="w-full">
            {isPending ? (
              <>
                <Spinner color="current" size="sm" />
                Signing in...
              </>
            ) : (
              <>
                Sign In <FaArrowRight />
              </>
            )}
          </Button>
        </div>
      </Form>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-sm">Or continue with</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <Button
        onClick={handleGoogle}
        isDisabled={googlePending}
        className="w-full bg-white text-black rounded-md"
      >
        {googlePending ? <Spinner color="current" size="sm" /> : <FcGoogle />}
        Continue with Google
      </Button>

      <p className="text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-[#15A1BF] font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
