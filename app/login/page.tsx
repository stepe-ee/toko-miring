'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // Cek kredensial untuk user dan admin
    if (email === 'user123' && password === '12345') {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('role', 'user')
      router.push('/dashboard/customers/ferrari')
    } else if (email === 'admin123' && password === '12345') {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('role', 'admin')
      router.push('/admin/dashboard')
    } else {
      alert('Invalid credentials. Please try again.')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1e29] via-[#1e2f38] to-[#a3b8b5]">
      <div className="flex flex-col md:flex-row items-center bg-transparent rounded-3xl p-6 md:p-12 shadow-2xl backdrop-blur-md">
        {/* Logo Section */}
        <div className="mb-6 md:mb-0 md:mr-12">
          <Image src="/images/logos/toko.jpg" alt="Toko Miring Logo" width={250} height={250} className="rounded-3xl" />
        </div>

        {/* Login Form */}
        <div className="bg-white/10 p-8 rounded-3xl w-[320px]">
          <h2 className="text-center text-2xl font-bold text-white mb-6 drop-shadow">Login</h2>

          <div className="space-y-4">
            {/* Email */}
            <div className="relative">
              <span className="absolute top-2.5 left-2 w-5 h-5 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" viewBox="0 0 24 24"><path d="M2 4v16h20V4H2zm10 7.414L4.707 6h14.586L12 11.414z" /></svg>
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-white"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute top-2.5 left-2 w-5 h-5 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-7V8a6 6 0 10-12 0v2H4v10h16V10h-2zm-2 0H8V8a4 4 0 118 0v2z" /></svg>
              </span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-white"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-b from-[#5b7773] to-[#1f2b2a] text-white font-semibold py-2 mt-4 rounded-full hover:opacity-90 transition block text-center"
            >
              Login
            </button>

            <div className="flex justify-between text-xs text-white mt-6">
              <Link href="/signup" className="hover:underline">Create an account</Link>
              <Link href="/reset" className="hover:underline">Forgot Password</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}