"use client";
import NavigationBar from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Orbit, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { email, password, name } = Object.fromEntries(
      formData.entries()
    ) as {
      email?: string;
      password?: string;
      name?: string;
    };

    fetch(`http://localhost:8080/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password, name }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Signup successful");
          router.push("/dashboard");
        } else {
          toast.error("Signup failed");
        }
      })
      .catch((error) => {
        toast.error("Signup failed", error);
      });
  };

  return (
    <div className="min-h-screen ">
      <NavigationBar />
      <div className="flex h-screen justify-center items-center">
        <div className="backdrop-blur-md bg-white/60 border-2 border-white/40 shadow-xl rounded-3xl px-10 py-12 flex flex-col items-center w-full max-w-md transition-all duration-300">
          <div className="mb-6 flex items-center space-x-3">
            <Orbit className="text-indigo-600" width={36} height={36} />
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-700">
              Get Started
            </h1>
          </div>
          <p className="mb-8 text-gray-500 text-center text-sm">
            Please enter your details to proceed.
          </p>
          <form
            className="w-full flex flex-col space-y-6"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <Label className="text-gray-600 flex items-center gap-2">
                <Mail size={18} />
                Name
              </Label>
              <Input
                type="name"
                name="name"
                placeholder="name@example.com"
                className="mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
              />
            </div>
            <div>
              <Label className="text-gray-600 flex items-center gap-2">
                <Mail size={18} />
                Email
              </Label>
              <Input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
              />
            </div>
            <div>
              <Label className="text-gray-600 flex items-center gap-2">
                <Lock size={18} />
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="••••••"
                className="mt-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium py-2 rounded-lg shadow"
            >
              Sign Up
            </Button>
          </form>
          <div className="w-full flex justify-end mt-4 text-xs text-gray-500">
            <a href="#" className="hover:underline">
              Already have an account? Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
