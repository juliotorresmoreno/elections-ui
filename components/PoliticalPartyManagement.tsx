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
  FileText,
  Search,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PoliticalParty } from "@/types/models";
import {
  useCreatePoliticalParty,
  useFindPoliticalParties,
  useUpdatePoliticalParty,
  useRemovePoliticalParty,
} from "@/actions/political-party";

export default function PoliticalPartyManagement() {
  const [currentParty, setCurrentParty] = useState<PoliticalParty>({
    id: 0,
    name: "",
    abbreviation: "",
    foundation_date: "",
    ideology: "",
    description: "",
    logo: "",
  });

  // State variables for error handling
  const [nameError, setNameError] = useState<string | null>(null);
  const [abbreviationError, setAbbreviationError] = useState<string | null>(
    null
  );
  const [foundationDateError, setFoundationDateError] = useState<string | null>(
    null
  );
  const [ideologyError, setIdeologyError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
  const [deletingPartyId, setDeletingPartyId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { find: findPoliticalParties, data: politicalPartiesData } =
    useFindPoliticalParties();
  const {
    create: createPoliticalParty,
    isLoading: createPoliticalPartyIsLoading,
  } = useCreatePoliticalParty();
  const {
    update: updatePoliticalParty,
    isLoading: updatePoliticalPartyIsLoading,
  } = useUpdatePoliticalParty();
  const {
    remove: removePoliticalParty,
    isLoading: removePoliticalPartyIsLoading,
  } = useRemovePoliticalParty();

  useEffect(() => {
    findPoliticalParties();
  }, [findPoliticalParties]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentParty((prev) => ({ ...prev, [name]: value }));
    switch (name) {
      case "name":
        setNameError(null);
        break;
      case "abbreviation":
        setAbbreviationError(null);
        break;
      case "foundation_date":
        setFoundationDateError(null);
        break;
      case "ideology":
        setIdeologyError(null);
        break;
      case "description":
        setDescriptionError(null);
        break;
      case "logo":
        setLogoError(null);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    // Validate required fields
    if (!currentParty.name) {
      setNameError("Party name is required");
      hasError = true;
    } else if (currentParty.name.length < 2 || currentParty.name.length > 100) {
      setNameError("Party name must be between 2 and 100 characters");
      hasError = true;
    }

    if (!currentParty.abbreviation) {
      setAbbreviationError("Abbreviation is required");
      hasError = true;
    } else if (
      currentParty.abbreviation.length < 1 ||
      currentParty.abbreviation.length > 10
    ) {
      setAbbreviationError("Abbreviation must be between 1 and 10 characters");
      hasError = true;
    }

    if (!currentParty.foundation_date) {
      setFoundationDateError("Foundation date is required");
      hasError = true;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(currentParty.foundation_date)) {
      setFoundationDateError(
        "Foundation date must be in the format YYYY-MM-DD"
      );
      hasError = true;
    }

    if (!currentParty.ideology) {
      setIdeologyError("Ideology is required");
      hasError = true;
    } else if (
      currentParty.ideology.length < 3 ||
      currentParty.ideology.length > 50
    ) {
      setIdeologyError("Ideology must be between 3 and 50 characters");
      hasError = true;
    }

    if (!currentParty.description) {
      setDescriptionError("Description is required");
      hasError = true;
    } else if (
      currentParty.description.length < 10 ||
      currentParty.description.length > 500
    ) {
      setDescriptionError("Description must be between 10 and 500 characters");
      hasError = true;
    }

    if (currentParty.logo && !/^https?:\/\/.+\..+/i.test(currentParty.logo)) {
      setLogoError("Logo must be a valid URL");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      if (dialogMode === "create") {
        await createPoliticalParty(currentParty);
      } else {
        await updatePoliticalParty(currentParty.id, currentParty);
      }
      await findPoliticalParties();
      setIsDialogOpen(false);
      setError(null);
      setCurrentParty({
        id: 0,
        name: "",
        abbreviation: "",
        foundation_date: "",
        ideology: "",
        description: "",
        logo: "",
      });
    } catch (apiError: any) {
      setError(
        apiError.message ||
          "An error occurred while saving the political party."
      );
    }
  };

  const deleteParty = async (id: number) => {
    try {
      await removePoliticalParty(id);
      await findPoliticalParties();
      setDeletingPartyId(null);
    } catch (apiError: any) {
      setError(
        apiError.message ||
          "An error occurred while deleting the political party."
      );
    }
  };

  const openDialog = (mode: "create" | "update", party?: PoliticalParty) => {
    setDialogMode(mode);
    setCurrentParty(
      party || {
        id: 0,
        name: "",
        abbreviation: "",
        foundation_date: "",
        ideology: "",
        description: "",
        logo: "",
      }
    );
    setIsDialogOpen(true);
    setNameError(null);
    setAbbreviationError(null);
    setFoundationDateError(null);
    setIdeologyError(null);
    setDescriptionError(null);
    setLogoError(null);
  };

  const filteredParties =
    politicalPartiesData?.filter(
      (party) =>
        party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        party.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        party.ideology.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Political Party Management</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Search parties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-[200px]"
          onClick={() => openDialog("create")}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Political Party
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {dialogMode === "create"
                ? "Add New Political Party"
                : "Edit Political Party"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Party Name
              </Label>
              <Input
                id="name"
                name="name"
                value={currentParty.name}
                onChange={handleInputChange}
                className={`w-full ${nameError ? "border-red-500" : ""}`}
                placeholder="Enter party name"
              />
              {nameError && <p className="text-sm text-red-500">{nameError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="abbreviation" className="text-sm font-medium">
                Abbreviation
              </Label>
              <Input
                id="abbreviation"
                name="abbreviation"
                value={currentParty.abbreviation}
                onChange={handleInputChange}
                className={`w-full ${
                  abbreviationError ? "border-red-500" : ""
                }`}
                placeholder="Enter party abbreviation"
              />
              {abbreviationError && (
                <p className="text-sm text-red-500">{abbreviationError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="foundation_date" className="text-sm font-medium">
                Foundation Date
              </Label>
              <Input
                id="foundation_date"
                name="foundation_date"
                type="date"
                value={currentParty.foundation_date}
                onChange={handleInputChange}
                className={`w-full ${
                  foundationDateError ? "border-red-500" : ""
                }`}
              />
              {foundationDateError && (
                <p className="text-sm text-red-500">{foundationDateError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ideology" className="text-sm font-medium">
                Ideology
              </Label>
              <Input
                id="ideology"
                name="ideology"
                value={currentParty.ideology}
                onChange={handleInputChange}
                className={`w-full ${ideologyError ? "border-red-500" : ""}`}
                placeholder="Enter party ideology"
              />
              {ideologyError && (
                <p className="text-sm text-red-500">{ideologyError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={currentParty.description}
                onChange={handleInputChange}
                className={`w-full ${descriptionError ? "border-red-500" : ""}`}
                placeholder="Enter party description"
                rows={3}
              />
              {descriptionError && (
                <p className="text-sm text-red-500">{descriptionError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo" className="text-sm font-medium">
                Logo URL
              </Label>
              <Input
                id="logo"
                name="logo"
                value={currentParty.logo}
                onChange={handleInputChange}
                className={`w-full ${logoError ? "border-red-500" : ""}`}
                placeholder="Enter logo URL"
              />
              {logoError && <p className="text-sm text-red-500">{logoError}</p>}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={
                  createPoliticalPartyIsLoading || updatePoliticalPartyIsLoading
                }
              >
                {dialogMode === "create" ? (
                  <PlusCircle className="mr-2 h-4 w-4" />
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                {dialogMode === "create"
                  ? "Add Political Party"
                  : "Update Political Party"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-bold h-12 px-4">Name</TableHead>
                <TableHead className="font-bold h-12 px-4">
                  Abbreviation
                </TableHead>
                <TableHead className="font-bold h-12 px-4">Founded</TableHead>
                <TableHead className="font-bold h-12 px-4">Ideology</TableHead>
                <TableHead className="font-bold h-12 px-4">
                  Description
                </TableHead>
                <TableHead className="font-bold h-12 px-4 w-[150px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParties.map((party) => (
                <TableRow key={party.id} className="cursor-pointer">
                  <TableCell className="h-12 px-4">{party.name}</TableCell>
                  <TableCell className="h-12 px-4">
                    {party.abbreviation}
                  </TableCell>
                  <TableCell className="h-12 px-4">
                    {new Date(party.foundation_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="h-12 px-4">{party.ideology}</TableCell>
                  <TableCell className="h-12 px-4">
                    {party.description?.length > 50
                      ? `${party.description?.substring(0, 50)}...`
                      : party.description}
                  </TableCell>
                  <TableCell className="h-12 px-4 w-[150px]">
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2 bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                      onClick={() => openDialog("update", party)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Dialog
                      open={deletingPartyId === party.id}
                      onOpenChange={(isOpen) =>
                        !isOpen && setDeletingPartyId(null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                          onClick={() => setDeletingPartyId(party.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                        </DialogHeader>
                        <p>
                          Are you sure you want to delete the political party "
                          {party.name}"? This action cannot be undone.
                        </p>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            disabled={removePoliticalPartyIsLoading}
                            onClick={() => setDeletingPartyId(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            disabled={removePoliticalPartyIsLoading}
                            onClick={() => deleteParty(party.id)}
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
