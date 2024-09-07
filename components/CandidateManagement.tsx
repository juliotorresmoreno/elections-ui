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
import {
  useFindCandidates,
  useCreateCandidate,
  useUpdateCandidate,
  useRemoveCandidate,
} from "@/actions/candidate";
import { useFindPoliticalParties } from "@/actions/political-party";
import { Candidate } from "@/types/models";

export default function CandidateManagement() {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    id: 0,
    name: "",
    last_name: "",
    identification: "",
    contact_info: "",
    photo: "",
    political_party_id: 0,
    position: "",
    experience: "",
    biography: "",
    education: "",
    campaign_platform: "",
  });

  const [nameError, setNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [identificationError, setIdentificationError] = useState<string | null>(
    null
  );
  const [contactInfoError, setContactInfoError] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [politicalPartyError, setPoliticalPartyError] = useState<string | null>(
    null
  );
  const [positionError, setPositionError] = useState<string | null>(null);
  const [experienceError, setExperienceError] = useState<string | null>(null);
  const [biographyError, setBiographyError] = useState<string | null>(null);
  const [educationError, setEducationError] = useState<string | null>(null);
  const [campaignPlatformError, setCampaignPlatformError] = useState<
    string | null
  >(null);

  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "update">("create");
  const [deletingCandidateId, setDeletingCandidateId] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  // API hooks
  const {
    find: findCandidates,
    data: candidates,
    error: findError,
  } = useFindCandidates();
  const { create: createCandidate, isLoading: createIsLoading } =
    useCreateCandidate();
  const { update: updateCandidate, isLoading: updateIsLoading } =
    useUpdateCandidate();
  const { remove: removeCandidate, isLoading: removeIsLoading } =
    useRemoveCandidate();

  const {
    find: findPoliticalParties,
    data: politicalParties,
    error: politicalPartiesError,
  } = useFindPoliticalParties();

  useEffect(() => {
    findCandidates();
    findPoliticalParties();
  }, [findCandidates, findPoliticalParties]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentCandidate((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "name":
        setNameError(null);
        break;
      case "last_name":
        setLastNameError(null);
        break;
      case "identification":
        setIdentificationError(null);
        break;
      case "contact_info":
        setContactInfoError(null);
        break;
      case "photo":
        setPhotoError(null);
        break;
      case "position":
        setPositionError(null);
        break;
      case "experience":
        setExperienceError(null);
        break;
      case "biography":
        setBiographyError(null);
        break;
      case "education":
        setEducationError(null);
        break;
      case "campaign_platform":
        setCampaignPlatformError(null);
        break;
      case "political_party_id":
        setPoliticalPartyError(null);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!currentCandidate.name) {
      setNameError("First name is required");
      hasError = true;
    } else if (
      currentCandidate.name.length < 2 ||
      currentCandidate.name.length > 100
    ) {
      setNameError("First name must be between 2 and 100 characters");
      hasError = true;
    }

    if (!currentCandidate.last_name) {
      setLastNameError("Last name is required");
      hasError = true;
    } else if (
      currentCandidate.last_name.length < 2 ||
      currentCandidate.last_name.length > 100
    ) {
      setLastNameError("Last name must be between 2 and 100 characters");
      hasError = true;
    }

    if (!currentCandidate.identification) {
      setIdentificationError("Identification is required");
      hasError = true;
    } else if (
      currentCandidate.identification.length < 5 ||
      currentCandidate.identification.length > 20
    ) {
      setIdentificationError(
        "Identification must be between 5 and 20 characters"
      );
      hasError = true;
    }

    if (!currentCandidate.contact_info) {
      setContactInfoError("Contact information is required");
      hasError = true;
    } else if (
      currentCandidate.contact_info.length < 5 ||
      currentCandidate.contact_info.length > 150
    ) {
      setContactInfoError(
        "Contact information must be between 5 and 150 characters"
      );
      hasError = true;
    }

    if (
      currentCandidate.photo &&
      !/^https?:\/\/.+\..+/i.test(currentCandidate.photo)
    ) {
      setPhotoError("Photo must be a valid URL");
      hasError = true;
    }

    if (!currentCandidate.political_party_id) {
      setPoliticalPartyError("Political party is required");
      hasError = true;
    }

    if (!currentCandidate.position) {
      setPositionError("Position is required");
      hasError = true;
    } else if (
      currentCandidate.position.length < 2 ||
      currentCandidate.position.length > 100
    ) {
      setPositionError("Position must be between 2 and 100 characters");
      hasError = true;
    }

    if (!currentCandidate.experience) {
      setExperienceError("Experience is required");
      hasError = true;
    } else if (
      currentCandidate.experience.length < 10 ||
      currentCandidate.experience.length > 500
    ) {
      setExperienceError("Experience must be between 10 and 500 characters");
      hasError = true;
    }

    if (!currentCandidate.biography) {
      setBiographyError("Biography is required");
      hasError = true;
    } else if (
      currentCandidate.biography.length < 10 ||
      currentCandidate.biography.length > 500
    ) {
      setBiographyError("Biography must be between 10 and 500 characters");
      hasError = true;
    }

    if (!currentCandidate.education) {
      setEducationError("Education is required");
      hasError = true;
    } else if (
      currentCandidate.education.length < 10 ||
      currentCandidate.education.length > 500
    ) {
      setEducationError("Education must be between 10 and 500 characters");
      hasError = true;
    }

    if (!currentCandidate.campaign_platform) {
      setCampaignPlatformError("Campaign platform is required");
      hasError = true;
    } else if (
      currentCandidate.campaign_platform.length < 10 ||
      currentCandidate.campaign_platform.length > 500
    ) {
      setCampaignPlatformError(
        "Campaign platform must be between 10 and 500 characters"
      );
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      if (dialogMode === "create") {
        await createCandidate(currentCandidate);
      } else {
        await updateCandidate(currentCandidate.id, currentCandidate);
      }
      await findCandidates();
      setIsDialogOpen(false);
      setError(null);
      setCurrentCandidate({
        id: 0,
        name: "",
        last_name: "",
        identification: "",
        contact_info: "",
        photo: "",
        political_party_id: 0,
        position: "",
        experience: "",
        biography: "",
        education: "",
        campaign_platform: "",
      });
    } catch (apiError: any) {
      setError(
        apiError.message || "An error occurred while saving the candidate."
      );
    }
  };

  const deleteCandidate = async (id: number) => {
    try {
      await removeCandidate(id);
      await findCandidates();
      setDeletingCandidateId(null);
    } catch (apiError: any) {
      setError(
        apiError.message || "An error occurred while deleting the candidate."
      );
    }
  };

  const openDialog = (mode: "create" | "update", candidate?: Candidate) => {
    setDialogMode(mode);
    setCurrentCandidate(
      candidate || {
        id: 0,
        name: "",
        last_name: "",
        identification: "",
        contact_info: "",
        photo: "",
        political_party_id: 0,
        position: "",
        experience: "",
        biography: "",
        education: "",
        campaign_platform: "",
      }
    );
    setIsDialogOpen(true);
    setNameError(null);
    setLastNameError(null);
    setIdentificationError(null);
    setContactInfoError(null);
    setPhotoError(null);
    setPoliticalPartyError(null);
    setPositionError(null);
    setExperienceError(null);
    setBiographyError(null);
    setEducationError(null);
    setCampaignPlatformError(null);
  };

  const filteredCandidates =
    candidates?.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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
                    First Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={currentCandidate.name}
                    onChange={handleInputChange}
                    className={`w-full ${nameError ? "border-red-500" : ""}`}
                    placeholder="Enter candidate first name"
                  />
                  {nameError && (
                    <p className="text-sm text-red-500">{nameError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={currentCandidate.last_name}
                    onChange={handleInputChange}
                    className={`w-full ${
                      lastNameError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter candidate last name"
                  />
                  {lastNameError && (
                    <p className="text-sm text-red-500">{lastNameError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="identification"
                    className="text-sm font-medium"
                  >
                    Identification
                  </Label>
                  <Input
                    id="identification"
                    name="identification"
                    value={currentCandidate.identification}
                    onChange={handleInputChange}
                    className={`w-full ${
                      identificationError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter identification number"
                  />
                  {identificationError && (
                    <p className="text-sm text-red-500">
                      {identificationError}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_info" className="text-sm font-medium">
                    Contact Information
                  </Label>
                  <Input
                    id="contact_info"
                    name="contact_info"
                    value={currentCandidate.contact_info}
                    onChange={handleInputChange}
                    className={`w-full ${
                      contactInfoError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter contact information"
                  />
                  {contactInfoError && (
                    <p className="text-sm text-red-500">{contactInfoError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo" className="text-sm font-medium">
                    Photo URL
                  </Label>
                  <Input
                    id="photo"
                    name="photo"
                    value={currentCandidate.photo}
                    onChange={handleInputChange}
                    className={`w-full ${photoError ? "border-red-500" : ""}`}
                    placeholder="Enter photo URL"
                  />
                  {photoError && (
                    <p className="text-sm text-red-500">{photoError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="political_party_id"
                    className="text-sm font-medium"
                  >
                    Political Party
                  </Label>
                  <Select
                    name="political_party_id"
                    value={String(currentCandidate.political_party_id)}
                    onValueChange={(value) =>
                      setCurrentCandidate((prev) => ({
                        ...prev,
                        political_party_id: Number(value),
                      }))
                    }
                  >
                    <SelectTrigger
                      className={`w-full ${
                        politicalPartyError ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select a party" />
                    </SelectTrigger>
                    <SelectContent>
                      {politicalParties?.map((party) => (
                        <SelectItem key={party.id} value={String(party.id)}>
                          {party.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {politicalPartyError && (
                    <p className="text-sm text-red-500">
                      {politicalPartyError}
                    </p>
                  )}
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
                    className={`w-full ${
                      positionError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter position"
                  />
                  {positionError && (
                    <p className="text-sm text-red-500">{positionError}</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="campaign" className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium">
                    Experience
                  </Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={currentCandidate.experience}
                    onChange={handleInputChange}
                    className={`w-full ${
                      experienceError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter relevant experience"
                    rows={2}
                  />
                  {experienceError && (
                    <p className="text-sm text-red-500">{experienceError}</p>
                  )}
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
                    className={`w-full ${
                      biographyError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter candidate biography"
                    rows={3}
                  />
                  {biographyError && (
                    <p className="text-sm text-red-500">{biographyError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education" className="text-sm font-medium">
                    Education
                  </Label>
                  <Input
                    id="education"
                    name="education"
                    value={currentCandidate.education}
                    onChange={handleInputChange}
                    className={`w-full ${
                      educationError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter education background"
                  />
                  {educationError && (
                    <p className="text-sm text-red-500">{educationError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="campaign_platform"
                    className="text-sm font-medium"
                  >
                    Campaign Platform
                  </Label>
                  <Textarea
                    id="campaign_platform"
                    name="campaign_platform"
                    value={currentCandidate.campaign_platform}
                    onChange={handleInputChange}
                    className={`w-full ${
                      campaignPlatformError ? "border-red-500" : ""
                    }`}
                    placeholder="Enter campaign platform"
                    rows={3}
                  />
                  {campaignPlatformError && (
                    <p className="text-sm text-red-500">
                      {campaignPlatformError}
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-6">
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={createIsLoading || updateIsLoading}
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
                  Identification
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
                  <TableCell className="h-12 px-4">{`${candidate.name} ${candidate.last_name}`}</TableCell>
                  <TableCell className="h-12 px-4">
                    {candidate.identification}
                  </TableCell>
                  <TableCell className="h-12 px-4">
                    {politicalParties?.find(
                      (party) => party.id === candidate.political_party_id
                    )?.name || "N/A"}
                  </TableCell>
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
                          {`${candidate.name} ${candidate.last_name}`}"? This
                          action cannot be undone.
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
