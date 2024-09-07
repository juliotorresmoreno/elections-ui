import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  buttonText: string;
}

const plans: Plan[] = [
  {
    name: "Gratuito",
    price: "$0",
    description: "Para pequeñas elecciones y pruebas",
    features: [
      { name: "Hasta 100 votantes", included: true },
      { name: "1 elección activa", included: true },
      { name: "Resultados básicos", included: true },
      { name: "Soporte por correo electrónico", included: true },
      { name: "Verificación de identidad básica", included: true },
      { name: "Acceso a la API", included: false },
    ],
    buttonText: "Comenzar gratis",
  },
  {
    name: "Estándar",
    price: "$99.99",
    description: "Para organizaciones medianas y elecciones regulares",
    features: [
      { name: "Hasta 1,000 votantes", included: true },
      { name: "5 elecciones activas", included: true },
      { name: "Resultados en tiempo real", included: true },
      { name: "Soporte prioritario", included: true },
      { name: "Verificación de identidad avanzada", included: true },
      { name: "Acceso a la API", included: true },
    ],
    buttonText: "Comenzar prueba gratuita",
  },
  {
    name: "Empresarial",
    price: "Personalizado",
    description: "Para grandes organizaciones y elecciones complejas",
    features: [
      { name: "Votantes ilimitados", included: true },
      { name: "Elecciones ilimitadas", included: true },
      { name: "Análisis avanzado de resultados", included: true },
      { name: "Soporte 24/7", included: true },
      { name: "Verificación de identidad multinivel", included: true },
      { name: "Arbitraje provisto por nuestra empresa", included: true },
    ],
    buttonText: "Contactar ventas",
  },
];

export default function PricingPlans() {
  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Planes de Precios
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Elige el plan perfecto para tus necesidades de elecciones digitales.
            Planes flexibles para todo tipo de organizaciones.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col ${index === 1 ? "border-primary" : ""}`}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-4xl font-bold">
                  {plan.price}
                  {plan.price !== "Personalizado" && (
                    <span className="text-sm font-normal">/mes</span>
                  )}
                </div>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                      ) : (
                        <X className="mr-2 h-4 w-4 text-red-500" />
                      )}
                      {feature.name}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-4">
                <Button
                  className="w-full"
                  variant={index === 1 ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
