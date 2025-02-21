
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { motion } from "framer-motion";

<lov-add-dependency>framer-motion@latest</lov-add-dependency>

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <Navigation />
      <Hero />
      <Categories />
    </motion.div>
  );
};

export default Index;
