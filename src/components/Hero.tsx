
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#111] text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      
      <div className="container relative z-10 px-4 py-32 text-center">
        <motion.span 
          className="inline-block mb-4 text-sm font-medium tracking-wider uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to
        </motion.span>
        
        <motion.h1 
          className="mb-6 text-5xl md:text-7xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Culinary Canvas
        </motion.h1>
        
        <motion.p 
          className="mx-auto mb-8 max-w-2xl text-lg text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Experience the art of fine dining with our masterfully crafted dishes,
          where every plate tells a unique story.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            Explore Menu
          </Button>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </motion.div>
    </section>
  );
};
