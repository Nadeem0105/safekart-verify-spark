import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingBag, Star, Shield, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Shopping = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock trusted inventory data
  const trustedInventory = [
    {
      id: 1,
      name: "Organic Honey",
      brand: "Pure Nature",
      price: "₹299",
      rating: 4.8,
      verified: true,
      image: "🍯",
      category: "Food & Beverages",
      description: "100% pure organic honey with certification"
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      brand: "TechSound Pro",
      price: "₹2,499",
      rating: 4.6,
      verified: true,
      image: "🎧",
      category: "Electronics",
      description: "Premium wireless earbuds with noise cancellation"
    },
    {
      id: 3,
      name: "Vitamin D3 Tablets",
      brand: "HealthFirst",
      price: "₹599",
      rating: 4.9,
      verified: true,
      image: "💊",
      category: "Health & Wellness",
      description: "Doctor recommended vitamin D3 supplements"
    },
    {
      id: 4,
      name: "Cotton T-Shirt",
      brand: "EcoWear",
      price: "₹899",
      rating: 4.5,
      verified: true,
      image: "👕",
      category: "Clothing",
      description: "100% organic cotton, sustainable fashion"
    },
    {
      id: 5,
      name: "Green Tea",
      brand: "Wellness Tea Co.",
      price: "₹450",
      rating: 4.7,
      verified: true,
      image: "🍵",
      category: "Food & Beverages",
      description: "Premium green tea leaves, antioxidant rich"
    },
    {
      id: 6,
      name: "Smartphone Case",
      brand: "ProtectPro",
      price: "₹799",
      rating: 4.4,
      verified: true,
      image: "📱",
      category: "Accessories",
      description: "Military grade protection for your device"
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter products based on search query
    const results = trustedInventory.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    setIsSearching(false);
    
    if (results.length > 0) {
      toast.success(`Found ${results.length} verified products`);
    } else {
      toast.error("No products found in our trusted inventory");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in">
            <ShoppingBag className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse-glow" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Trusted Shopping
            </h1>
            <p className="text-xl text-muted-foreground">
              Search and find products from our verified inventory
            </p>
          </div>

          {/* Search Section */}
          <Card className="glass-card slide-in-card mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Search Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-base font-medium">
                  Product Name, Brand, or Category
                </Label>
                <div className="flex gap-3">
                  <Input
                    id="search"
                    placeholder="Search for verified products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="glass-card text-base flex-1"
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching || !searchQuery.trim()}
                    className="hero-button px-6"
                  >
                    {isSearching ? (
                      <div className="h-5 w-5 animate-spin border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  All products in our inventory are IoT-verified for authenticity
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Search Results</h2>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  {searchResults.length} Products Found
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product, index) => (
                  <Card 
                    key={product.id}
                    className="glass-card hover-scale"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="text-6xl mb-3">{product.image}</div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          {product.verified && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">{product.price}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                          <Shield className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium text-primary">
                            IoT Verified Authentic
                          </span>
                        </div>

                        <Button className="w-full hero-button">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Popular Categories */}
          <Card className="glass-card mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">🏆 Popular Categories</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Food & Beverages</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Organic Products</li>
                    <li>• Health Supplements</li>
                    <li>• Premium Teas & Coffee</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Electronics</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Audio Devices</li>
                    <li>• Mobile Accessories</li>
                    <li>• Smart Gadgets</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Health & Wellness</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Vitamins & Minerals</li>
                    <li>• Fitness Products</li>
                    <li>• Personal Care</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Shopping;