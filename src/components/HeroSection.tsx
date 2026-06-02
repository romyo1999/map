import heroImage from "@/assets/larache-hero.jpg";

interface HeroSectionProps {
  language: string;
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const content = {
    ar: {
      title: "اكتشف العرائش - لؤلؤة المغرب",
      subtitle: "مدينة ساحلية ساحرة تجمع بين التاريخ والثقافة والطبيعة الخلابة",
      cta: "استكشف الخريطة السياحية"
    },
    en: {
      title: "Discover Larache - Morocco's Pearl",
      subtitle: "A charming coastal city where history, culture and stunning nature meet",
      cta: "Explore Tourist Map"
    },
    fr: {
      title: "Découvrez Larache - La Perle du Maroc", 
      subtitle: "Une charmante ville côtière où se rencontrent histoire, culture et nature magnifique",
      cta: "Explorer la Carte Touristique"
    },
    es: {
      title: "Descubre Larache - La Perla de Marruecos",
      subtitle: "Una encantadora ciudad costera donde se encuentran historia, cultura y naturaleza impresionante",
      cta: "Explorar el Mapa Turístico"
    }
  };

  const text = content[language as keyof typeof content] || content.en;

  return (
<<<<<<< HEAD
    <section className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
  {/* Background image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-zoom-slow"
    style={{ backgroundImage: `url(${heroImage})` }}
  />

  {/* Gradient overlay + subtle animated particles */}
  <div className="absolute inset-0 bg-gradient-to-r from-ocean/80 via-ocean/60 to-transparent">
    {/* Optional floating sparkles */}
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className={`absolute bg-white/30 rounded-full w-1.5 h-1.5 animate-float`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  </div>

  {/* Hero content */}
  <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 md:mb-6 drop-shadow-2xl tracking-tight">
      {text.title}
    </h1>
    <p className="text-base sm:text-xl md:text-2xl mb-6 md:mb-8 opacity-90 drop-shadow-lg">
      {text.subtitle}
    </p>

    {/* CTA Button with extra flair */}
    <button 
      onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
      className="relative inline-flex items-center justify-center bg-terracotta hover:bg-terracotta/90 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-terracotta to-red-500 opacity-20 animate-pulse rounded-full"></span>
      <span className="relative z-10">{text.cta}</span>
      <span className="absolute -right-6 w-6 h-6 bg-white/20 rounded-full animate-bounce-slow"></span>
      <span className="absolute -left-6 w-6 h-6 bg-white/20 rounded-full animate-bounce-slow"></span>
    </button>

    {/* Optional arrow hint */}
    <div className="mt-12 animate-bounce text-white/70">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
      <p className="text-sm mt-2 opacity-80">Scroll down</p>
    </div>
  </div>

  {/* Optional decorative shapes */}
  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-ocean to-ocean-light rounded-full opacity-20 animate-pulse-slow blur-3xl" />
  <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-tr from-terracotta to-yellow-400 rounded-full opacity-15 animate-pulse-slow blur-2xl" />
</section>



=======
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean/80 via-ocean/60 to-transparent" />
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 drop-shadow-lg">
          {text.title}
        </h1>
        <p className="text-base sm:text-xl md:text-2xl mb-6 md:mb-8 opacity-90 drop-shadow-md">
          {text.subtitle}
        </p>
        <button 
          onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-terracotta hover:bg-terracotta/90 text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {text.cta}
        </button>
      </div>
    </section>
>>>>>>> f1b1bfbefdf499466fa5a95df27209f7c59ea955
  );
};

export default HeroSection;