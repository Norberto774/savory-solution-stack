
import { motion } from "framer-motion";
import { MenuItem as MenuItemType } from "@/types/menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MenuItemProps {
  item: MenuItemType;
  index: number;
  onAddToCart: (item: MenuItemType) => void;
  formatPrice: (price: number) => string;
}

export const MenuItem = ({ item, index, onAddToCart, formatPrice }: MenuItemProps) => {
  return (
    <motion.div
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
          <Button onClick={() => onAddToCart(item)}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
