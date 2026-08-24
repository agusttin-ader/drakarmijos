import { About } from "@/components/sections/About";
import { Booking } from "@/components/sections/Booking";
import { ConsultationPath } from "@/components/sections/ConsultationPath";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Institutions } from "@/components/sections/Institutions";
import { Specialties } from "@/components/sections/Specialties";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main id="main-content" className="flex-1 md:pb-0">
      <Hero />
      <Institutions />
      <About />
      <Specialties />
      <ConsultationPath />
      <Testimonials />
      <Faq />
      <Booking />
    </main>
  );
}
