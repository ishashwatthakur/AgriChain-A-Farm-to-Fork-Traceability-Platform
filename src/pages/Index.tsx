import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Shield, QrCode, Users, Truck, Store } from "lucide-react";
import { Link } from "react-router-dom";
import farmHero from "@/assets/farm-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">AgriChain</span>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <img 
          src={farmHero} 
          alt="Modern farming landscape" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 text-white">
          <h1 className="text-6xl font-bold mb-6 animate-fadeIn">
            Farm-to-Fork Transparency
          </h1>
          <p className="text-xl mb-8 text-white/90 animate-fadeIn">
            Track your produce from harvest to table with blockchain-verified traceability
          </p>
          <div className="flex gap-4 justify-center animate-fadeIn">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Start Tracking</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white bg-white text-foreground hover:bg-white/90" asChild>
              <Link to="#learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn-more" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Built for Every Step of the Supply Chain
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform connects farmers, distributors, retailers, and consumers in a transparent ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="shadow-soft hover:shadow-natural transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">For Farmers</CardTitle>
                <CardDescription>Register and track your produce from harvest</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Upload product photos and details</li>
                  <li>• Generate unique batch IDs</li>
                  <li>• Track pickup status</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-natural transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-earth/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-earth" />
                </div>
                <CardTitle className="text-2xl">For Distributors</CardTitle>
                <CardDescription>Manage pickups and transfers efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Confirm product pickups</li>
                  <li>• Update transit status</li>
                  <li>• Transfer to retailers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-natural transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-nature/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Store className="h-8 w-8 text-nature" />
                </div>
                <CardTitle className="text-2xl">For Retailers</CardTitle>
                <CardDescription>Display product origin with QR codes</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Mark products as received</li>
                  <li>• Generate QR codes</li>
                  <li>• Provide full traceability</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consumer Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <QrCode className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              For Consumers
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Scan a QR code on your product to see its complete journey from farm to your table
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Scan QR Code</h3>
                  <p className="text-muted-foreground">Use your phone to scan the code on the product</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-earth rounded-full flex items-center justify-center text-earth-foreground font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">View Journey</h3>
                  <p className="text-muted-foreground">See the complete timeline from harvest to store</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-nature rounded-full flex items-center justify-center text-nature-foreground font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Trust & Verify</h3>
                  <p className="text-muted-foreground">Make informed choices with verified information</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Our Technology
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Powered by blockchain technology to ensure data integrity and transparency
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <Card>
                <CardHeader>
                  <CardTitle>Immutable Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Every transaction is recorded on the blockchain, creating an unchangeable history of your product's journey.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get instant updates as your products move through the supply chain with verified timestamps.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">AgriChain</span>
          </div>
          <div className="text-center text-background/60">
            <p>&copy; 2024 AgriChain. Building trust in the food supply chain.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;