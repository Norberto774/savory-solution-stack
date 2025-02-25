
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface Category {
  title: string;
  description: string;
  icon: string;
  href: string;
}

export const Categories = () => {
  const categories: Category[] = [
    {
      title: "Main Dishes",
      description: "Discover our signature dishes",
      icon: "🍽️",
      href: "#menu"
    },
    {
      title: "Appetizers",
      description: "Start your meal right",
      icon: "🥗",
      href: "#menu"
    },
    {
      title: "Desserts",
      description: "Sweet endings",
      icon: "🍰",
      href: "#menu"
    },
    {
      title: "Beverages",
      description: "Refresh yourself",
      icon: "🥤",
      href: "#menu"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Categories</h2>
          <p className="text-muted-foreground">
            Explore our carefully curated menu categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <a href={category.href} className="block">
                <div className="group relative overflow-hidden rounded-lg bg-card p-6 shadow-lg transition-all hover:shadow-xl">
                  <div className="mb-4 text-4xl">{category.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-4 w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    View All
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
