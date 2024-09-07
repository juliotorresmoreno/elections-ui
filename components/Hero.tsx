import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-background text-foreground">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
          Haz que tu Voz sea Escuchada
        </h1>
        <p className="mb-8 text-lg text-justify font-normal text-muted-foreground lg:text-xl sm:px-16 lg:px-48">
          Únete a nuestra plataforma de votación fácil y segura donde tu opinión
          realmente importa. Con solo unos clics, puedes apoyar tus causas
          favoritas, compartir tus puntos de vista y ser parte de las decisiones
          que cuentan. ¡Involúcrate ahora y marca la diferencia!
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link href="/auth/sign-up">
            <Button size="lg" className="w-full sm:w-auto">
              Comenzar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="#about">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Saber más
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
