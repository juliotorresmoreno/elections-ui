"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn } from "lucide-react";

const ScrollToSection = (hash: string) => {
  const id = hash.replace(/.*#/, "");
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/");
      // We need to wait for the navigation to complete before scrolling
      setTimeout(() => ScrollToSection(href), 100);
    } else {
      ScrollToSection(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
    >
      {children}
    </a>
  );
};

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: "/#services", label: "Services" },
    { href: "/#features", label: "Features" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#about", label: "About" },
  ];

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-gray-900/10 dark:border-gray-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-gray-900/75">
      <div className="max-w-8xl mx-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8 mx-4 lg:mx-0">
          <div className="relative flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Image
                src={logo}
                className="h-10 w-auto"
                width={40}
                height={40}
                alt="Elections Logo"
              />
              <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                Elections
              </span>
            </Link>
            <div className="relative hidden lg:flex items-center ml-auto">
              <nav className="text-base leading-6 font-semibold text-gray-700 dark:text-gray-200">
                <ul className="flex space-x-10">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <NavLink href={item.href}>{item.label}</NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex items-center border-l border-gray-200 ml-8 pl-8 dark:border-gray-800">
                <Link
                  href="/auth/sign-in"
                  className="mr-4 px-6 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="px-6 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Registrarse
                </Link>
              </div>
            </div>
            <div className="ml-auto flex items-center lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-8 w-8" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-6 mt-6">
                    {navItems.map((item) => (
                      <NavLink key={item.href} href={item.href}>
                        {item.label}
                      </NavLink>
                    ))}
                    <Link
                      href="/auth/sign-in"
                      className="mt-6 px-6 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                      <LogIn className="mr-2 h-5 w-5" />
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/auth/sign-up"
                      className="mt-2 px-6 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Registrarse
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
