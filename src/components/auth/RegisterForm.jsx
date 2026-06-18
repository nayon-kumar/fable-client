"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { Description, Radio, RadioGroup } from "@heroui/react";

const RegisterForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [role, setRole] = useState("reader");

  const handleGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      const formData = new FormData(e.target);
      const signUpData = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signUp.email({
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
        role: role,
      });
      if (data) {
        await authClient.signOut();
        toast.success("Register Successfully!");
        redirect("/login");
      } else {
        toast.error(`${error.message}`);
      }
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="flex w-full p-10 rounded-2xl shadow bg-[#151516] flex-col gap-4">
      <Form onSubmit={onSubmit} className="space-y-4">
        <TextField isRequired name="name" type="text">
          <Label className="text-white">Name</Label>
          <Input placeholder="Enter your name" />
          <FieldError />
        </TextField>
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

        <TextField
          isRequired
          minLength={6}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 6 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label className="text-white">Password</Label>
          <Input placeholder="Enter your password" />
          <FieldError />
        </TextField>

        <div className="flex flex-col gap-4">
          <Label className="text-white">Select Role</Label>
          <RadioGroup
            defaultValue="reader"
            name="role"
            orientation="horizontal"
            onChange={(value) => setRole(value)}
          >
            <Radio value="reader">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label className="text-white">Reader</Label>
              </Radio.Content>
            </Radio>
            <Radio value="writer">
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label className="text-white">Writer</Label>
              </Radio.Content>
            </Radio>
          </RadioGroup>
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="w-full">
            {isPending ? (
              <>
                <Spinner color="current" size="sm" />
                Registering...
              </>
            ) : (
              <>
                <Check />
                Register
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
        className="w-full bg-white text-black rounded-md"
      >
        <FcGoogle />
        Continue with Google
      </Button>
      <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-[#15A1BF] font-semibold">
          Signin
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
