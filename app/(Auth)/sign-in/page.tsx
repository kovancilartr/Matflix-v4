import LoginForm from "@/components/LoginForm";
import LoginGithub from "@/components/LoginGithub";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  return (
    <div className="w-full h-screen flex justify-center bg-black bg-opacity-65">
      <section className="flex flex-col w-[450px] justify-center">
        <div className="border-2 border-gray-800 rounded-md p-6 shadow-lg bg-gray-800 bg-opacity-80 pb-6">
          <h1 className="text-3xl w-full text-center font-bold mb-6 shadow-lg text-white">
            Giriş Yap
          </h1>
          <LoginForm />
        </div>
        <div className="w-full flex justify-center mt-4 pb-0 mb-0">
          <Link href="/" className="text-sm text-gray-400">
            Anasayfaya geri dön
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
