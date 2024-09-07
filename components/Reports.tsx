"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  Download,
  BarChart,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";
import { format } from "date-fns";

// Note: These chart components are placeholders. In a real application, you'd use a charting library like recharts or Chart.js
const BarChartComponent = () => (
  <div className="h-[350px] w-full bg-muted flex items-center justify-center">
    <BarChart className="h-16 w-16 text-muted-foreground" />
  </div>
);

const PieChartComponent = () => (
  <div className="h-[350px] w-full bg-muted flex items-center justify-center">
    <PieChart className="h-16 w-16 text-muted-foreground" />
  </div>
);

const LineChartComponent = () => (
  <div className="h-[350px] w-full bg-muted flex items-center justify-center">
    <TrendingUp className="h-16 w-16 text-muted-foreground" />
  </div>
);

export default function Reports() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Election Reports</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select election" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-local">2023 Local Election</SelectItem>
              <SelectItem value="2022-midterm">
                2022 Midterm Election
              </SelectItem>
              <SelectItem value="2020-presidential">
                2020 Presidential Election
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="relative">
            <Button
              variant="outline"
              className="w-[200px] justify-start text-left font-normal"
              onClick={() => setDate(new Date())}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </div>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="turnout">Voter Turnout</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Votes Cast
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,465</div>
                <p className="text-xs text-muted-foreground">
                  +15.6% from last election
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Voter Turnout
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72.8%</div>
                <p className="text-xs text-muted-foreground">
                  +3.2% from last election
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Leading Candidate
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Jane Smith</div>
                <p className="text-xs text-muted-foreground">
                  38.2% of total votes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Most Active Precinct
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Precinct 5</div>
                <p className="text-xs text-muted-foreground">89.7% turnout</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Hourly Voting Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChartComponent />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Voting Method Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChartComponent />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="turnout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voter Turnout by Age Group</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChartComponent />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Turnout by Precinct</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChartComponent />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChartComponent />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Results by Precinct</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChartComponent />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voter Age Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChartComponent />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Voter Education Level</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChartComponent />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
