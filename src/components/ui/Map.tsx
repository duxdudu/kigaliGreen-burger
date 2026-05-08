import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Phone, Clock, ExternalLink, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
// @ts-ignore
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// @ts-ignore
import markerIcon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  phone: string;
  hours: string;
}

const KIGALI_LOCATIONS: Location[] = [
  {
    id: 'nyarutarama',
    name: 'Nyarutarama Flagship',
    lat: -1.9441,
    lng: 30.1035,
    address: 'MTN Center Rd, Nyarutarama, Kigali',
    phone: '0786885185',
    hours: 'Open 24/7'
  },
  {
    id: 'kimironko',
    name: 'Kimironko Express',
    lat: -1.9366,
    lng: 30.1264,
    address: 'KG 11 Ave, near Market, Kigali',
    phone: '0786885185',
    hours: '08:00 - 04:00'
  },
  {
    id: 'kiyovu',
    name: 'Kiyovu Gourmet',
    lat: -1.9482,
    lng: 30.0594,
    address: 'KN 31 St, Kiyovu, Kigali',
    phone: '0786885185',
    hours: '10:00 - 02:00'
  }
];

export function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Custom Marker Icon
  const brandIcon = useMemo(() => L.divIcon({
    html: `<div class="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center border-2 border-white shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }), []);

  return (
    <div className="w-full h-[600px] rounded-[48px] overflow-hidden border-8 border-white relative shadow-2xl z-0">
      <MapContainer 
        center={[-1.9441, 30.1035]} 
        zoom={13} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={isDarkMode ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />

        {KIGALI_LOCATIONS.map((loc) => (
          <Marker 
            key={loc.id} 
            position={[loc.lat, loc.lng]} 
            icon={brandIcon}
            eventHandlers={{
              click: () => {
                setSelectedLocation(loc);
              },
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2">
                <h4 className="font-black uppercase text-xs text-brand-red mb-1">{loc.name}</h4>
                <p className="text-[8px] font-bold text-black/40 uppercase">{loc.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute top-8 right-8 z-[1000]">
         <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-brand-red hover:text-white transition-all text-black/40 border border-black/5"
         >
           <Navigation className="w-6 h-6" />
         </button>
      </div>

      {/* Floating Info Overlay */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-8 right-8 lg:left-auto lg:right-8 lg:w-80 bg-white p-10 rounded-[48px] border border-black/5 shadow-2xl z-[1000]"
          >
            <div className="flex justify-between items-start mb-6">
              <h4 className="text-xl font-black uppercase text-brand-red leading-tight">{selectedLocation.name}</h4>
              <button onClick={() => setSelectedLocation(null)} className="text-black/10 hover:text-brand-red transition-colors">
                <MapPin className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
               <div className="flex items-start gap-3 text-black/40 text-[10px] font-black uppercase tracking-widest">
                  <MapPin className="w-4 h-4 mt-0.5 text-brand-red" />
                  <span className="leading-relaxed">{selectedLocation.address}</span>
               </div>
               <div className="flex items-center gap-3 text-black/40 text-[10px] font-black uppercase tracking-widest">
                  <Phone className="w-4 h-4 text-brand-yellow" />
                  <span>{selectedLocation.phone}</span>
               </div>
               <div className="flex items-center gap-3 text-black/40 text-[10px] font-black uppercase tracking-widest">
                  <Clock className="w-4 h-4 text-brand-red" />
                  <span>{selectedLocation.hours}</span>
               </div>
            </div>
            <button className="w-full mt-10 py-5 bg-brand-red text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-brand-red/90 transition-all shadow-xl shadow-brand-red/20">
              Get Directions <ExternalLink className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
