"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertCircle,
  Pencil,
  Trash2,
  PlusCircle,
  Calendar,
  FileText,
  User,
  Search,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

type Campaign = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  candidates: Candidate[];
};

type Candidate = {
  id: number;
  name: string;
  position: string;
};

const availableCandidates: Candidate[] = [
  { id: 1, name: "John Doe", position: "Mayor" },
  { id: 2, name: "Jane Smith", position: "City Council" },
  { id: 3, name: "Mike Johnson", position: "Treasurer" },
  { id: 4, name: "Emily Brown", position: "School Board" },
  { id: 5, name: "David Lee", position: "County Commissioner" },
  { id: 6, name: "Sarah Wilson", position: "City Planner" },
  { id: 7, name: "Robert Taylor", position: "Parks Director" },
  { id: 8, name: "Lisa Chen", position: "Public Works Manager" },
  { id: 9, name: "James Rodriguez", position: "Police Chief" },
  { id: 10, name: "Amanda White", position: "Fire Chief" },
];

export default function CampaignManagement() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentCampaign, setCurrentCampaign] =
    useState<Partial<Campaign> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
  const [deletingCampaignId, setDeletingCampaignId] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCampaigns([
      {
        id: 1,
        name: "Local Election 2023",
        description: "Campaign for local city council",
        startDate: "2023-08-01",
        endDate: "2023-11-15",
        candidates: [],
      },
      {
        id: 2,
        name: "State Senate Race",
        description: "Campaign for state senate seat",
        startDate: "2023-09-01",
        endDate: "2024-03-30",
        candidates: [],
      },
    ]);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentCampaign((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !currentCampaign?.name ||
      !currentCampaign.startDate ||
      !currentCampaign.endDate
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const updatedCampaign = {
      ...(currentCampaign as Campaign),
      candidates: currentCampaign.candidates || [],
    };

    if (dialogMode === "create") {
      setCampaigns([...campaigns, { ...updatedCampaign, id: Date.now() }]);
    } else {
      setCampaigns(
        campaigns.map((c) =>
          c.id === currentCampaign.id ? updatedCampaign : c
        )
      );
    }

    setCurrentCampaign(null);
    setIsDialogOpen(false);
    setError(null);
  };

  const toggleCandidate = (candidate: Candidate) => {
    setCurrentCampaign((prev) => {
      const currentCandidates = prev?.candidates || [];
      const candidateIndex = currentCandidates.findIndex(
        (c) => c.id === candidate.id
      );

      if (candidateIndex > -1) {
        // Remove candidate if already selected
        return {
          ...prev,
          candidates: currentCandidates.filter((c) => c.id !== candidate.id),
        };
      } else {
        // Add candidate if not selected
        return {
          ...prev,
          candidates: [...currentCandidates, candidate],
        };
      }
    });
  };

  const deleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    setDeletingCampaignId(null);
  };

  const openDialog = (mode: "create" | "update", campaign?: Campaign) => {
    setDialogMode(mode);
    setCurrentCampaign(
      campaign || {
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        candidates: [],
      }
    );
    setIsDialogOpen(true);
    setSearchTerm("");
  };

  const filteredCandidates = availableCandidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Campaign Management</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end mb-4">
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-[200px]"
          onClick={() => openDialog("create")}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {dialogMode === "create"
                ? "Create New Campaign"
                : "Edit Campaign"}
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Campaign Details</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Campaign Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={currentCampaign?.name || ""}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter campaign name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={currentCampaign?.description || ""}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter campaign description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm font-medium">
                    Start Date
                  </Label>
                  <div className="relative">
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={currentCampaign?.startDate || ""}
                      onChange={handleInputChange}
                      className="w-full pl-10"
                      required
                    />
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm font-medium">
                    End Date
                  </Label>
                  <div className="relative">
                    <Input
                      id="endDate"
                      name="endDate"
                      type="date"
                      value={currentCampaign?.endDate || ""}
                      onChange={handleInputChange}
                      className="w-full pl-10"
                      required
                    />
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  </div>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="candidates">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Candidates</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-center space-x-2 py-2"
                    >
                      <Checkbox
                        id={`candidate-${candidate.id}`}
                        checked={
                          currentCampaign?.candidates?.some(
                            (c) => c.id === candidate.id
                          ) || false
                        }
                        onCheckedChange={() => toggleCandidate(candidate)}
                      />
                      <Label
                        htmlFor={`candidate-${candidate.id}`}
                        className="flex-grow"
                      >
                        {candidate.name} - {candidate.position}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSubmit}
            >
              {dialogMode === "create" ? (
                <PlusCircle className="mr-2 h-4 w-4" />
              ) : (
                <FileText className="mr-2 h-4 w-4" />
              )}
              {dialogMode === "create" ? "Create Campaign" : "Update Campaign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold h-12 px-4">Name</TableHead>
                <TableHead className="font-bold h-12 px-4">
                  Description
                </TableHead>
                <TableHead className="font-bold h-12 px-4">
                  Start Date
                </TableHead>
                <TableHead className="font-bold h-12 px-4">End Date</TableHead>
                <TableHead className="font-bold h-12 px-4">
                  Candidates
                </TableHead>
                <TableHead className="font-bold h-12 px-4 w-[150px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id} className="cursor-pointer">
                  <TableCell className="h-12 px-4">{campaign.name}</TableCell>
                  <TableCell className="h-12 px-4">
                    {campaign.description}
                  </TableCell>
                  <TableCell className="h-12 px-4">
                    {campaign.startDate}
                  </TableCell>
                  <TableCell className="h-12 px-4">
                    {campaign.endDate}
                  </TableCell>
                  <TableCell className="h-12 px-4">
                    {campaign.candidates.length}
                  </TableCell>
                  <TableCell className="h-12 px-4 w-[150px]">
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2 bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                      onClick={() => openDialog("update", campaign)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Dialog
                      open={deletingCampaignId === campaign.id}
                      onOpenChange={(isOpen) =>
                        !isOpen && setDeletingCampaignId(null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                          onClick={() => setDeletingCampaignId(campaign.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                        </DialogHeader>
                        <p>
                          Are you sure you want to delete the campaign "
                          {campaign.name}"? This action cannot be undone.
                        </p>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setDeletingCampaignId(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => deleteCampaign(campaign.id)}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
