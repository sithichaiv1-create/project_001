'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginModal({ isOpen, onClose }) {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isOpen) {
      setIsLoginMode(true)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLoginMode) {
      console.log('เข้าสู่ระบบด้วย:', { email, password })
    } else {
      console.log('สมัครสมาชิกด้วย:', { firstName, lastName, email, password })
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
     
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 transform transition-all animate-in fade-in zoom-in-95 duration-200">
       
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8 mt-2">
          {/* 🛠️ โลโก้ S²P ทรงปีก ไม่ครอบกรอบ/พื้นหลัง เพื่อไม่ให้ปีกถูกตัด */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center mb-4">
            <Image
              src="/logo.png"
              alt="Sudtupung Logo"
              width={64}
              height={64}
              className="object-contain w-full h-full drop-shadow-[0_2px_6px_rgba(220,38,38,0.35)]"
            />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {isLoginMode ? 'ยินดีต้อนรับกลับมา' : 'สร้างบัญชีใหม่'}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {isLoginMode
              ? 'กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบบัญชีของคุณ'
              : 'เข้าร่วมเป็นส่วนหนึ่งกับเรา เพื่อรับสิทธิพิเศษมากมาย'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
         
          {!isLoginMode && (
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อ
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                  placeholder="ชื่อจริง"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  นามสกุล
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
                  placeholder="นามสกุล"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              อีเมล
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                รหัสผ่าน
              </label>
              {isLoginMode && (
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-red-600 hover:text-red-500 transition-colors"
                  onClick={onClose}
                >
                  ลืมรหัสผ่าน?
                </Link>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3.5 px-4 mt-2 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-black hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            {isLoginMode ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
          </button>
        </form>

        <div className="mt-6 mb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">หรือ</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLoginMode ? 'ยังไม่มีบัญชีใช่ไหม? ' : 'มีบัญชีอยู่แล้วใช่ไหม? '}
            <button
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="font-medium text-red-600 hover:text-red-500 transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-red-600 after:transition-all hover:after:w-full"
            >
              {isLoginMode ? 'สมัครสมาชิกเลย' : 'เข้าสู่ระบบ'}
            </button>
          </p>
        </div>
       
      </div>
    </div>
  )
}