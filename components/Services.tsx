import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  UserCheck,
  BarChart2,
  Globe,
  Lock,
  Clock,
} from "lucide-react";

interface ElectionService {
  icon: React.ElementType;
  title: string;
  description: string;
}

const electionServices: ElectionService[] = [
  {
    icon: ShieldCheck,
    title: "Votación Segura",
    description:
      "Sistema de votación encriptado de extremo a extremo para garantizar la integridad de cada voto.",
  },
  {
    icon: UserCheck,
    title: "Verificación de Identidad",
    description:
      "Proceso robusto de autenticación de votantes para prevenir el fraude electoral.",
  },
  {
    icon: BarChart2,
    title: "Resultados en Tiempo Real",
    description:
      "Visualización de resultados actualizados en tiempo real con gráficos interactivos.",
  },
  {
    icon: Globe,
    title: "Accesibilidad Universal",
    description:
      "Plataforma de votación accesible desde cualquier dispositivo, diseñada para todos los usuarios.",
  },
  {
    icon: Lock,
    title: "Auditoría Transparente",
    description:
      "Sistema de auditoría completo para verificar la integridad del proceso electoral.",
  },
  {
    icon: Clock,
    title: "Votación Remota",
    description:
      "Permite a los votantes emitir su voto de forma segura desde cualquier ubicación.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Nuestros Servicios de Elecciones Digitales
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Ofrecemos una plataforma de votación electrónica segura,
            transparente y accesible para modernizar el proceso democrático.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {electionServices.map((service, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button size="lg">
            Explorar todas las características
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
