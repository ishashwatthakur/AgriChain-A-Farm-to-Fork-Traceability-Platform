import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Leaf, Plus, Upload, Package, Calendar, Weight, MapPin, User, FileText, Camera, QrCode } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProduceBatch {
  id: string;
  name: string;
  quantity: string;
  harvestDate: string;
  status: string;
  photo?: string;
  farmLocation: string;
  distributorAssigned?: string;
  notes: string;
  pickupDate?: string;
  transferDate?: string;
  retailerAssigned?: string;
}

const FarmerDashboard = () => {
  const [batches, setBatches] = useState<ProduceBatch[]>([
    {
      id: "BATCH001",
      name: "Organic Alphonso Mangoes",
      quantity: "100 kg",
      harvestDate: "2024-09-20",
      status: "Awaiting Pickup",
      farmLocation: "Green Valley Farm, Maharashtra",
      notes: "Premium quality mangoes, organically grown without pesticides",
      distributorAssigned: "FreshProduce Distributors",
      pickupDate: "2024-09-21"
    },
    {
      id: "BATCH002", 
      name: "Fresh Tomatoes",
      quantity: "50 kg",
      harvestDate: "2024-09-22",
      status: "In Transit",
      farmLocation: "Green Valley Farm, Maharashtra",
      notes: "Vine-ripened tomatoes, ideal for cooking",
      distributorAssigned: "City Wholesale Market",
      pickupDate: "2024-09-23"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNewBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const photoFile = formData.get('photo') as File;
    const photoUrl = photoFile && photoFile.size > 0 ? URL.createObjectURL(photoFile) : undefined;
    
    const newBatch: ProduceBatch = {
      id: `BATCH${String(batches.length + 1).padStart(3, '0')}`,
      name: formData.get('name') as string,
      quantity: formData.get('quantity') as string,
      harvestDate: formData.get('harvestDate') as string,
      farmLocation: formData.get('farmLocation') as string,
      notes: formData.get('notes') as string,
      status: "Awaiting Pickup",
      photo: photoUrl
    };
    setBatches([...batches, newBatch]);
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Awaiting Pickup":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Available for Sale":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">AgriChain</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, Green Valley Farm</span>
            <Button variant="outline" asChild>
              <Link to="/">Logout</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farmer Dashboard</h1>
            <p className="text-muted-foreground">Manage your produce batches and track their journey</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Register New Batch
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Register New Produce Batch</DialogTitle>
                <DialogDescription>
                  Add a new batch of produce to the traceability system
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNewBatch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Organic Alphonso Mangoes"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    placeholder="e.g., 100 kg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="harvestDate">Harvest Date</Label>
                  <Input
                    id="harvestDate"
                    name="harvestDate"
                    type="date"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmLocation">Farm Location</Label>
                  <Input
                    id="farmLocation"
                    name="farmLocation"
                    placeholder="e.g., Green Valley Farm, Maharashtra"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Product Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Additional details about the produce..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Product Photo</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Click to upload or drag and drop</p>
                    <Input
                      id="photo"
                      name="photo"
                      type="file"
                      accept="image/*"
                      className="mt-2"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Register Batch
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{batches.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Awaiting Pickup</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {batches.filter(b => b.status === "Awaiting Pickup").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Weight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {batches.filter(b => b.status === "In Transit").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Batches List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Produce Batches</CardTitle>
            <CardDescription>
              Track the status of all your registered produce batches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              {batches.map((batch) => (
                <AccordionItem key={batch.id} value={batch.id} className="border border-border rounded-lg">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold">{batch.name}</h3>
                          <p className="text-muted-foreground text-sm">
                            {batch.id} • {batch.quantity}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(batch.status)}>
                        {batch.status}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      {/* QR Code and Product Photo */}
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-border">
                          <Label className="text-sm font-medium flex items-center gap-2 mb-4">
                            <QrCode className="h-4 w-4" />
                            Product QR Code
                          </Label>
                          <div className="flex flex-col items-center gap-4">
                            <QRCodeSVG
                              id={`qr-${batch.id}`}
                              value={`${window.location.origin}/trace/${batch.id}`}
                              size={200}
                              level="H"
                              includeMargin={true}
                            />
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                const canvas = document.createElement("canvas");
                                const svg = document.querySelector(`#qr-${batch.id}`);
                                const svgData = new XMLSerializer().serializeToString(svg!);
                                const img = new Image();
                                
                                img.onload = () => {
                                  canvas.width = img.width;
                                  canvas.height = img.height;
                                  const ctx = canvas.getContext("2d")!;
                                  ctx.drawImage(img, 0, 0);
                                  
                                  const pngFile = canvas.toDataURL("image/png");
                                  const downloadLink = document.createElement("a");
                                  downloadLink.download = `${batch.name}-${batch.id}-QR.png`;
                                  downloadLink.href = pngFile;
                                  downloadLink.click();
                                };
                                
                                img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
                              }}
                              className="w-full"
                            >
                              Download QR Code
                            </Button>
                          </div>
                        </div>
                        {batch.photo && (
                          <div>
                            <Label className="text-sm font-medium">Product Photo</Label>
                            <div className="mt-2 border border-border rounded-lg overflow-hidden">
                              <img 
                                src={batch.photo} 
                                alt={batch.name}
                                className="w-full h-48 object-cover"
                              />
                            </div>
                          </div>
                        )}
                        <div>
                          <Label className="text-sm font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Product Notes
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {batch.notes || "No additional notes"}
                          </p>
                        </div>
                      </div>
                      
                      {/* Batch Details */}
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Harvest Information
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Harvested on {new Date(batch.harvestDate).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Farm Location
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {batch.farmLocation}
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium flex items-center gap-2">
                            <Weight className="h-4 w-4" />
                            Quantity
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {batch.quantity}
                          </p>
                        </div>
                        
                        {batch.distributorAssigned && (
                          <div>
                            <Label className="text-sm font-medium flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Assigned Distributor
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {batch.distributorAssigned}
                            </p>
                            {batch.pickupDate && (
                              <p className="text-xs text-muted-foreground">
                                Pickup: {new Date(batch.pickupDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        )}
                        
                        {batch.retailerAssigned && (
                          <div>
                            <Label className="text-sm font-medium flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Current Retailer
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              {batch.retailerAssigned}
                            </p>
                            {batch.transferDate && (
                              <p className="text-xs text-muted-foreground">
                                Transferred: {new Date(batch.transferDate).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;