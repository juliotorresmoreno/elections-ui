"use client";

import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Features from "@/components/Features";
import PricingPlans from "@/components/PricingPlans";
import Services from "@/components/Services";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const session = useAppSelector((state) => state.auth.session);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  });

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  if (isLoading || session) {
    return null;
  }

  return (
    <>
      <main className="flex min-h-screen flex-col p-4">
        <NavBar />
        <Hero />

        <Services />

        <Features />

        <PricingPlans />

        <About />
      </main>
      <Footer />
    </>
  );
}
