import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const languages = [
  { code: "ar", name: "العربية", flag: "🇲🇦" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export default function Header({
  currentLanguage,
  onLanguageChange,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-ocean to-ocean-light flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
              <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>

            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-terracotta opacity-70" />
          </div>

          <div>
            <h1 className="text-lg md:text-2xl font-bold font-serif text-foreground">
              Larache Tourism
            </h1>

            <p className="hidden sm:block text-xs md:text-sm italic text-muted-foreground">
              Discover Morocco's Pearl
            </p>
          </div>
        </div>

        {/* Desktop Languages */}
        <div className="hidden md:flex items-center gap-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              size="sm"
              variant={
                currentLanguage === lang.code ? "default" : "outline"
              }
              onClick={() => onLanguageChange(lang.code)}
              className={`min-w-[100px] transition-all duration-300 ${
                currentLanguage === lang.code
                  ? "bg-ocean hover:bg-ocean/90 text-white shadow-md"
                  : "hover:bg-ocean/5 hover:border-ocean/50"
              }`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </Button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden w-10 h-10 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors flex items-center justify-center"
        >
          {menuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-border/50 bg-card/90 backdrop-blur-md px-4 py-3 space-y-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              size="sm"
              variant={
                currentLanguage === lang.code ? "default" : "outline"
              }
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
              <span className="mr-2 text-lg">{lang.flag}</span>
              {lang.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-ocean/20 to-transparent" />
    </header>
  );
}