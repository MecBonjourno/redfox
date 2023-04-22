import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import 'tailwindcss/tailwind.css'

const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState({
    products: false,
    solutions: false,
  })

  const handleMouseEnter = (dropdown: string) => {
    setShowDropdown({ ...showDropdown, [dropdown]: true })
  }

  const handleMouseLeave = (dropdown: string) => {
    setShowDropdown({ ...showDropdown, [dropdown]: false })
  }

  const slideIn = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-[#7c0e0e] text-white z-10">
      <div className="container mx-2 px-4 py-3">
        <nav className="flex items-center">
          <h1 className="mx-4 text-lg font-bold">Red Fox</h1>
          <div
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={() => handleMouseLeave('products')}
            className="relative"
          >
            <Link href="/products">
              <p>Products</p>
            </Link>
            {showDropdown.products && (
              <motion.div
                className="absolute left-0 mt-2 w-48 p-4 bg-black text-white"
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <h3 className="text-lg font-semibold mb-2">Red Fox Products</h3>
                <ul>
                  <li>AI Platform</li>
                  <li>GPT Framework</li>
                  <li>LLM Solutions</li>
                </ul>
              </motion.div>
            )}
          </div>
          <div
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={() => handleMouseLeave('solutions')}
            className="relative ml-4"
          >
            <Link href="/solutions">
              <p>Solutions</p>
            </Link>
            {showDropdown.solutions && (
              <motion.div
                className="absolute left-0 mt-2 w-48 p-4 bg-black text-white"
                variants={slideIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Red Fox Solutions
                </h3>
                <ul>
                  <li>Automated Content Generation</li>
                  <li>Virtual Assistants</li>
                  <li>Data Analysis</li>
                </ul>
              </motion.div>
            )}
          </div>
          {/* Add more buttons here */}
        </nav>
      </div>
    </header>
  )
}

export default Header
