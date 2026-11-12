import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Store from "@/components/store/Store";
import Features from "@/components/Features";
import Craft from "@/components/Craft";
import Story from "@/components/Story";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollProgress from "@/components/ScrollProgress";
import Marquee from "@/components/Marquee";

const craftWords = [
  "Made to order",
  "Finished by hand",
  "The Matale workshop",
  "Sized to your room",
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col text-foreground">
      <ScrollProgress />
      <AmbientBackground />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Categories />
        <Store />
        <Features />
        <Craft />
        <Marquee items={craftWords} tone="line" reverse />
        <Story />
        <Visit />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
