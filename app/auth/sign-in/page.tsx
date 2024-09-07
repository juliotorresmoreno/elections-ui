import Footer from "@/components/Footer";
import Login from "@/components/Login";
import NavBar from "@/components/NavBar";
import React from "react";

export default function SignInPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col p-4">
        <NavBar />

        <Login />
      </main>
      <Footer />
    </>
  );
}
