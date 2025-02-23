
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types/menu";

interface CartItemProps {
  item: CartItemType;
  onAdd: (item: CartItemType) => void;
  onRemove: (itemId: number) => void;
  formatPrice: (price: number) => string;
}

export const CartItem = ({ item, onAdd, onRemove, formatPrice }: CartItemProps) => {
  return (
    <div className="flex justify-between items-center py-4 border-b">
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
          onClick={() => onRemove(item.id)}
        >
          -
        </Button>
        <span>{item.quantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAdd(item)}
        >
          +
        </Button>
      </div>
    </div>
  );
};
