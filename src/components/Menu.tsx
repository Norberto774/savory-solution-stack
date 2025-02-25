
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { MenuItem as MenuItemType, CartItem as CartItemType } from "@/types/menu";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { MenuItem } from "./menu/MenuItem";
import { CategoryFilters } from "./menu/CategoryFilters";
import { CartSheet } from "./menu/CartSheet";

export const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItemType[]>([]);

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

      if (error) {
        console.error("Error fetching menu items:", error);
        toast.error("Failed to load menu items");
        setMenuItems([]); // Set empty array as fallback
        return;
      }

      if (data) {
        setMenuItems(data);
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      toast.error("Failed to load menu items");
      setMenuItems([]); // Set empty array as fallback
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: MenuItemType) => {
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

  const filteredItems = selectedCategory === "all"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} CVE`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-background" id="menu">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Our Menu</h2>
          <CategoryFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            getCategoryStyle={getCategoryStyle}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <MenuItem
              key={item.id}
              item={item}
              index={index}
              onAddToCart={addToCart}
              formatPrice={formatPrice}
            />
          ))}
        </div>

        <div className="fixed bottom-4 right-4 z-50">
          <CartSheet
            cart={cart}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            formatPrice={formatPrice}
          />
        </div>
      </div>
    </section>
  );
};
