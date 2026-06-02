import heroImage from "@/assets/larache-hero.jpg";

interface HeroSectionProps {
  language: string;
}

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  top: `${(i * 8) % 100}%`,
  left: `${(i * 13) % 100}%`,
  duration: `${3 + (i % 3)}s`,
}));

export default function HeroSection({
  language,
}: HeroSectionProps) {
  const content = {
    ar: {
      title: "اكتشف العرائش - لؤلؤة المغرب",
      subtitle:
        "مدينة ساحلية ساحرة تجمع بين التاريخ والثقافة والطبيعة الخلابة",
      cta: "استكشف الخريطة السياحية",
      scroll: "مرر للأسفل",
    },
    en: {
      title: "Discover Larache - Morocco's Pearl",
      subtitle:
        "A charming coastal city where history, culture and stunning nature meet",
      cta: "Explore Tourist Map",
      scroll: "Scroll Down",
    },
    fr: {
      title: "Découvrez Larache - La Perle du Maroc",
      subtitle:
        "Une charmante ville côtière où se rencontrent histoire, culture et nature magnifique",
      cta: "Explorer la Carte Touristique",
      scroll: "Faire défiler",
    },
    es: {
      title: "Descubre Larache - La Perla de Marruecos",
      subtitle:
        "Una encantadora ciudad costera donde se encuentran historia, cultura y naturaleza impresionante",
      cta: "Explorar el Mapa Turístico",
      scroll: "Desplázate hacia abajo",
    },
  };

  const text =
    content[language as keyof typeof content] || content.en;

  const scrollToMap = () => {
    document
      .getElementById("map-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-ocean/80 via-ocean/60 to-transparent">
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="absolute w-1.5 h-1.5 rounded-full bg-white/30 animate-float"
              style={{
                top: particle.top,
                left: particle.left,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-2xl">
          {text.title}
        </h1>

        <p className="text-base sm:text-xl md:text-2xl mb-8 opacity-90 drop-shadow-lg">
          {text.subtitle}
        </p>

        <button
          onClick={scrollToMap}
          className="relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-terracotta hover:bg-terracotta/90 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          {text.cta}
        </button>

        <div className="mt-12 animate-bounce text-white/70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>

          <p className="mt-2 text-sm">
            {text.scroll}
          </p>
        </div>
      </div>

      {/* Decorative Blurs */}
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-ocean/20 blur-3xl" />
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-terracotta/20 blur-2xl" />
    </section>
  );
}