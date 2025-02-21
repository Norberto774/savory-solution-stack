
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const featuredItems = [
  {
    id: 1,
    name: "Truffle Risotto",
    description: "Creamy Arborio rice with black truffle and Parmesan",
    price: "$28",
    image: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=800&q=80",
    badge: "Chef's Special"
  },
  {
    id: 2,
    name: "Wagyu Steak",
    description: "Premium Japanese A5 Wagyu with seasonal vegetables",
    price: "$85",
    image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&w=800&q=80",
    badge: "Premium"
  },
  {
    id: 3,
    name: "Seafood Platter",
    description: "Fresh daily selection of premium seafood",
    price: "$65",
    image: "https://images.unsplash.com/photo-1565680018434-b583c7dfb8c8?auto=format&fit=crop&w=800&q=80",
    badge: "New"
  },
  {
    id: 4,
    name: "Duck Confit",
    description: "Slow-cooked duck leg with orange glaze",
    price: "$42",
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=800&q=80",
    badge: "Seasonal"
  }
];

export const FeaturedItems = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: true
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Dishes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our chef's carefully selected specialties, featuring seasonal ingredients and innovative techniques
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {featuredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="min-w-[280px] sm:min-w-[380px] md:min-w-[400px] flex-[0_0_90%] sm:flex-[0_0_50%] md:flex-[0_0_40%] pl-4"
                >
                  <div className="h-full bg-background rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-64 mb-4 overflow-hidden group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm">
                        {item.badge}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                      <p className="text-muted-foreground mb-3">{item.description}</p>
                      <p className="text-lg font-semibold">{item.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
