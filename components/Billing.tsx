"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Users, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Billing() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Facturación</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Plan Actual</CardTitle>
          <CardDescription>
            Actualmente estás en el plan Estándar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">$99.99/mes</p>
              <p className="text-muted-foreground">
                Próxima fecha de facturación: 1 de julio, 2023
              </p>
            </div>
            <Button variant="outline">Cambiar Plan</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Votantes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">750/1000</div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              75% del límite de tu plan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Elecciones Activas
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/5</div>
            <Progress value={60} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              60% del límite de tu plan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Próxima Elección
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 de julio</div>
            <p className="text-xs text-muted-foreground mt-2">Faltan 14 días</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Método de Pago</CardTitle>
          <CardDescription>Gestiona tu método de pago</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <CreditCard className="h-6 w-6 text-primary" />
            <div>
              <p className="font-medium">Visa terminada en 1234</p>
              <p className="text-sm text-muted-foreground">Expira 12/2024</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Actualizar Método de Pago</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
