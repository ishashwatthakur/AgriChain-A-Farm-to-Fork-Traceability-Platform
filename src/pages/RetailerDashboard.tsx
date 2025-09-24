import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Store, Package, QrCode, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProduceBatch {
  id: string;
  name: string;
  quantity: string;
  harvestDate: string;
  status: string;
  farmer: string;
  distributor: string;
}

const RetailerDashboard = () => {
  const [batches, setBatches] = useState<ProduceBatch[]>([
    {
      id: "BATCH004",
      name: "Organic Bell Peppers",
      quantity: "30 kg",
      harvestDate: "2024-09-21",
      status: "Transferred to Retailer",
      farmer: "Mountain View Farm",
      distributor: "Swift Distribution Co."
    },
    {
      id: "BATCH005",
      name: "Fresh Carrots",
      quantity: "40 kg",
      harvestDate: "2024-09-23",
      status: "Transferred to Retailer",
      farmer: "Valley Organic Farm",
      distributor: "Quick Logistics"
    },
    {
      id: "BATCH006",
      name: "Organic Lettuce",
      quantity: "15 kg",
      harvestDate: "2024-09-24",
      status: "Available for Sale",
      farmer: "Green Leaf Farm",
      distributor: "Swift Distribution Co."
    }
  ]);

  const markAsReceived = (batchId: string) => {
    setBatches(batches.map(batch => 
      batch.id === batchId 
        ? { ...batch, status: "Available for Sale" }
        : batch
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Transferred to Retailer":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Available for Sale":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const pendingReceival = batches.filter(b => b.status === "Transferred to Retailer");
  const availableForSale = batches.filter(b => b.status === "Available for Sale");

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
            <span className="text-muted-foreground">Welcome, Fresh Market Store</span>
            <Button variant="outline" asChild>
              <Link to="/">Logout</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Retailer Dashboard</h1>
          <p className="text-muted-foreground">Receive products and provide traceability to customers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Receival</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingReceival.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available for Sale</CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableForSale.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">QR Codes Generated</CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableForSale.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Receival Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pending Receival</CardTitle>
            <CardDescription>
              Products transferred by distributors awaiting confirmation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReceival.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{batch.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        From: {batch.farmer} via {batch.distributor} • Batch ID: {batch.id} • {batch.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(batch.status)}>
                      {batch.status}
                    </Badge>
                    <Button
                      onClick={() => markAsReceived(batch.id)}
                      size="sm"
                      className="gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Mark as Received
                    </Button>
                  </div>
                </div>
              ))}
              {pendingReceival.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No products pending receival
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available for Sale Section */}
        <Card>
          <CardHeader>
            <CardTitle>Available for Sale</CardTitle>
            <CardDescription>
              Products ready for customers with QR codes for traceability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableForSale.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-nature/10 rounded-lg flex items-center justify-center">
                      <Store className="h-6 w-6 text-nature" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{batch.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        From: {batch.farmer} • Batch ID: {batch.id} • {batch.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(batch.status)}>
                      {batch.status}
                    </Badge>
                    <div className="flex flex-col items-center p-2 bg-white border rounded">
                      <QrCode className="h-8 w-8 text-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">QR Code</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <Link to={`/trace/${batch.id}`}>
                        View Trace
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
              {availableForSale.length === 0 && (
                <p className="text-muted-foreground text-center py-8">
                  No products available for sale
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RetailerDashboard;