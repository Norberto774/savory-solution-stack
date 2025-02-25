
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Appetizers",
    image: "https://images.unsplash.com/photo-1541014741259-de529411b96a",
    count: 12,
  },
  {
    id: 2,
    name: "Main Course",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    count: 16,
  },
  {
    id: 3,
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    count: 8,
  },
  {
    id: 4,
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e",
    count: 10,
  },
];

export const Categories = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated selection of dishes, crafted with passion and precision
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm opacity-90">{category.count} Items</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
