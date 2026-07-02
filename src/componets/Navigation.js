'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LoginModal from '@/componets/LoginModal'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
 
  const menuItems = [
    { name: 'หน้าแรก', href: '/' },
    { name: 'เกี่ยวกับเรา', href: '/About' },
    { name: 'บริการของเรา', href: '/Service' },
    { name: 'ติดต่อเรา', href: '/Contact' },
  ]

  const textColor = isScrolled ? 'text-gray-900' : 'text-white'
  const hoverBgColor = isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/20'

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg border-gray-100 shadow-md py-0'
            : 'bg-transparent py-2'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
           
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              {/* 🛠️ โลโก้ S²P ทรงปีก ไม่ครอบกรอบ/พื้นหลัง เพื่อไม่ให้ปีกถูกตัด */}
              <div className="flex h-14 w-14 items-center justify-center transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Sudtupung Logo"
                  width={56}
                  height={56}
                  className="object-contain w-full h-full drop-shadow-[0_2px_6px_rgba(220,38,38,0.35)]"
                />
              </div>

              <div className="flex flex-col">
                <h1 className={`text-xl font-extrabold tracking-tight transition-colors duration-300 ${textColor}`}>
                  Sudtupung
                </h1>
                <p className={`text-[11px] font-medium uppercase tracking-wider transition-colors duration-300 ${isScrolled ? 'text-gray-500' : 'text-gray-200'}`}>
                  Throne of Iron
                </p>
              </div>
            </Link>

            {/* Right Section: Menu, Cart, Login, Mobile Toggle */}
            <div className="flex items-center gap-2 md:gap-4">
             
              {/* Desktop Menu Items */}
              <div className="hidden md:flex items-center gap-1 mr-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${textColor} ${hoverBgColor}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Cart Button */}
              <Link
                href="/cart"
                className={`relative p-2.5 rounded-full transition-all duration-300 ${textColor} ${hoverBgColor}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white shadow-sm">
                  3
                </span>
              </Link>

              {/* Login Button (Desktop) */}
              <div className="hidden md:block">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isScrolled
                      ? 'bg-black text-white hover:bg-red-700 shadow-md'
                      : 'bg-red-700 text-white hover:bg-red-600 shadow-sm'
                  }`}
                >
                  เข้าสู่ระบบ
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden rounded-full p-2.5 transition-all duration-300 ${textColor} ${hoverBgColor}`}
              >
                <div className="space-y-1.5">
                  <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
                  <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out origin-top ${
              isOpen ? 'opacity-100 scale-y-100 mb-4' : 'opacity-0 scale-y-0 h-0'
            }`}
          >
            <div className="flex flex-col gap-1 p-4 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-600 rounded-xl transition-all duration-200 hover:bg-gray-50 hover:text-red-600"
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="h-px bg-gray-100 my-2 w-full"></div>
             
              <button
                onClick={() => {
                  setIsOpen(false)
                  setIsLoginModalOpen(true)
                }}
                className="mt-1 w-full rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white shadow-md transition-all hover:bg-red-700"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}