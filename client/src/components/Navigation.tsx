"use client";
import { Button } from "./ui/button";
import { ArrowRight, Orbit, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="px-4 py-4 md:px-8 lg:px-16 lg:py-4 lg:max-h-[100px]">
      <div className="flex items-center justify-between">
        {/* Logo - Takes equal space on left */}
        <div className="flex-1">
          <Link href="/" className="cursor-pointer">
            <p className="flex items-center gap-2 font-semibold text-xl md:text-2xl">
              ContextAI <Orbit />
            </p>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-1">
            <Button variant="link">Product</Button>
            <Button variant="link">Pricing</Button>
            <Button variant="link">About</Button>
          </div>
        </div>

        {/* Desktop Auth Buttons - Takes equal space on right */}
        <div className="hidden md:flex items-center justify-end flex-1 gap-2">
          <Link href="/sign-in">
            <Button variant="link">Sign in</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="default">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Hamburger Menu Button - Visible only on small screens */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu - Visible only when hamburger is clicked */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
          <div className="flex flex-col space-y-2 pt-4">
            {/* Mobile Navigation Links */}
            <Button
              variant="ghost"
              className="justify-start w-full text-left"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Product
            </Button>
            <Button
              variant="ghost"
              className="justify-start w-full text-left"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Button>
            <Button
              variant="ghost"
              className="justify-start w-full text-left"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Button>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign in
                </Button>
              </Link>
              <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="default" className="w-full">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
