import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Leaf, Truck, Package, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProduceBatch {
  id: string;
  name: string;
  quantity: string;
  harvestDate: string;
  status: string;
  farmer: string;
}

const DistributorDashboard = () => {
  const [batches, setBatches] = useState<ProduceBatch[]>([
    {
      id: "BATCH001",
      name: "Organic Alphonso Mangoes", 
      quantity: "100 kg",
      harvestDate: "2024-09-20",
      status: "Awaiting Pickup",
      farmer: "Green Valley Farm"
    },
    {
      id: "BATCH003",
      name: "Fresh Spinach",
      quantity: "25 kg",
      harvestDate: "2024-09-23",
      status: "Awaiting Pickup", 
      farmer: "Sunny Acres Farm"
    },
    {
      id: "BATCH002",
      name: "Fresh Tomatoes",
      quantity: "50 kg", 
      harvestDate: "2024-09-22",
      status: "In Transit",
      farmer: "Green Valley Farm"
    }
  ]);

  const [selectedRetailer, setSelectedRetailer] = useState("");
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [transferBatchId, setTransferBatchId] = useState("");

  const retailers = [
    "Fresh Market Store",
    "Organic Grocers", 
    "City Supermarket",
    "Farm Fresh Mart"
  ];

  const confirmPickup = (batchId: string) => {
    setBatches(batches.map(batch => 
      batch.id === batchId 
        ? { ...batch, status: "In Transit" }
        : batch
    ));
  };

  const transferToRetailer = () => {
    if (selectedRetailer && transferBatchId) {
      setBatches(batches.map(batch => 
        batch.id === transferBatchId 
          ? { ...batch, status: "Transferred to Retailer" }
          : batch
      ));
      setTransferDialogOpen(false);
      setSelectedRetailer("");
      setTransferBatchId("");
    }
  };

  const openTransferDialog = (batchId: string) => {
    setTransferBatchId(batchId);
    setTransferDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Awaiting Pickup":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Transferred to Retailer":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const awaitingPickup = batches.filter(b => b.status === "Awaiting Pickup");
  const inTransit = batches.filter(b => b.status === "In Transit");

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
            <span className="text-muted-foreground">Welcome, Swift Distribution Co.</span>
            <Button variant="outline" asChild>
              <Link to="/">Logout</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Distributor Dashboard</h1>
          <p className="text-muted-foreground">Manage pickups and transfers in the supply chain</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Awaiting Pickup</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{awaitingPickup.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inTransit.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Handled</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{batches.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Awaiting Pickup Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Awaiting Pickup</CardTitle>
            <CardDescription>
              Batches ready for pickup from farmers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {awaitingPickup.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{batch.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {batch.farmer} • Batch ID: {batch.id} • {batch.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(batch.status)}>
                      {batch.status}
                    </Badge>
                    <Button
                      onClick={() => confirmPickup(batch.id)}
                      size="sm"
                      className="gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Confirm Pickup
                    </Button>
                  </div>
                </div>
              ))}
              {awaitingPickup.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No batches awaiting pickup
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* In Transit Section */}
        <Card>
          <CardHeader>
            <CardTitle>In Transit</CardTitle>
            <CardDescription>
              Batches currently being transported
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inTransit.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-earth/10 rounded-lg flex items-center justify-center">
                      <Truck className="h-6 w-6 text-earth" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{batch.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {batch.farmer} • Batch ID: {batch.id} • {batch.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(batch.status)}>
                      {batch.status}
                    </Badge>
                    <Button
                      onClick={() => openTransferDialog(batch.id)}
                      size="sm"
                      variant="earth"
                      className="gap-2"
                    >
                      <Truck className="h-4 w-4" />
                      Transfer to Retailer
                    </Button>
                  </div>
                </div>
              ))}
              {inTransit.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No batches in transit
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Transfer Dialog */}
        <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transfer to Retailer</DialogTitle>
              <DialogDescription>
                Select a retailer to transfer the batch to
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="retailer">Select Retailer</Label>
                <Select onValueChange={setSelectedRetailer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a retailer" />
                  </SelectTrigger>
                  <SelectContent>
                    {retailers.map((retailer) => (
                      <SelectItem key={retailer} value={retailer}>
                        {retailer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={transferToRetailer}
                  disabled={!selectedRetailer}
                  className="flex-1"
                >
                  Confirm Transfer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setTransferDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DistributorDashboard;