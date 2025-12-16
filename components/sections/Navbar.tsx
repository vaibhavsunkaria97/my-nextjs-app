"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cpu, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'The Problem', href: '#problem' },
  { name: 'Technology', href: '#technology' },
  { name: 'Simulation', href: '#simulation' },
  { name: 'Defensibility', href: '#moat' }, // Points to the new "Moat" section
  { name: 'Roadmap', href: '#roadmap' },    // Points to the new "Roadmap" section
            // Points to the new "Team" section
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Handle Scroll Effect (Glassmorphism triggers only after scrolling)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Smooth Scroll Handler
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-slate-950/80 backdrop-blur-md border-white/10 py-2' 
            : 'bg-transparent border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-white text-xl hover:opacity-80 transition-opacity">
            <Cpu className="text-emerald-500" /> 
            <span>IFT</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="hover:text-emerald-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-white text-slate-950 px-5 py-2 rounded-full font-bold text-sm hover:bg-emerald-400 hover:text-white transition-all transform hover:scale-105 active:scale-95">
              Invest Now
            </button>
          </div>

          {/* Mobile Menu Toggle (Hamburger) */}
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-2xl font-bold text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-800" />
              <button className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold text-xl">
                Invest Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};