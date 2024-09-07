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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Candidate = {
  id: number;
  name: string;
  party: string;
  position: string;
  biography: string;
  education: string;
  experience: string;
  campaignPlatform: string;
  contactInfo: string;
  identityDocument: string;
};

const politicalParties = [
  "Democratic Party",
  "Republican Party",
  "Green Party",
  "Libertarian Party",
  "Independent",
  "Other",
];

export default function CandidateManagement() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    id: 0,
    name: "",
    party: "",
    position: "",
    biography: "",
    education: "",
    experience: "",
    campaignPlatform: "",
    contactInfo: "",
    identityDocument: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
  const [deletingCandidateId, setDeletingCandidateId] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCandidates([
      {
        id: 1,
        name: "John Doe",
        party: "Democratic Party",
        position: "Mayor",
        biography: "John Doe has been serving the community for over 10 years.",
        education: "MBA from Harvard Business School",
        experience: "City Council Member (2015-2023)",
        campaignPlatform:
          "Focus on sustainable urban development and affordable housing",
        contactInfo: "johndoe@email.com | (555) 123-4567",
        identityDocument: "ID123456",
      },
      {
        id: 2,
        name: "Jane Smith",
        party: "Republican Party",
        position: "City Council",
        biography: "Jane Smith is a local business owner and community leader.",
        education: "BS in Public Administration from State University",
        experience: "Small Business Owner (2010-present)",
        campaignPlatform:
          "Promote local businesses and reduce city regulations",
        contactInfo: "janesmith@email.com | (555) 987-6543",
        identityDocument: "ID789012",
      },
    ]);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentCandidate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !currentCandidate.name ||
      !currentCandidate.party ||
      !currentCandidate.position ||
      !currentCandidate.identityDocument
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (dialogMode === "create") {
      setCandidates((prev) => [
        ...prev,
        { ...currentCandidate, id: Date.now() },
      ]);
    } else {
      setCandidates((prev) =>
        prev.map((c) => (c.id === currentCandidate.id ? currentCandidate : c))
      );
    }

    setCurrentCandidate({
      id: 0,
      name: "",
      party: "",
      position: "",
      biography: "",
      education: "",
      experience: "",
      campaignPlatform: "",
      contactInfo: "",
      identityDocument: "",
    });
    setIsDialogOpen(false);
    setError(null);
  };

  const deleteCandidate = (id: number) => {
    setCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
    setDeletingCandidateId(null);
  };

  const openDialog = (mode: "create" | "update", candidate?: Candidate) => {
    setDialogMode(mode);
    setCurrentCandidate(
      candidate || {
        id: 0,
        name: "",
        party: "",
        position: "",
        biography: "",
        education: "",
        experience: "",
        campaignPlatform: "",
        contactInfo: "",
        identityDocument: "",
      }
    );
    setIsDialogOpen(true);
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Candidate Management</h1>

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
            placeholder="Search candidates..."
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
          Add Candidate
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {dialogMode === "create" ? "Add New Candidate" : "Edit Candidate"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="campaign">Campaign Info</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Candidate Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={currentCandidate.name}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter candidate name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="identityDocument"
                    className="text-sm font-medium"
                  >
                    Identity Document
                  </Label>
                  <Input
                    id="identityDocument"
                    name="identityDocument"
                    value={currentCandidate.identityDocument}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter identity document number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="party" className="text-sm font-medium">
                    Political Party
                  </Label>
                  <Select
                    name="party"
                    value={currentCandidate.party}
                    onValueChange={(value) =>
                      setCurrentCandidate((prev) => ({ ...prev, party: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a party" />
                    </SelectTrigger>
                    <SelectContent>
                      {politicalParties.map((party) => (
                        <SelectItem key={party} value={party}>
                          {party}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-sm font-medium">
                    Position
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    value={currentCandidate.position}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter position"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biography" className="text-sm font-medium">
                    Biography
                  </Label>
                  <Textarea
                    id="biography"
                    name="biography"
                    value={currentCandidate.biography}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter candidate biography"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactInfo" className="text-sm font-medium">
                    Contact Information
                  </Label>
                  <Input
                    id="contactInfo"
                    name="contactInfo"
                    value={currentCandidate.contactInfo}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter contact information"
                  />
                </div>
              </TabsContent>
              <TabsContent value="campaign" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="education" className="text-sm font-medium">
                    Education
                  </Label>
                  <Input
                    id="education"
                    name="education"
                    value={currentCandidate.education}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter education background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium">
                    Experience
                  </Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={currentCandidate.experience}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter relevant experience"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="campaignPlatform"
                    className="text-sm font-medium"
                  >
                    Campaign Platform
                  </Label>
                  <Textarea
                    id="campaignPlatform"
                    name="campaignPlatform"
                    value={currentCandidate.campaignPlatform}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Enter campaign platform"
                    rows={3}
                  />
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {dialogMode === "create" ? (
                  <PlusCircle className="mr-2 h-4 w-4" />
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                {dialogMode === "create" ? "Add Candidate" : "Update Candidate"}
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
                  ID Document
                </TableHead>
                <TableHead className="font-bold h-12 px-4">Party</TableHead>
                <TableHead className="font-bold h-12 px-4">Position</TableHead>
                <TableHead className="font-bold h-12 px-4">Education</TableHead>
                <TableHead className="font-bold h-12 px-4">
                  Experience
                </TableHead>
                <TableHead className="font-bold h-12 px-4 w-[150px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id} className="cursor-pointer">
                  <TableCell className="h-12 px-4">{candidate.name}</TableCell>
                  <TableCell className="h-12 px-4">
                    {candidate.identityDocument}
                  </TableCell>
                  <TableCell className="h-12 px-4">{candidate.party}</TableCell>
                  <TableCell className="h-12 px-4">
                    {candidate.position}
                  </TableCell>
                  <TableCell className="h-12 px-4">
                    {candidate.education}
                  </TableCell>
                  <TableCell className="h-12 px-4">
                    {candidate.experience.length > 50
                      ? `${candidate.experience.substring(0, 50)}...`
                      : candidate.experience}
                  </TableCell>
                  <TableCell className="h-12 px-4 w-[150px]">
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2 bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                      onClick={() => openDialog("update", candidate)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Dialog
                      open={deletingCandidateId === candidate.id}
                      onOpenChange={(isOpen) =>
                        !isOpen && setDeletingCandidateId(null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-red-500 text-white hover:bg-red-600 hover:text-white"
                          onClick={() => setDeletingCandidateId(candidate.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                        </DialogHeader>
                        <p>
                          Are you sure you want to delete the candidate "
                          {candidate.name}"? This action cannot be undone.
                        </p>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setDeletingCandidateId(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => deleteCandidate(candidate.id)}
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
