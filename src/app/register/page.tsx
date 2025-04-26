"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ArcanimalLogo from '@/assets/logo.png'
import Image from "next/image";

interface RegisterForm {
  email: string;
  password: string;
  name: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Falha no cadastro, tente novamente.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 5c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm-15-5c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm30 0c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z' fill='%23e2e8f0' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-md bg-opacity-90">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full animate-bounce">
            <Image src={ArcanimalLogo} alt="Logo"/>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Criar Conta
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Cadastre-se para gerenciar as questões da Arcanimal
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-user text-gray-400"></i>
            </div>
            <input
              id="name"
              type="text"
              placeholder="Nome Completo"
              {...register("name", { required: "Nome é obrigatório" })}
              className="pl-10 w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-envelope text-gray-400"></i>
            </div>
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              {...register("email", { required: "Email é obrigatório" })}
              className="pl-10 w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-lock text-gray-400"></i>
            </div>
            <input
              id="password"
              type="password"
              placeholder="Senha"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha precisa ter pelo menos 6 caracteres",
                },
              })}
              className="pl-10 w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-4 rounded-lg hover:from-green-500 hover:to-green-700 transition-all duration-300"
          >
            Criar Conta
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-green-600 hover:text-green-500 hover:underline"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
