
import { Button } from "@/components/ui/button";

interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  getCategoryStyle: (category: string) => string;
}

export const CategoryFilters = ({
  categories,
  selectedCategory,
  onCategorySelect,
  getCategoryStyle,
}: CategoryFiltersProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => onCategorySelect("all")}
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          onClick={() => onCategorySelect(category)}
          className={`${selectedCategory === category ? getCategoryStyle(category) : ""}`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
