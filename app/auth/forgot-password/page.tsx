import Footer from "@/components/Footer";
import ForgotPassword from "@/components/ForgotPassword";
import NavBar from "@/components/NavBar";
import React from "react";

export default function SignInPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col p-4">
        <NavBar />

        <ForgotPassword />
      </main>
      <Footer />
    </>
  );
}
