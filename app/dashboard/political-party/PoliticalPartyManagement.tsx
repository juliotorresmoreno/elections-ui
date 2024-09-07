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

type PoliticalParty = {
  id: number;
  name: string;
  abbreviation: string;
  founded: string;
  ideology: string;
  description: string;
};

export default function PoliticalPartyManagement() {
  const [parties, setParties] = useState<PoliticalParty[]>([]);
  const [currentParty, setCurrentParty] = useState<PoliticalParty>({
    id: 0,
    name: "",
    abbreviation: "",
    founded: "",
    ideology: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
  const [deletingPartyId, setDeletingPartyId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // In a real application, you would fetch parties from an API here
    setParties([
      {
        id: 1,
        name: "Democratic Party",
        abbreviation: "DEM",
        founded: "1828",
        ideology: "Center-left",
        description:
          "One of the two major contemporary political parties in the United States.",
      },
      {
        id: 2,
        name: "Republican Party",
        abbreviation: "GOP",
        founded: "1854",
        ideology: "Center-right",
        description:
          "One of the two major contemporary political parties in the United States.",
      },
    ]);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentParty((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !currentParty.name ||
      !currentParty.abbreviation ||
      !currentParty.founded ||
      !currentParty.ideology
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (dialogMode === "create") {
      setParties((prev) => [...prev, { ...currentParty, id: Date.now() }]);
    } else {
      setParties((prev) =>
        prev.map((p) => (p.id === currentParty.id ? currentParty : p))
      );
    }

    setCurrentParty({
      id: 0,
      name: "",
      abbreviation: "",
      founded: "",
      ideology: "",
      description: "",
    });
    setIsDialogOpen(false);
    setError(null);
  };

  const deleteParty = (id: number) => {
    setParties((prev) => prev.filter((party) => party.id !== id));
    setDeletingPartyId(null);
  };

  const openDialog = (mode: "create" | "update", party?: PoliticalParty) => {
    setDialogMode(mode);
    setCurrentParty(
      party || {
        id: 0,
        name: "",
        abbreviation: "",
        founded: "",
        ideology: "",
        description: "",
      }
    );
    setIsDialogOpen(true);
  };

  const filteredParties = parties.filter(
    (party) =>
      party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.ideology.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                className="w-full"
                placeholder="Enter party name"
                required
              />
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
                className="w-full"
                placeholder="Enter party abbreviation"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founded" className="text-sm font-medium">
                Founded Year
              </Label>
              <Input
                id="founded"
                name="founded"
                type="number"
                value={currentParty.founded}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Enter founding year"
                required
              />
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
                className="w-full"
                placeholder="Enter party ideology"
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
                value={currentParty.description}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Enter party description"
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
                  <TableCell className="h-12 px-4">{party.founded}</TableCell>
                  <TableCell className="h-12 px-4">{party.ideology}</TableCell>
                  <TableCell className="h-12 px-4">
                    {party.description.length > 50
                      ? `${party.description.substring(0, 50)}...`
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
                            onClick={() => setDeletingPartyId(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
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
