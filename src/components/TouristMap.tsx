import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface TouristMapProps {
  language: string;
}

interface Spot {
  name: string;
  nameAr: string;
  nameFr: string;
  nameEs: string;
  desc: string;
  descAr: string;
  descFr: string;
  descEs: string;
  lat: number;
  lng: number;
  type: string;
  typeAr: string;
  typeFr: string;
  typeEs: string;
}

const allSpots: Spot[] = [
  { name: "Porte de la Kasbah", nameAr: "باب القصبة", nameFr: "Porte de la Kasbah", nameEs: "Puerta de la Kasbah", desc: "Historic entrance offering panoramic views over old Medina", descAr: "مدخل تاريخي يوفر إطلالات بانورامية على المدينة القديمة", descFr: "Entrée historique offrant des vues panoramiques sur l'ancienne Médina", descEs: "Entrada histórica con vistas panorámicas sobre la antigua Medina", lat: 35.1940, lng: -6.1560, type: "Historical", typeAr: "تاريخي", typeFr: "Historique", typeEs: "Histórico" },
  { name: "Hôtel de la Monnaie", nameAr: "دار السكة", nameFr: "Hôtel de la Monnaie", nameEs: "Casa de la Moneda", desc: "Former mint reflecting Larache's rich historical economic heritage", descAr: "دار سكة سابقة تعكس التراث الاقتصادي التاريخي الغني للعرائش", descFr: "Ancienne monnaie reflétant le riche patrimoine économique historique de Larache", descEs: "Antigua casa de moneda que refleja el rico patrimonio económico histórico de Larache", lat: 35.1935, lng: -6.1550, type: "Historical", typeAr: "تاريخي", typeFr: "Historique", typeEs: "Histórico" },
  { name: "Mausolée de Sidi Abdelkrim", nameAr: "ضريح سيدي عبد الكريم", nameFr: "Mausolée de Sidi Abdelkrim", nameEs: "Mausoleo de Sidi Abdelkrim", desc: "Spiritual site blending history, faith, and local traditions", descAr: "موقع روحاني يجمع بين التاريخ والإيمان والتقاليد المحلية", descFr: "Site spirituel mêlant histoire, foi et traditions locales", descEs: "Sitio espiritual que mezcla historia, fe y tradiciones locales", lat: 35.1925, lng: -6.1530, type: "Cultural", typeAr: "ثقافي", typeFr: "Culturel", typeEs: "Cultural" },
  { name: "Borj Al Yahoudi", nameAr: "برج اليهودي", nameFr: "Borj Al Yahoudi", nameEs: "Borj Al Yahoudi", desc: "Coastal defensive tower with stunning ocean viewpoints", descAr: "برج دفاعي ساحلي بإطلالات خلابة على المحيط", descFr: "Tour défensive côtière avec de superbes vues sur l'océan", descEs: "Torre defensiva costera con impresionantes vistas al océano", lat: 35.1950, lng: -6.1580, type: "Historical", typeAr: "تاريخي", typeFr: "Historique", typeEs: "Histórico" },
  { name: "Château fort des Cigognes", nameAr: "قلعة اللقالق", nameFr: "Château fort des Cigognes", nameEs: "Castillo de las Cigüeñas", desc: "Iconic fortress famous for nesting storks and sea views", descAr: "قلعة شهيرة بأعشاش اللقالق وإطلالات البحر", descFr: "Forteresse emblématique célèbre pour ses cigognes et vues sur la mer", descEs: "Fortaleza icónica famosa por sus cigüeñas y vistas al mar", lat: 35.1960, lng: -6.1590, type: "Historical", typeAr: "تاريخي", typeFr: "Historique", typeEs: "Histórico" },
  { name: "Petit Souk", nameAr: "السوق الصغير", nameFr: "Petit Souk", nameEs: "Pequeño Zoco", desc: "Authentic market alive with colors, crafts, and local atmosphere", descAr: "سوق أصيل مليء بالألوان والحرف والأجواء المحلية", descFr: "Marché authentique vivant de couleurs, d'artisanat et d'ambiance locale", descEs: "Mercado auténtico lleno de colores, artesanía y ambiente local", lat: 35.1930, lng: -6.1540, type: "Cultural", typeAr: "ثقافي", typeFr: "Culturel", typeEs: "Cultural" },
  { name: "Grande Mosquée et Médersa", nameAr: "المسجد الأعظم والمدرسة", nameFr: "Grande Mosquée et Médersa", nameEs: "Gran Mezquita y Madrasa", desc: "Religious complex showcasing traditional Moroccan architecture and learning", descAr: "مجمع ديني يعرض العمارة المغربية التقليدية والتعليم", descFr: "Complexe religieux mettant en valeur l'architecture marocaine traditionnelle", descEs: "Complejo religioso que muestra la arquitectura marroquí tradicional", lat: 35.1938, lng: -6.1545, type: "Cultural", typeAr: "ثقافي", typeFr: "Culturel", typeEs: "Cultural" },
  { name: "Porte de la Mer", nameAr: "باب البحر", nameFr: "Porte de la Mer", nameEs: "Puerta del Mar", desc: "Historic sea gate connecting Medina to Atlantic history", descAr: "باب البحر التاريخي يربط المدينة بتاريخ الأطلسي", descFr: "Porte historique reliant la Médina à l'histoire atlantique", descEs: "Puerta histórica que conecta la Medina con la historia atlántica", lat: 35.1945, lng: -6.1575, type: "Historical", typeAr: "تاريخي", typeFr: "Historique", typeEs: "Histórico" },
  { name: "Consulat Espagnol", nameAr: "القنصلية الإسبانية", nameFr: "Consulat Espagnol", nameEs: "Consulado Español", desc: "Colonial-era building symbolizing Spanish influence in Larache", descAr: "مبنى من الحقبة الاستعمارية يرمز للتأثير الإسباني في العرائش", descFr: "Bâtiment colonial symbolisant l'influence espagnole à Larache", descEs: "Edificio colonial que simboliza la influencia española en Larache", lat: 35.1920, lng: -6.1520, type: "Historical", typeAr: "تاريخي", typeFr: "Historique", typeEs: "Histórico" },
  { name: "Église San José", nameAr: "كنيسة سان خوسيه", nameFr: "Église San José", nameEs: "Iglesia San José", desc: "Beautiful historic church reflecting multicultural heritage of the city", descAr: "كنيسة تاريخية جميلة تعكس التراث متعدد الثقافات للمدينة", descFr: "Belle église historique reflétant le patrimoine multiculturel de la ville", descEs: "Hermosa iglesia histórica que refleja el patrimonio multicultural de la ciudad", lat: 35.1915, lng: -6.1510, type: "Cultural", typeAr: "ثقافي", typeFr: "Culturel", typeEs: "Cultural" },
  { name: "Place de la Libération", nameAr: "ساحة التحرير", nameFr: "Place de la Libération", nameEs: "Plaza de la Liberación", desc: "Vibrant square surrounded by colonial architecture and cafes", descAr: "ساحة نابضة بالحياة محاطة بعمارة استعمارية ومقاهي", descFr: "Place animée entourée d'architecture coloniale et de cafés", descEs: "Plaza vibrante rodeada de arquitectura colonial y cafés", lat: 35.1918, lng: -6.1505, type: "Cultural", typeAr: "ثقافي", typeFr: "Culturel", typeEs: "Cultural" },
  { name: "Église Notre-Dame du Pilar", nameAr: "كنيسة سيدة البيلار", nameFr: "Église Notre-Dame du Pilar", nameEs: "Iglesia Nuestra Señora del Pilar", desc: "Elegant church blending European style with Moroccan surroundings", descAr: "كنيسة أنيقة تمزج بين الطراز الأوروبي والمحيط المغربي", descFr: "Église élégante mêlant style européen et environnement marocain", descEs: "Elegante iglesia que mezcla el estilo europeo con el entorno marroquí", lat: 35.1912, lng: -6.1500, type: "Cultural", typeAr: "ثقافي", typeFr: "Culturel", typeEs: "Cultural" },
  { name: "Jardin des Lions", nameAr: "حديقة الأسود", nameFr: "Jardin des Lions", nameEs: "Jardín de los Leones", desc: "Peaceful garden ideal for relaxing walks and photography", descAr: "حديقة هادئة مثالية للتنزه والتصوير", descFr: "Jardin paisible idéal pour des promenades relaxantes et la photographie", descEs: "Jardín tranquilo ideal para paseos relajantes y fotografía", lat: 35.1908, lng: -6.1490, type: "Natural", typeAr: "طبيعي", typeFr: "Naturel", typeEs: "Natural" },
  { name: "Institut Cervantes", nameAr: "معهد ثربانتيس", nameFr: "Institut Cervantes", nameEs: "Instituto Cervantes", desc: "Cultural center celebrating Spanish heritage and artistic exchanges", descAr: "مركز ثقافي يحتفي بالتراث الإسباني والتبادلات الفنية", descFr: "Centre culturel célébrant le patrimoine espagnol et les échanges artistiques", descEs: "Centro cultural que celebra el patrimonio español y los intercambios artísticos", lat: 35.1922, lng: -6.1515, type: "Cultural", typeAr: "ثقافي", typeFr: "Culturel", typeEs: "Cultural" },
  { name: "Maison Jean Genet", nameAr: "بيت جان جينيه", nameFr: "Maison Jean Genet", nameEs: "Casa Jean Genet", desc: "Literary landmark linked to famous French writer's life", descAr: "معلم أدبي مرتبط بحياة الكاتب الفرنسي الشهير", descFr: "Lieu littéraire lié à la vie du célèbre écrivain français", descEs: "Lugar literario vinculado a la vida del famoso escritor francés", lat: 35.1928, lng: -6.1535, type: "Cultural", typeAr: "ثقافي", typeFr: "Culturel", typeEs: "Cultural" },
  { name: "Corniche Balcon Atlantique", nameAr: "كورنيش شرفة الأطلسي", nameFr: "Corniche Balcon Atlantique", nameEs: "Cornisa Balcón Atlántico", desc: "Scenic promenade offering breathtaking Atlantic Ocean panoramas", descAr: "ممشى خلاب يوفر إطلالات رائعة على المحيط الأطلسي", descFr: "Promenade panoramique offrant des vues époustouflantes sur l'Atlantique", descEs: "Paseo panorámico con impresionantes vistas al Océano Atlántico", lat: 35.1955, lng: -6.1600, type: "Natural", typeAr: "طبيعي", typeFr: "Naturel", typeEs: "Natural" },
  { name: "Marché Central", nameAr: "السوق المركزي", nameFr: "Marché Central", nameEs: "Mercado Central", desc: "Lively marketplace showcasing fresh products and daily local life", descAr: "سوق نشط يعرض منتجات طازجة والحياة اليومية المحلية", descFr: "Marché animé présentant des produits frais et la vie locale quotidienne", descEs: "Mercado animado con productos frescos y vida local cotidiana", lat: 35.1910, lng: -6.1495, type: "Cultural", typeAr: "ثقافي", typeFr: "Culturel", typeEs: "Cultural" },
  { name: "Cimetière Espagnol", nameAr: "المقبرة الإسبانية", nameFr: "Cimetière Espagnol", nameEs: "Cementerio Español", desc: "Historic cemetery featuring graves of renowned international figures", descAr: "مقبرة تاريخية تضم قبور شخصيات دولية شهيرة", descFr: "Cimetière historique abritant des tombes de figures internationales renommées", descEs: "Cementerio histórico con tumbas de figuras internacionales renombradas", lat: 35.1900, lng: -6.1480, type: "Historical", typeAr: "تاريخي", typeFr: "Historique", typeEs: "Histórico" },
  { name: "Port Maritime", nameAr: "الميناء البحري", nameFr: "Port Maritime", nameEs: "Puerto Marítimo", desc: "Active harbor combining fishing traditions and coastal scenery", descAr: "ميناء نشط يجمع بين تقاليد الصيد والمناظر الساحلية", descFr: "Port actif combinant traditions de pêche et paysages côtiers", descEs: "Puerto activo que combina tradiciones pesqueras y paisajes costeros", lat: 35.1965, lng: -6.1610, type: "Natural", typeAr: "طبيعي", typeFr: "Naturel", typeEs: "Natural" },
];

function getRandomSpots(count: number): Spot[] {
  const shuffled = [...allSpots].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const TouristMap = ({ language }: TouristMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [randomSpots] = useState(() => getRandomSpots(5));

  const spots = randomSpots.map(s => ({
    name: language === 'ar' ? s.nameAr : language === 'fr' ? s.nameFr : language === 'es' ? s.nameEs : s.name,
    description: language === 'ar' ? s.descAr : language === 'fr' ? s.descFr : language === 'es' ? s.descEs : s.desc,
    type: language === 'ar' ? s.typeAr : language === 'fr' ? s.typeFr : language === 'es' ? s.typeEs : s.type,
    lat: s.lat,
    lng: s.lng,
  }));

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([35.1833, -6.1500], 14);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom icon
    const customIcon = L.divIcon({
      html: `<div class="bg-ocean text-white p-2 rounded-full shadow-lg border-2 border-white"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>`,
      className: 'custom-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    // Add markers
    spots.forEach((spot) => {
      const marker = L.marker([spot.lat, spot.lng], { icon: customIcon })
        .addTo(map)
        .on('click', () => setSelectedLocation(spot));
    });

    return () => {
      map.remove();
    };
  }, [language]);

  const getTypeColor = (type: string) => {
    switch ((type ?? '').toLowerCase()) {
      case 'historical':
      case 'تاريخي':
      case 'historique':
      case 'histórico':
        return 'bg-terracotta';
      case 'cultural':
      case 'ثقافي':
      case 'culturel':
        return 'bg-ocean';
      case 'natural':
      case 'طبيعي':
      case 'naturel':
        return 'bg-sand-dark';
      default:
        return 'bg-muted';
    }
  };

  return (
<<<<<<< HEAD
<section id="map-section"  className="relative py-16 bg-gradient-to-b from-ocean/5 to-background">
  <div className="container mx-auto px-4">
    
    {/* Section Header */}
    <div className="text-center mb-12 relative">
      <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-wider relative inline-block">
        {language === 'ar' ? 'خريطة المواقع السياحية' : 
         language === 'fr' ? 'Carte des Sites Touristiques' : 
         language === 'es' ? 'Mapa de Sitios Turísticos' :
         'Tourist Sites Map'}
        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-terracotta via-ocean to-sand rounded-full animate-pulse-slow"></span>
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
        {language === 'ar' ? 'استكشف أفضل المواقع والمعالم في المدينة مع المعلومات المفصلة لكل موقع' :
         language === 'fr' ? 'Découvrez les meilleurs sites de la ville avec des informations détaillées pour chaque lieu' :
         language === 'es' ? 'Explora los mejores sitios de la ciudad con información detallada para cada lugar' :
         'Explore the best sites in the city with detailed info for each location'}
      </p>
    </div>
    
    <div className="lg:grid lg:grid-cols-3 lg:gap-8">
      
      {/* Interactive Map */}
    <div className="lg:col-span-2 relative h-full min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-ocean/20">
  
  {/* Map fills entire card */}
  <div
    ref={mapRef}
    className="absolute inset-0 w-full h-full"
  />

  {/* Floating Map Pins */}
  {spots.map((spot, index) => (
    <div
      key={index}
      className="absolute bg-ocean/80 hover:bg-terracotta/80 w-4 h-4 rounded-full shadow-lg cursor-pointer animate-bounce-slow transition-all"
      style={{
        top: `${spot.mapPosition?.top || 50}%`,
        left: `${spot.mapPosition?.left || 50}%`,
        zIndex: selectedLocation?.name === spot.name ? 20 : 10,
      }}
      onClick={() => setSelectedLocation(spot)}
      title={spot.name}
    />
  ))}
</div>

      
      {/* Featured Spots Cards */}
      <div className="mt-10 lg:mt-0 space-y-6">
        <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <MapPin className="text-ocean w-6 h-6" />
          {language === 'ar' ? 'المواقع المميزة' : 
           language === 'fr' ? 'Sites Remarquables' : 
           language === 'es' ? 'Sitios Destacados' :
           'Featured Sites'}
        </h3>

        {spots.map((spot, index) => (
          <div
            key={index}
            onClick={() => setSelectedLocation(spot)}
            className={`cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 rounded-2xl shadow-lg p-4 bg-gradient-to-tr from-white/70 to-ocean/10 border-l-4 ${
              selectedLocation?.name === spot.name ? 'border-l-ocean bg-ocean/20' : 'border-l-transparent'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(spot.type)}`}>
                {spot.type}
              </span>
              {spot.duration && <span className="text-sm text-muted-foreground">{spot.duration} min</span>}
            </div>
            
            <h4 className="font-bold text-lg text-foreground">{spot.name}</h4>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{spot.description}</p>
            
            {/* Extra Info */}
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
              {spot.openingHours && <span>⏰ {spot.openingHours}</span>}
              {spot.entryFee && <span>💰 {spot.entryFee}</span>}
              {spot.tip && <span>💡 {spot.tip}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Selected Location Details */}
    {selectedLocation && (
      <div className="mt-10 relative">
        <Card className="border-ocean/30 bg-ocean/10 shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Info className="text-ocean w-6 h-6" />
                <h3 className="text-xl font-semibold">{selectedLocation.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getTypeColor(selectedLocation.type)}`}>
                  {selectedLocation.type}
                </span>
              </div>
              
              {selectedLocation.coordinates && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.coordinates.lat},${selectedLocation.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean font-medium hover:underline text-sm"
                >
                  {language === 'ar' ? 'الاتجاهات' : language === 'fr' ? 'Itinéraire' : language === 'es' ? 'Dirección' : 'Get Directions'}
                </a>
              )}
            </div>
            
            <p className="text-muted-foreground mb-3">{selectedLocation.description}</p>

            {/* Extra Tourist Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {selectedLocation.openingHours && <div>⏰ {selectedLocation.openingHours}</div>}
              {selectedLocation.entryFee && <div>💰 {selectedLocation.entryFee}</div>}
              {selectedLocation.tip && <div>💡 {selectedLocation.tip}</div>}
              {selectedLocation.website && (
                <a href={selectedLocation.website} target="_blank" className="text-ocean hover:underline">
                  🔗 {language === 'ar' ? 'الموقع الرسمي' : language === 'fr' ? 'Site officiel' : language === 'es' ? 'Sitio oficial' : 'Official Website'}
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Decorative floating shapes */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-terracotta/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-ocean/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>
    )}
  </div>
</section>



=======
    <section id="map-section" className="py-16 bg-gradient-to-b from-background to-sand/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'خريطة المواقع السياحية' : 
             language === 'fr' ? 'Carte des Sites Touristiques' : 
             language === 'es' ? 'Mapa de Sitios Turísticos' :
             'Tourist Sites Map'}
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-xl">
              <div ref={mapRef} className="h-[500px] w-full" />
            </Card>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
              <MapPin className="mr-2 text-ocean" />
              {language === 'ar' ? 'المواقع المميزة' : 
               language === 'fr' ? 'Sites Remarquables' : 
               language === 'es' ? 'Sitios Destacados' :
               'Featured Sites'}
            </h3>
            
            {spots.map((spot, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4 ${
                  selectedLocation?.name === spot.name ? 'border-l-ocean bg-ocean/5' : 'border-l-transparent'
                }`}
                onClick={() => setSelectedLocation(spot)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs text-white ${getTypeColor(spot.type)}`}>
                      {spot.type}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground mt-2">{spot.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{spot.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {selectedLocation && (
          <Card className="mt-8 border-ocean/20 bg-ocean/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Info className="text-ocean w-6 h-6" />
                <h3 className="text-xl font-semibold">{selectedLocation.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm text-white ${getTypeColor(selectedLocation.type)}`}>
                  {selectedLocation.type}
                </span>
              </div>
              <p className="text-muted-foreground">{selectedLocation.description}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
>>>>>>> f1b1bfbefdf499466fa5a95df27209f7c59ea955
  );
};

export default TouristMap;