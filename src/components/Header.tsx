import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const Header = ({ currentLanguage, onLanguageChange }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  return (
<<<<<<< HEAD
<header className="sticky top-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border/50 shadow-sm">
  <div className="container mx-auto px-4 py-3 flex items-center justify-between">
    {/* Logo and brand */}
    <div className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-ocean to-ocean-light rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-300">
          <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        {/* Tiny decorative wave */}
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-terracotta rounded-full opacity-70" />
      </div>
      <div>
        <h1 className="text-lg md:text-2xl font-bold text-foreground leading-tight font-serif">
          Larache Tourism
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground hidden sm:block italic">
          Discover Morocco's Pearl
        </p>
      </div>
    </div>

    {/* Desktop language switcher */}
    <div className="hidden md:flex items-center space-x-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => onLanguageChange(lang.code)}
          className={`
            relative overflow-hidden transition-all duration-300 min-w-[100px]
            ${
              currentLanguage === lang.code
                ? "bg-ocean hover:bg-ocean/90 text-white shadow-md"
                : "border-border/60 hover:border-ocean/50 hover:bg-ocean/5"
            }
          `}
        >
          {/* Subtle flag emoji animation on hover */}
          <span className="mr-2 inline-block transition-transform group-hover:scale-110">
            {lang.flag}
          </span>
          {lang.name}
          {currentLanguage === lang.code && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta to-sand" />
          )}
        </Button>
      ))}
    </div>

    {/* Mobile hamburger */}
    <button
      className="md:hidden relative w-10 h-10 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors flex items-center justify-center"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle menu"
    >
      {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    </button>
  </div>

  {/* Mobile menu with smooth animation */}
  <div
    className={`
      md:hidden overflow-hidden transition-all duration-300 ease-in-out
      ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
    `}
  >
    <div className="border-t border-border/50 bg-card/90 backdrop-blur-md px-4 py-3 space-y-2 shadow-inner">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? "default" : "outline"}
          size="sm"
          onClick={() => {
            onLanguageChange(lang.code);
            setMenuOpen(false);
          }}
          className={`
            w-full justify-start transition-all
            ${
              currentLanguage === lang.code
                ? "bg-ocean hover:bg-ocean/90 text-white"
                : "hover:bg-ocean/10 border-border/60"
            }
          `}
        >
          <span className="mr-2 text-lg">{lang.flag}</span>
          {lang.name}
        </Button>
      ))}
    </div>
  </div>

  {/* Optional: very subtle wave line at bottom of header */}
  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-ocean/20 to-transparent" />
</header>

=======
    <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-ocean to-ocean-light rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-base md:text-xl font-bold text-foreground leading-tight">Larache Tourism</h1>
            <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">Discover Morocco's Pearl</p>
          </div>
        </div>

        {/* Desktop language buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={currentLanguage === lang.code ? "default" : "outline"}
              size="sm"
              onClick={() => onLanguageChange(lang.code)}
              className={`min-w-[100px] ${
                currentLanguage === lang.code
                  ? "bg-ocean hover:bg-ocean/90 text-white"
                  : "hover:bg-ocean/10"
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </Button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-md px-4 py-3 space-y-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={currentLanguage === lang.code ? "default" : "outline"}
              size="sm"
              onClick={() => {
                onLanguageChange(lang.code);
                setMenuOpen(false);
              }}
              className={`w-full justify-start ${
                currentLanguage === lang.code
                  ? "bg-ocean hover:bg-ocean/90 text-white"
                  : "hover:bg-ocean/10"
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </Button>
          ))}
        </div>
      )}
    </header>
>>>>>>> f1b1bfbefdf499466fa5a95df27209f7c59ea955
  );
};

export default Header;
