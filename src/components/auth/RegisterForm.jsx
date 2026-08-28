"use client";

import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/context/AuthContext";
import { api, ApiError } from "@/lib/api";
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
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { Description, Radio, RadioGroup } from "@heroui/react";

const RegisterForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [googlePending, setGooglePending] = useState(false);
  const [role, setRole] = useState("user");
  const { register } = useAuth();
  const router = useRouter();

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
      const signUpData = Object.fromEntries(formData.entries());

      if (signUpData.password !== signUpData.confirmPassword) {
        toast.error("Passwords do not match");
        setIsPending(false);
        return;
      }

      const { token } = await register({
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
        role,
      });

      if (role === "writer") {
        try {
          const { url } = await api.post(
            "/payments/checkout/writer-verification",
            {},
            { token },
          );
          toast.success("Account created! Complete verification to start publishing.");
          window.location.href = url;
          return;
        } catch {
          toast.success(
            "Account created! You can complete writer verification anytime from your dashboard.",
          );
          router.push("/dashboard/writer");
          return;
        }
      }

      toast.success("Registered successfully!");
      router.push("/");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Registration failed. Please try again.");
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
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
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

        <TextField isRequired minLength={8} name="confirmPassword" type="password">
          <Label className="text-white">Confirm Password</Label>
          <Input placeholder="Re-enter your password" />
          <FieldError />
        </TextField>

        <div className="flex flex-col gap-4">
          <Label className="text-white">Select Role</Label>
          <RadioGroup
            defaultValue="user"
            name="role"
            orientation="horizontal"
            onChange={(value) => setRole(value)}
          >
            <Radio value="user">
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
          {role === "writer" && (
            <Description className="text-gray-400 text-sm">
              Writers complete a one-time verification payment right after
              signing up.
            </Description>
          )}
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
        isDisabled={googlePending}
        className="w-full bg-white text-black rounded-md"
      >
        {googlePending ? <Spinner color="current" size="sm" /> : <FcGoogle />}
        Continue with Google
      </Button>
      <p className="text-xs text-center text-gray-500">
        Google sign-up starts as a Reader account — upgrade to Writer anytime
        from your dashboard.
      </p>
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
