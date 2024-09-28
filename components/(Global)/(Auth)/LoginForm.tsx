"use client";
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import AuthButton from './AuthButton';
import { z } from 'zod';

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Zod ile form verilerini doğrula
    const LoginSchema = z.object({
      email: z.string().email("Geçerli bir email adresi girin"),
      password: z.string().min(2, "Şifre en az 2 karakter olmalıdır"),
    });

    const result = LoginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!result.success) {
      setError(result.error.errors.map(err => err.message).join(", "));
      if (event.currentTarget) {
        event.currentTarget.reset(); // Formu temizle
      }
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.get("email"),
        password: formData.get("password"),
      });

      if (result?.error) {
        setError('Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
        if (event.currentTarget) {
          event.currentTarget.reset(); // Formu temizle
        }
      } else {
        // Başarılı girişten sonra sayfayı yeniden yükle
        window.location.href = "/";
      }
    } catch (error: any) {
      setError(error.message);
      if (event.currentTarget) {
        event.currentTarget.reset(); // Formu temizle
      }
    }
  };

  return (
    <div className=''>
        <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
                <label className='block text-sm font-medium text-gray-200' htmlFor='Email'>Email</label>
                <input type='email' placeholder='Email' name='email' id="email" className='mt-1 w-full px-4 py-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700' />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-200' htmlFor='Email'>Şifreniz</label>
                <input type='password' placeholder='Şifreniz' name='password' id="password" className='mt-1 w-full px-4 py-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700' />
            </div>
            
            <div className='mt-4'>
                <AuthButton />
            </div>
            {error && <p className="text-red-500 text-center pt-6 animate-blink-5">{error}</p>}
        </form>
    </div>
  )
}

export default LoginForm;