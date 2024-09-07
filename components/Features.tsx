import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Shield, Zap } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Rocket className="h-8 w-8 mb-2" />,
      title: "Rápido y Eficiente",
      description: "Optimiza tus procesos y ahorra tiempo valioso.",
    },
    {
      icon: <Shield className="h-8 w-8 mb-2" />,
      title: "Seguro y Confiable",
      description:
        "Protección de datos de última generación para tu tranquilidad.",
    },
    {
      icon: <Zap className="h-8 w-8 mb-2" />,
      title: "Fácil de Usar",
      description:
        "Interfaz intuitiva diseñada para todos los niveles de experiencia.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-muted bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Nuestras Características Principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
