import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MosaicProjects from "@/components/MosaicProjects";
import Footer from "@/components/Footer";
import LanguageProvider from "@/components/ClientProviders";
import { t } from "@/lib/i18n";

export default function Page() {
  return (
    <LanguageProvider>
      <>
        <Header />
        <Hero />
        <main className="mx-auto max-w-none">
          <Services />
          <MosaicProjects />
        </main>
        <Footer />
      </>
    </LanguageProvider>
  );
}
