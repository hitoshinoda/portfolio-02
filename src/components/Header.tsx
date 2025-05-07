"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import HamburgerButton from "@/components/Button/HamburgerButton";
import LanguageToggle from "@/components/LanguageToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const menuVariants: Variants = {
    hidden: { opacity: 0, transition: { duration: 0.2, ease: "easeOut" } },
    visible: { opacity: 1, transition: { duration: 0.2, ease: "easeIn" } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeOut" } },
  };
  const logoVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeIn", delay: 0.1 },
    },
  };

  return (
    <>
      {/* Header Bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-8"
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Left Side: Logo (conditionally rendered) */}
        <div className="flex-1">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="text-xl font-bold text-black"
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Link href="/">Logo</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <HamburgerButton
          isOpen={isOpen}
          toggle={toggleMenu}
          className="w-12 h-4 relative z-50"
        />
      </motion.header>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col items-center gap-8">
            <LanguageToggle />
              <Link
                href="/"
                className="text-3xl font-medium text-black transition-colors duration-200 hover:text-gray-600"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/"
                className="text-3xl font-medium text-black transition-colors duration-200 hover:text-gray-600"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="/"
                className="text-3xl font-medium text-black transition-colors duration-200 hover:text-gray-600"
                onClick={toggleMenu}
              >
                Portfolio
              </Link>
              <Link
                href="/"
                className="text-3xl font-medium text-black transition-colors duration-200 hover:text-gray-600"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
