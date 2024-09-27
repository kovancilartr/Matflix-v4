"use client";
import { login } from "@/actions/auth";
import React from "react";
import { FaGithub } from "react-icons/fa";

const LoginGithub = () => {
  return (
    <div
      onClick={() => login("github")}
      className="w-full gap-4 hover:cursor-pointer bg-black mt-6 h-12 rounded-md p-4 flex items-center justify-center"
    >
      <FaGithub className="text-white" />
      <p className="text-white">Login Github</p>
    </div>
  );
};

export default LoginGithub;
