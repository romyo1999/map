import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, Globe, ChevronRight } from "lucide-react";

interface GuidesSectionProps {
  language: string;
}

interface Guide {
  title: string;
  description: string;
  filename: string;
  flag: string;
  size: string;
}

interface LanguageContent {
  title: string;
  subtitle: string;
  guides: Guide[];
}

const GuidesSection = ({ language }: GuidesSectionProps) => {
  const content: Record<string, LanguageContent> = {
    ar: {
      title: "أدلة سياحية للتحميل",
      subtitle: "اكتشف العرائش من خلال أدلة شاملة ومصممة بعناية",
      guides: [
        { 
          title: "الدليل السياحي باللغة العربية", 
          description: "دليل شامل للمعالم التاريخية والثقافية في العرائش", 
          filename: "larache-guide-ar.pdf", 
          flag: "🇲🇦", 
          size: "2.1 MB" 
        },
        { 
          title: "Tourist Guide in English", 
          description: "Complete guide to Larache's historical and cultural landmarks", 
          filename: "larache-guide-en.pdf", 
          flag: "🇬🇧", 
          size: "2.1 MB" 
        },
        { 
          title: "Guide Touristique en Français", 
          description: "Guide complet des monuments historiques et culturels de Larache", 
          filename: "larache-guide-fr.pdf", 
          flag: "🇫🇷", 
          size: "2.1 MB" 
        },
        { 
          title: "Guía Turística en Español", 
          description: "Guía completa de los monumentos históricos y culturales de Larache", 
          filename: "larache-guide-es.pdf", 
          flag: "🇪🇸", 
          size: "2.1 MB" 
        }
      ]
    },
    en: {
      title: "Downloadable Tourist Guides",
      subtitle: "Discover Larache through comprehensive and carefully designed guides",
      guides: [
        { 
          title: "Arabic Tourist Guide", 
          description: "Complete guide in Arabic", 
          filename: "larache-guide-ar.pdf", 
          flag: "🇲🇦", 
          size: "2.1 MB" 
        },
        { 
          title: "English Tourist Guide", 
          description: "Complete guide to Larache's historical and cultural landmarks", 
          filename: "larache-guide-en.pdf", 
          flag: "🇬🇧", 
          size: "2.1 MB" 
        },
        { 
          title: "French Tourist Guide", 
          description: "Complete guide in French", 
          filename: "larache-guide-fr.pdf", 
          flag: "🇫🇷", 
          size: "2.1 MB" 
        },
        { 
          title: "Spanish Tourist Guide", 
          description: "Complete guide in Spanish", 
          filename: "larache-guide-es.pdf", 
          flag: "🇪🇸", 
          size: "2.1 MB" 
        }
      ]
    },
    fr: {
      title: "Guides Touristiques Téléchargeables",
      subtitle: "Découvrez Larache à travers des guides complets et soigneusement conçus",
      guides: [
        { 
          title: "Guide Touristique en Arabe", 
          description: "Guide complet en arabe", 
          filename: "larache-guide-ar.pdf", 
          flag: "🇲🇦", 
          size: "2.1 MB" 
        },
        { 
          title: "Guide Touristique en Anglais", 
          description: "Guide complet en anglais", 
          filename: "larache-guide-en.pdf", 
          flag: "🇬🇧", 
          size: "2.1 MB" 
        },
        { 
          title: "Guide Touristique en Français", 
          description: "Guide complet en français", 
          filename: "larache-guide-fr.pdf", 
          flag: "🇫🇷", 
          size: "2.1 MB" 
        },
        { 
          title: "Guide Touristique en Espagnol", 
          description: "Guide complet en espagnol", 
          filename: "larache-guide-es.pdf", 
          flag: "🇪🇸", 
          size: "2.1 MB" 
        }
      ]
    },
    es: {
      title: "Guías Turísticas Descargables",
      subtitle: "Descubre Larache a través de guías completas y cuidadosamente diseñadas",
      guides: [
        { 
          title: "Guía Turística en Árabe", 
          description: "Guía completa en árabe", 
          filename: "larache-guide-ar.pdf", 
          flag: "🇲🇦", 
          size: "2.1 MB" 
        },
        { 
          title: "Guía Turística en Inglés", 
          description: "Guía completa en inglés", 
          filename: "larache-guide-en.pdf", 
          flag: "🇬🇧", 
          size: "2.1 MB" 
        },
        { 
          title: "Guía Turística en Francés", 
          description: "Guía completa en francés", 
          filename: "larache-guide-fr.pdf", 
          flag: "🇫🇷", 
          size: "2.1 MB" 
        },
        { 
          title: "Guía Turística en Español", 
          description: "Guía completa en español", 
          filename: "larache-guide-es.pdf", 
          flag: "🇪🇸", 
          size: "2.1 MB" 
        }
      ]
    }
  };

  const currentContent = content[language] || content.en;
  const isRTL = language === 'ar';

  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/guides/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getButtonText = () => {
    const buttonTexts = {
      ar: 'تحميل الدليل',
      fr: 'Télécharger',
      es: 'Descargar',
      en: 'Download Guide'
    };
    return buttonTexts[language as keyof typeof buttonTexts] || buttonTexts.en;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <FileText className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            {currentContent.title}
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mb-6 rounded-full"></div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {currentContent.guides.map((guide, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-gray-800 flex flex-col h-full"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="absolute inset-[1px] bg-white dark:bg-gray-800 rounded-xl transition-all duration-500" />
              
              {/* Card Content - Flex column to ensure button stays at bottom */}
              <CardContent className="relative p-6 flex flex-col h-full">
                {/* Flag - Fixed height area */}
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 h-20 flex items-center justify-center">
                  <div className="text-6xl">{guide.flag}</div>
                </div>

                {/* Title - Fixed height for 2 lines */}
                <div className="min-h-[4rem] mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 text-center">
                    {guide.title}
                  </h3>
                </div>

                {/* Description - Fixed height for 3 lines */}
                <div className="min-h-[4.5rem] mb-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 text-center">
                    {guide.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-12 h-px bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mb-6"></div>

                {/* Meta Info - Fixed height */}
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 min-h-[1.75rem]">
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>PDF</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div>{guide.size}</div>
                </div>

                {/* Download Button - Always at bottom with margin-top auto */}
                <div className="mt-auto">
                  <Button 
                    onClick={() => handleDownload(guide.filename)}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all duration-300 group/btn"
                  >
                    <Download className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                    {getButtonText()}
                    <ChevronRight className={`w-4 h-4 ml-2 opacity-0 group-hover/btn:opacity-100 transition-all duration-300 ${isRTL ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info Banner */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 dark:bg-blue-950/30 rounded-full border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">💡 {language === 'ar' ? 'نصيحة:' : language === 'fr' ? 'Conseil :' : language === 'es' ? 'Consejo:' : 'Tip:'}</span>
              <span>
                {language === 'ar' 
                  ? 'جميع الأدلة مجانية ويمكن استخدامها دون اتصال بالإنترنت' 
                  : language === 'fr'
                  ? 'Tous les guides sont gratuits et peuvent être utilisés hors ligne'
                  : language === 'es'
                  ? 'Todas las guías son gratuitas y se pueden usar sin conexión'
                  : 'All guides are free and can be used offline'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;