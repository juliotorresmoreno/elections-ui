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
  Search,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useFindCampaigns,
  useCreateCampaign,
  useUpdateCampaign,
  useRemoveCampaign,
} from "@/actions/campaign";
import { useFindCandidates } from "@/actions/candidate";

type Campaign = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
};

type Candidate = {
  id: number;
  name: string;
  position: string;
};

export default function CampaignManagement() {
  const [currentCampaign, setCurrentCampaign] = useState<
    Partial<Campaign> & { candidates?: Candidate[] }
  >({});
  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [startDateError, setStartDateError] = useState<string | null>(null);
  const [endDateError, setEndDateError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
  const [deletingCampaignId, setDeletingCampaignId] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Hooks for API calls
  const {
    find,
    data: campaigns,
    error: findError,
    isLoading: isLoadingCampaigns,
  } = useFindCampaigns();
  const {
    create,
    error: createError,
    isLoading: createIsLoading,
  } = useCreateCampaign();
  const {
    update,
    error: updateError,
    isLoading: updateIsLoading,
  } = useUpdateCampaign();
  const {
    remove,
    error: removeError,
    isLoading: removeIsLoading,
  } = useRemoveCampaign();
  const { find: findCandidates, data: candidates } = useFindCandidates();

  useEffect(() => {
    find(); // Fetch campaigns on mount
    findCandidates(); // Fetch candidates on mount
  }, [find, findCandidates]);

  useEffect(() => {
    // Handling API errors
    if (findError || createError || updateError || removeError) {
      setError(
        findError?.message ||
          createError?.message ||
          updateError?.message ||
          removeError?.message ||
          "An unexpected error occurred"
      );
    } else {
      setError(null);
    }
  }, [findError, createError, updateError, removeError]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentCampaign((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "name":
        setNameError(null);
        break;
      case "description":
        setDescriptionError(null);
        break;
      case "start_date":
        setStartDateError(null);
        break;
      case "end_date":
        setEndDateError(null);
        break;
    }
  };

  const toggleCandidate = (candidate: Candidate) => {
    setCurrentCampaign((prev) => {
      const currentCandidates = prev?.candidates || [];
      const isSelected = currentCandidates.some((c) => c.id === candidate.id);
      const updatedCandidates = isSelected
        ? currentCandidates.filter((c) => c.id !== candidate.id)
        : [...currentCandidates, candidate];
      return { ...prev, candidates: updatedCandidates };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!currentCampaign?.name) {
      setNameError("Campaign name is required");
      hasError = true;
    }

    if (!currentCampaign?.description) {
      setDescriptionError("Description is required");
      hasError = true;
    }

    if (!currentCampaign?.start_date) {
      setStartDateError("Start date is required");
      hasError = true;
    }

    if (!currentCampaign?.end_date) {
      setEndDateError("End date is required");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      if (dialogMode === "create") {
        await create(currentCampaign as Omit<Campaign, "id">);
      } else {
        await update(currentCampaign!.id!, currentCampaign as Campaign);
      }
      find(); // Refresh campaigns list after create/update
      setIsDialogOpen(false);
      setCurrentCampaign({});
    } catch (apiError: any) {
      setError(
        apiError.message || "An error occurred while saving the campaign."
      );
    }
  };

  const deleteCampaign = async (id: number) => {
    try {
      await remove(id);
      find(); // Refresh campaigns list after deletion
    } catch (apiError: any) {
      setError(
        apiError.message || "An error occurred while deleting the campaign."
      );
    }
  };

  const openDialog = (mode: "create" | "update", campaign?: Campaign) => {
    setDialogMode(mode);
    setCurrentCampaign(
      campaign ? { ...campaign, candidates: [] } : { candidates: [] }
    );
    setIsDialogOpen(true);
    setNameError(null);
    setDescriptionError(null);
    setStartDateError(null);
    setEndDateError(null);
  };

  const filteredCandidates = candidates?.filter(
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
              <TabsTrigger
                value="candidates"
                disabled={dialogMode === "create"}
              >
                Candidates
              </TabsTrigger>
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
                    className={`w-full ${nameError ? "border-red-500" : ""}`}
                    placeholder="Enter campaign name"
                  />
                  {nameError && (
                    <p className="text-sm text-red-500">{nameError}</p>
                  )}
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
                    className={`w-full ${
                      descriptionError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter campaign description"
                    rows={3}
                  />
                  {descriptionError && (
                    <p className="text-sm text-red-500">{descriptionError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start_date" className="text-sm font-medium">
                    Start Date
                  </Label>
                  <div className="relative">
                    <Input
                      id="start_date"
                      name="start_date"
                      type="date"
                      value={currentCampaign?.start_date || ""}
                      onChange={handleInputChange}
                      className={`w-full pl-10 ${
                        startDateError ? "border-red-500" : ""
                      }`}
                    />
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    {startDateError && (
                      <p className="text-sm text-red-500">{startDateError}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date" className="text-sm font-medium">
                    End Date
                  </Label>
                  <div className="relative">
                    <Input
                      id="end_date"
                      name="end_date"
                      type="date"
                      value={currentCampaign?.end_date || ""}
                      onChange={handleInputChange}
                      className={`w-full pl-10 ${
                        endDateError ? "border-red-500" : ""
                      }`}
                    />
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    {endDateError && (
                      <p className="text-sm text-red-500">{endDateError}</p>
                    )}
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
              disabled={createIsLoading || updateIsLoading}
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
                    {campaign.start_date}
                  </TableCell>
                  <TableCell className="h-12 px-4">
                    {campaign.end_date}
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
                            disabled={removeIsLoading}
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
