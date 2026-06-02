import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TouristMap from '@/components/TouristMap';
import GuidesSection from '@/components/GuidesSection';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={setCurrentLanguage} 
      />
      <HeroSection language={currentLanguage} />
      <TouristMap language={currentLanguage} />
      <GuidesSection language={currentLanguage} />
      
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
          {currentLanguage === 'ar' ? '© 2024 العرائش للسياحة. جميع الحقوق محفوظة.' :
             currentLanguage === 'fr' ? '© 2024 Larache Tourisme. Tous droits réservés.' :
             currentLanguage === 'es' ? '© 2024 Turismo de Larache. Todos los derechos reservados.' :
             '© 2024 Larache Tourism. All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
