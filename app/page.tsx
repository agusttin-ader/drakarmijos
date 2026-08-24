import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Institutions } from "@/components/sections/Institutions";

const About = dynamic(() =>
  import("@/components/sections/About").then((m) => m.About),
);
const Specialties = dynamic(() =>
  import("@/components/sections/Specialties").then((m) => m.Specialties),
);
const ConsultationPath = dynamic(() =>
  import("@/components/sections/ConsultationPath").then((m) => m.ConsultationPath),
);
const Testimonials = dynamic(() =>
  import("@/components/sections/Testimonials").then((m) => m.Testimonials),
);
const Faq = dynamic(() =>
  import("@/components/sections/Faq").then((m) => m.Faq),
);
const Booking = dynamic(() =>
  import("@/components/sections/Booking").then((m) => m.Booking),
);

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
