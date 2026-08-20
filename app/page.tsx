import { About } from "@/components/sections/About";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Booking } from "@/components/sections/Booking";
import { Hero } from "@/components/sections/Hero";
import { Specialties } from "@/components/sections/Specialties";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main id="main-content" className="flex-1 md:pb-0">
      <Hero />
      <Specialties />
      <About />
      <BeforeAfter />
      <Testimonials />
      <Booking />
    </main>
  );
}
