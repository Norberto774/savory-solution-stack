
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Menu } from "@/components/Menu";

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <Navigation />
      <Hero />
      <Categories />
      <Menu />
    </div>
  );
};

export default Index;
