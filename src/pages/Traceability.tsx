import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, MapPin, Calendar, User, Truck, Store, ArrowDown } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface TraceEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  icon: React.ReactNode;
  status: "completed" | "current";
}

interface ProductDetails {
  id: string;
  name: string;
  quantity: string;
  harvestDate: string;
  farmer: string;
  farmLocation: string;
  distributor: string;
  retailer: string;
  photo?: string;
}

const Traceability = () => {
  const { batchId } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [events, setEvents] = useState<TraceEvent[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from API
    // Mock data based on batch ID
    const mockProduct: ProductDetails = {
      id: batchId || "BATCH006",
      name: "Organic Lettuce",
      quantity: "15 kg",
      harvestDate: "2024-09-24",
      farmer: "Green Leaf Farm",
      farmLocation: "Sonoma County, CA",
      distributor: "Swift Distribution Co.",
      retailer: "Fresh Market Store"
    };

    const mockEvents: TraceEvent[] = [
      {
        id: "1",
        title: "Harvested",
        description: `Fresh ${mockProduct.name} harvested at ${mockProduct.farmer}`,
        date: "September 24, 2024",
        time: "6:00 AM",
        location: mockProduct.farmLocation,
        icon: <Leaf className="h-5 w-5" />,
        status: "completed"
      },
      {
        id: "2", 
        title: "Picked up by Distributor",
        description: `Collected by ${mockProduct.distributor} for transport`,
        date: "September 24, 2024",
        time: "2:30 PM",
        location: mockProduct.farmLocation,
        icon: <Truck className="h-5 w-5" />,
        status: "completed"
      },
      {
        id: "3",
        title: "Arrived at Retailer",
        description: `Delivered to ${mockProduct.retailer} and available for purchase`,
        date: "September 25, 2024", 
        time: "8:15 AM",
        location: "Downtown District",
        icon: <Store className="h-5 w-5" />,
        status: "completed"
      }
    ];

    setProduct(mockProduct);
    setEvents(mockEvents);
  }, [batchId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
          <p className="text-muted-foreground">The requested batch ID could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-first header */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Leaf className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">AgriChain</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Your Product's Journey</h1>
          <p className="text-white/90">Track the complete path from farm to your table</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Product Details Card */}
        <Card className="mb-8 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
                <p className="text-muted-foreground">Batch ID: {product.id}</p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Verified Fresh
              </Badge>
            </div>
            
            {/* Product photo placeholder */}
            <div className="w-full h-48 bg-gradient-to-br from-nature/20 to-primary/20 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <Leaf className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Product Photo</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Quantity:</span>
                <p className="font-semibold">{product.quantity}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Harvest Date:</span>
                <p className="font-semibold">{product.harvestDate}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Farm:</span>
                <p className="font-semibold">{product.farmer}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <p className="font-semibold">{product.farmLocation}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journey Timeline */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-foreground">Supply Chain Journey</h3>
          
          {events.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline connector */}
              {index < events.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-12 bg-border"></div>
              )}
              
              <Card className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      event.status === 'completed' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {event.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{event.title}</h4>
                        <Badge 
                          variant={event.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {event.status === 'completed' ? 'Completed' : 'In Progress'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow connector */}
              {index < events.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Blockchain Verified
            </h3>
            <p className="text-muted-foreground mb-4">
              This product's journey has been recorded on the blockchain, ensuring complete transparency and authenticity.
            </p>
            <Button variant="outline" asChild>
              <Link to="/">Learn More About AgriChain</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Traceability;