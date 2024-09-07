import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Github, label: "GitHub", href: "https://github.com" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Acerca de Nosotros</h2>
            <p className="text-sm">
              Somos una empresa comprometida con la innovación y la excelencia.
              Nuestro objetivo es proporcionar soluciones de alta calidad que
              superen las expectativas de nuestros clientes.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Contáctanos</h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  Calle Principal 123, Ciudad, País
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@ejemplo.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Lun - Vie: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Boletín Informativo</h2>
            <p className="text-sm">
              Suscríbete para recibir las últimas noticias y ofertas.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-primary-foreground text-primary"
              />
              <Button type="submit" variant="secondary" className="w-full">
                Suscribirse
              </Button>
            </form>
          </div>
        </div>
        <Separator className="my-8 bg-primary-foreground/20" />
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm">
            © {currentYear} Tu Empresa. Todos los derechos reservados.
          </div>
          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="hover:text-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
