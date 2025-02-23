
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CartItem as CartItemType } from "@/types/menu";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "./CartItem";

interface CartSheetProps {
  cart: CartItemType[];
  onAddToCart: (item: CartItemType) => void;
  onRemoveFromCart: (itemId: number) => void;
  formatPrice: (price: number) => string;
}

export const CartSheet = ({ cart, onAddToCart, onRemoveFromCart, formatPrice }: CartSheetProps) => {
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
                <Button className="w-full mt-4">
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
