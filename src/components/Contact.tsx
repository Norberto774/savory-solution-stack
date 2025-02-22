
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const Contact = () => {
  const [openingTime, setOpeningTime] = useState<string>("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const calculateOpeningTime = () => {
    const now = new Date();
    const openingHour = 10;
    const openingMinute = 30;
    
    const opening = new Date(now);
    opening.setHours(openingHour, openingMinute, 0);

    if (now > opening) {
      opening.setDate(opening.getDate() + 1);
    }

    const diffMs = opening.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins > 60) {
      const hours = Math.floor(diffMins / 60);
      return `Opens in ${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `Opens in ${diffMins} minutes`;
  };

  useEffect(() => {
    const updateOpeningTime = () => {
      setOpeningTime(calculateOpeningTime());
    };

    updateOpeningTime();
    const interval = setInterval(updateOpeningTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', data);
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container px-4 py-12"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground">We'd love to hear from you</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-card rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Kaza Branka</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <p>Av. do Palmarejo, Praia</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a href="tel:+2389556482" className="hover:text-primary">
                      +238 955 64 82
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p>10:30 AM - 2:00 AM</p>
                      <p className="text-sm text-muted-foreground">{openingTime}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h3 className="font-medium">Service Options:</h3>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Has outdoor seating</li>
                    <li>• Serves great cocktails</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Price Range:</h3>
                  <p className="text-muted-foreground">Moderately Expensive</p>
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full"
                    onClick={() => window.open("tel:+2389556482")}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                </div>
              </div>

              {/* Map */}
              <div className="bg-card rounded-lg p-6 shadow-lg h-[300px] relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15637.045034733893!2d-23.55!3d14.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDU0JzM2LjAiTiAyM8KwMzMnMDAuMCJX!5e0!3m2!1sen!2sus!4v1645524000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your name"
                    {...register("name", { required: true })}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">Name is required</p>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Your email"
                    {...register("email", { 
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                    })}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">Valid email is required</p>
                  )}
                </div>

                <div>
                  <Textarea
                    placeholder="Your message"
                    rows={5}
                    {...register("message", { required: true })}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">Message is required</p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
