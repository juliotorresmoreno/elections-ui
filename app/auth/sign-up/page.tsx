import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import UserRegistration from "@/components/UserRegistration";
import React from "react";

export default function SignUpPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col p-4">
        <NavBar />

        <UserRegistration />
      </main>
      <Footer />
    </>
  );
}
