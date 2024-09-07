import React from "react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section
      className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-900"
      id="about"
    >
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Empoderando la democracia digital
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 text-justify">
            Imaginamos un mundo donde cada voz cuenta, donde la participación
            democrática no conoce fronteras y donde la confianza en el proceso
            electoral es inquebrantable. Nuestra visión es crear un espacio
            digital donde la expresión de la voluntad ciudadana sea tan segura
            como accesible, tan transparente como eficiente.
          </p>

          <p className="text-xl text-gray-600 dark:text-gray-300 text-justify">
            Nuestra misión es hacer realidad ese mundo. A través de la
            innovación tecnológica y un compromiso inquebrantable con la
            integridad, estamos construyendo el futuro de las elecciones
            digitales. Un futuro donde la seguridad, la accesibilidad y la
            transparencia no son solo promesas, sino garantías. Cada día
            trabajamos incansablemente para desarrollar soluciones que no solo
            cumplan con los estándares más altos de seguridad cibernética, sino
            que también sean intuitivas y accesibles para todos los ciudadanos.
          </p>

          <p className="text-xl text-gray-600 dark:text-gray-300 text-justify">
            Cada línea de código que escribimos, cada sistema que diseñamos,
            está impulsado por una visión: empoderar a cada ciudadano para que
            su voz sea escuchada, su voto sea contado y su participación marque
            la diferencia. Creemos firmemente que la tecnología, cuando se
            utiliza de manera responsable y ética, tiene el poder de fortalecer
            los cimientos de nuestra democracia y amplificar el impacto de la
            participación ciudadana.
          </p>

          <p className="text-xl font-semibold text-primary text-center">
            Juntos, estamos redefiniendo lo que significa participar en la
            democracia en la era digital.
          </p>

          <div className="mt-8">
            <Button size="lg" className="text-lg px-8 invisible">
              Únete a Nuestra Visión
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
