
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Menu } from "@/components/Menu";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const handleCallClick = () => {
    window.location.href = "tel:+2389556482";
    toast.success("Calling restaurant...");
  };

  const handleDirectionsClick = () => {
    window.open("https://maps.google.com/?q=Av. do Palmarejo, Praia", "_blank");
    toast.success("Opening directions in Google Maps");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:contact@kazabranka.com";
    toast.success("Opening email client");
  };

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
      <Menu />

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16 bg-muted"
      >
        <div className="container px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">Get in touch with us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Phone */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-card p-6 rounded-lg shadow-lg text-center"
            >
              <Phone className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground mb-4">+238 955 64 82</p>
              <Button onClick={handleCallClick} className="w-full">
                Call Now
              </Button>
            </motion.div>

            {/* Location */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-card p-6 rounded-lg shadow-lg text-center"
            >
              <MapPin className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-sm text-muted-foreground mb-4">Av. do Palmarejo, Praia</p>
              <Button onClick={handleDirectionsClick} variant="outline" className="w-full">
                Get Directions
              </Button>
            </motion.div>

            {/* Email */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-card p-6 rounded-lg shadow-lg text-center"
            >
              <Mail className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground mb-4">contact@kazabranka.com</p>
              <Button onClick={handleEmailClick} variant="outline" className="w-full">
                Send Email
              </Button>
            </motion.div>

            {/* Hours */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-card p-6 rounded-lg shadow-lg text-center"
            >
              <Clock className="w-8 h-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Opening Hours</h3>
              <p className="text-sm text-muted-foreground mb-4">10:30 AM - 2:00 AM</p>
              <Button variant="outline" className="w-full" asChild>
                <a href="/contact">More Info</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Index;
