
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CartItem as CartItemType } from "@/types/menu";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "./CartItem";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CartSheetProps {
  cart: CartItemType[];
  onAddToCart: (item: CartItemType) => void;
  onRemoveFromCart: (itemId: number) => void;
  formatPrice: (price: number) => string;
}

export const CartSheet = ({ cart, onAddToCart, onRemoveFromCart, formatPrice }: CartSheetProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // First save the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id || null,
          items: cart,
          total: cartTotal,
          status: 'pending',
          customer_email: email || null
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create Stripe checkout session
      const { data: checkout, error: checkoutError } = await supabase.functions.invoke('create-checkout', {
        body: { 
          items: cart,
          userId: user?.id || null,
          orderReference: order.order_reference,
          customerEmail: email || undefined
        }
      });

      if (checkoutError) throw checkoutError;

      // Redirect to Stripe Checkout
      if (checkout.url) {
        window.location.href = checkout.url;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error("Failed to create checkout session");
    } finally {
      setLoading(false);
    }
  };

  return (
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
                <CartItem
                  key={item.id}
                  item={item}
                  onAdd={onAddToCart}
                  onRemove={onRemoveFromCart}
                  formatPrice={formatPrice}
                />
              ))}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter your email for order updates"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full mt-4"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Checkout"}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
