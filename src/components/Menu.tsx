
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MenuItem, CartItem } from "@/types/menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

export const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "Main Dishes":
        return "bg-primary text-primary-foreground hover:bg-primary/90";
      case "Appetizers":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/90";
      case "Desserts":
        return "bg-orange-500 text-white hover:bg-orange-600";
      case "Beverages":
        return "bg-teal-500 text-white hover:bg-teal-600";
      default:
        return "";
    }
  };

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("category", { ascending: true });

      if (error) throw error;

      if (data) {
        setMenuItems(data);
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      toast.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      return [...prevCart, { ...item, quantity: 1 }];
    });
    
    toast.success(`Added ${item.name} to cart`);
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      
      return prevCart.filter(item => item.id !== itemId);
    });
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredItems = selectedCategory === "all"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} CVE`;
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading menu...</div>;
  }

  return (
    <section className="py-12 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Our Menu</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                onClick={() => setSelectedCategory(category)}
                className={`${selectedCategory === category ? getCategoryStyle(category) : ""}`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="fixed bottom-4 right-4 z-50">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="rounded-full h-16 w-16 shadow-lg">
                  <ShoppingCart className="h-6 w-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>
                    Review your selected items
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground">Your cart is empty</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-4 border-b">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.price)} × {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              -
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addToCart(item)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center font-medium">
                          <span>Total</span>
                          <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <Button className="w-full mt-4">
                          Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                {item.image_url && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.popular && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                        Popular
                      </div>
                    )}
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  {item.description && (
                    <p className="text-muted-foreground">{item.description}</p>
                  )}
                </CardContent>
                <CardFooter className="mt-auto flex justify-between items-center">
                  <span className="text-lg font-semibold">{formatPrice(item.price)}</span>
                  <Button onClick={() => addToCart(item)}>
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
