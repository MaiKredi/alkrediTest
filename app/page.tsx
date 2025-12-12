import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MosaicProjects from "@/components/MosaicProjects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <main className="mx-auto max-w-none">
        <Services />
        <MosaicProjects />
        <About />

        {/* Contact section embedded in homepage */}
        <section id="contact" className="mt-20 px-4">
          <ContactForm />
        </section>
      </main>

      <Footer />
    </>
  );
}
