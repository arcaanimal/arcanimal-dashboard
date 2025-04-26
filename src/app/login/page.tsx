'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/components/AuthProvider';
import Link from 'next/link';
import ArcanimalLogo from '@/assets/logo.png'
import Image from 'next/image';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const router = useRouter();
  const { setUser } = useAuth();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const { user } = await response.json();
      setUser(user);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Erro no login:', error);
      alert(error.message || 'Falha no login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 paw-pattern bg-[#f8fafc]">
      <div className="login-container rounded-2xl overflow-hidden w-full max-w-md shadow-lg backdrop-blur-md">
        <div className="bg-white p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="animal-icon bg-blue-100 p-4 rounded-full">
                <Image src={ArcanimalLogo} alt='Arca logo'/>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Arcanimal Dashboard</h1>
            <p className="text-gray-600">Faça login para continuar</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  id="email"
                  type="email"
                  {...register('email', { required: 'Email é obrigatório' })}
                  className="input-field pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none transition duration-200"
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  id="password"
                  type="password"
                  {...register('password', { required: 'Senha é obrigatória' })}
                  className="input-field pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none transition duration-200"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="btn-login w-full py-3 px-4 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Ainda não tem uma conta?{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Registre-se
            </Link>
          </div>
        </div>
      </div>

      {/* Estilos extras */}
      <style jsx>{`
        .paw-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 5c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm-15-5c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm30 0c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z' fill='%23e2e8f0' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        .login-container {
          background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%);
        }
        .btn-login {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          transition: all 0.3s ease;
        }
        .btn-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
        }
        .animal-icon {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
