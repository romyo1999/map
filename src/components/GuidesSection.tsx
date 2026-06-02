import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Globe } from "lucide-react";

interface GuidesSectionProps {
  language: string;
}

const GuidesSection = ({ language }: GuidesSectionProps) => {
  const content = {
    ar: {
      title: "أدلة سياحية للتحميل",
      subtitle: "حمل الأدلة السياحية المجانية لاستكشاف العرائش بأفضل طريقة",
      guides: [
        { title: "الدليل السياحي باللغة العربية", description: "دليل شامل للمعالم التاريخية والثقافية في العرائش", filename: "larache-guide-ar.pdf", flag: "🇲🇦", size: "2.1 MB" },
        { title: "Tourist Guide in English", description: "دليل شامل باللغة الإنجليزية", filename: "larache-guide-en.pdf", flag: "🇬🇧", size: "2.1 MB" },
        { title: "Guide Touristique en Français", description: "دليل شامل باللغة الفرنسية", filename: "larache-guide-fr.pdf", flag: "🇫🇷", size: "2.1 MB" },
        { title: "Guía Turística en Español", description: "دليل شامل باللغة الإسبانية", filename: "larache-guide-es.pdf", flag: "🇪🇸", size: "2.1 MB" }
      ]
    },
    en: {
      title: "Downloadable Tourist Guides",
      subtitle: "Download free tourist guides to explore Larache in the best way",
      guides: [
        { title: "الدليل السياحي باللغة العربية", description: "Complete guide in Arabic", filename: "larache-guide-ar.pdf", flag: "🇲🇦", size: "2.1 MB" },
        { title: "Tourist Guide in English", description: "Complete guide to Larache's historical and cultural landmarks", filename: "larache-guide-en.pdf", flag: "🇬🇧", size: "2.1 MB" },
        { title: "Guide Touristique en Français", description: "Complete guide in French", filename: "larache-guide-fr.pdf", flag: "🇫🇷", size: "2.1 MB" },
        { title: "Guía Turística en Español", description: "Complete guide in Spanish", filename: "larache-guide-es.pdf", flag: "🇪🇸", size: "2.1 MB" }
      ]
    },
    fr: {
      title: "Guides Touristiques Téléchargeables",
      subtitle: "Téléchargez des guides touristiques gratuits pour explorer Larache de la meilleure façon",
      guides: [
        { title: "الدليل السياحي باللغة العربية", description: "Guide complet en arabe", filename: "larache-guide-ar.pdf", flag: "🇲🇦", size: "2.1 MB" },
        { title: "Tourist Guide in English", description: "Guide complet en anglais", filename: "larache-guide-en.pdf", flag: "🇬🇧", size: "2.1 MB" },
        { title: "Guide Touristique en Français", description: "Guide complet en Français", filename: "larache-guide-fr.pdf", flag: "🇫🇷", size: "2.1 MB" },
        { title: "Guía Turística en Español", description: "Guide complet en espagnol", filename: "larache-guide-es.pdf", flag: "🇪🇸", size: "2.1 MB" }
      ]
    },
    es: {
      title: "Guías Turísticas Descargables",
      subtitle: "Descarga guías turísticas gratuitas para explorar Larache de la mejor manera",
      guides: [
        { title: "الدليل السياحي باللغة العربية", description: "Guía completa en árabe", filename: "larache-guide-ar.pdf", flag: "🇲🇦", size: "2.1 MB" },
        { title: "Tourist Guide in English", description: "Guía completa en inglés", filename: "larache-guide-en.pdf", flag: "🇬🇧", size: "2.1 MB" },
        { title: "Guide Touristique en Français", description: "Guía completa en francés", filename: "larache-guide-fr.pdf", flag: "🇫🇷", size: "2.1 MB" },
        { title: "Guía Turística en Español", description: "Guía completa en Español", filename: "larache-guide-es.pdf", flag: "🇪🇸", size: "2.1 MB" }
      ]
    }
  };

  const text = content[language as keyof typeof content] || content.en;

  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/guides/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
<<<<<<< HEAD
<section className="relative overflow-hidden bg-gradient-to-b from-sand/10 to-background py-24">
  {/* Subtle textured overlays */}
  <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10 mix-blend-multiply" />
  <div className="absolute inset-0 bg-[url('/topo-pattern.svg')] opacity-5" />

  <div className="container mx-auto px-4 relative z-10">
    {/* Header */}
    <div className="text-center mb-20 max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-foreground tracking-tight relative inline-block">
        {text.title}
        <span className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-terracotta via-ocean to-sand transform -skew-x-6" />
      </h2>
      <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {text.subtitle}
      </p>
    </div>

    {/* Guides Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
      {text.guides.map((guide, index) => {
        const rotations = ['-rotate-1', 'rotate-1', 'rotate-2', '-rotate-2'];
        return (
          <div
            key={index}
            className={`group ${rotations[index % rotations.length]} hover:rotate-0 transition-transform duration-300`}
          >
            <div className="flex flex-col h-full bg-card/95 backdrop-blur-md rounded-3xl shadow-xl border border-border/30 overflow-hidden">
              {/* Flag Banner */}
              <div className="relative h-32 bg-gradient-to-br from-sand/20 to-ocean/10 flex items-center justify-center">
                <div className="absolute -top-4 -right-4 w-24 h-24 rotate-12 opacity-90">
                  <div className="w-full h-full rounded-full border-4 border-background shadow-xl overflow-hidden bg-white flex items-center justify-center">
                    {guide.countryCode ? (
                      <img
                        src={`https://flagcdn.com/w160/${guide.countryCode.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w320/${guide.countryCode.toLowerCase()}.png 2x`}
                        alt={guide.country || guide.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<span class="text-4xl">🏳️</span>';
                        }}
                      />
                    ) : (
                      <span className="text-4xl">🏳️</span>
                    )}
                  </div>
                </div>
                <span className="px-4 py-2 text-lg font-semibold text-foreground/90 bg-background/60 rounded-full backdrop-blur-sm">
                  {guide.country || 'Travel Guide'}
                </span>
              </div>

              {/* Guide Details */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  {guide.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-5 flex-1 leading-relaxed">
                  {guide.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground mb-5">
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    PDF
                  </span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <span>{guide.size}</span>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(guide.filename)}
                  className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-ocean to-teal-500 py-3.5 px-4 text-white font-medium shadow-md hover:shadow-lg transition-all"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    {language === 'ar'
                      ? 'تحميل'
                      : language === 'fr'
                      ? 'Télécharger'
                      : language === 'es'
                      ? 'Descargar'
                      : 'Download'}
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>

  {/* Decorative Wave */}
  <svg
    className="absolute bottom-0 left-0 w-full h-24 pointer-events-none opacity-20"
    preserveAspectRatio="none"
  >
    <path
      d="M0,24 Q200,0 400,30 T800,10 T1200,40"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeDasharray="6 6"
      className="text-ocean"
    />
  </svg>
</section>

=======
    <section className="py-16 bg-gradient-to-b from-sand/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-terracotta to-sand rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">{text.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{text.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {text.guides.map((guide, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-ocean/20">
              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4">{guide.flag}</div>
                <CardTitle className="text-lg group-hover:text-ocean transition-colors">
                  {guide.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {guide.description}
                </p>
                <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                  <Globe className="w-4 h-4 mr-1" />
                  PDF • {guide.size}
                </div>
                <Button 
                  onClick={() => handleDownload(guide.filename)}
                  className="w-full bg-ocean hover:bg-ocean/90 text-white group-hover:scale-105 transition-transform"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {language === 'ar' ? 'تحميل' : language === 'fr' ? 'Télécharger' : language === 'es' ? 'Descargar' : 'Download'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>
    </section>
>>>>>>> f1b1bfbefdf499466fa5a95df27209f7c59ea955
  );
};

export default GuidesSection;
