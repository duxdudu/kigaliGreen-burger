import { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useAdvancedMarkerRef, InfoWindow } from '@vis.gl/react-google-maps';
import { MapPin, ExternalLink, Phone, Clock } from 'lucide-react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

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
    phone: '+250 788 123 456',
    hours: 'Open 24/7'
  },
  {
    id: 'kimironko',
    name: 'Kimironko Express',
    lat: -1.9366,
    lng: 30.1264,
    address: 'KG 11 Ave, near Kimironko Market',
    phone: '+250 788 654 321',
    hours: '08:00 - 02:00'
  },
  {
    id: 'kiyovu',
    name: 'Kiyovu Gourmet',
    lat: -1.9482,
    lng: 30.0594,
    address: 'KN 31 St, Kiyovu, Kigali',
    phone: '+250 788 987 654',
    hours: '10:00 - 00:00'
  }
];

export function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  if (!hasValidKey) {
    return (
      <div className="w-full h-[500px] bg-white/5 rounded-[40px] border border-white/10 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mb-6">
          <MapPin className="text-brand-green w-8 h-8" />
        </div>
        <h3 className="text-xl font-black uppercase mb-4 text-white">Interactive Map Ready</h3>
        <p className="text-white/40 max-w-md mb-8 italic">
          To enable live tracking and precise locations, please add your Google Maps API Key in Settings → Secrets.
        </p>
        <div className="space-y-4 text-left glass-morphism p-6 rounded-2xl border-white/5 text-xs text-white/60 leading-relaxed font-mono">
           <p><span className="text-brand-lime"># Step 1:</span> Get a key at console.cloud.google.com</p>
           <p><span className="text-brand-lime"># Step 2:</span> Add secret <span className="text-white">GOOGLE_MAPS_PLATFORM_KEY</span></p>
           <p><span className="text-brand-lime"># Step 3:</span> Experience Kigali like never before.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-[48px] overflow-hidden border-4 border-white/5 relative shadow-2xl">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={{ lat: -1.9441, lng: 30.1035 }}
          defaultZoom={13}
          mapId="AISTUDIO_KIGALI_GREENS"
          disableDefaultUI={true}
          gestureHandling="greedy"
          colorScheme="DARK"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
        >
          {KIGALI_LOCATIONS.map((loc) => (
            <MarkerWithInfoWindow 
              key={loc.id} 
              location={loc} 
              onSelect={setSelectedLocation}
              isSelected={selectedLocation?.id === loc.id}
            />
          ))}
        </Map>
      </APIProvider>

      {/* Floating Info Overlay */}
      {selectedLocation && (
        <div className="absolute bottom-8 left-8 right-8 lg:left-auto lg:right-8 lg:w-80 glass-morphism p-6 rounded-[32px] border-brand-green/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-lg font-black uppercase text-brand-green">{selectedLocation.name}</h4>
            <button onClick={() => setSelectedLocation(null)} className="text-white/20 hover:text-white transition-colors">
              <MapPin className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
             <div className="flex items-start gap-2 text-white/60 text-xs">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-brand-lime" />
                <span>{selectedLocation.address}</span>
             </div>
             <div className="flex items-center gap-2 text-white/60 text-xs">
                <Phone className="w-3.5 h-3.5 text-brand-lime" />
                <span>{selectedLocation.phone}</span>
             </div>
             <div className="flex items-center gap-2 text-white/60 text-xs">
                <Clock className="w-3.5 h-3.5 text-brand-lime" />
                <span>{selectedLocation.hours}</span>
             </div>
          </div>
          <button className="w-full mt-6 py-3 bg-brand-green text-dark-surface rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-brand-lime transition-colors">
            Get Directions <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}

function MarkerWithInfoWindow({ 
  location, 
  onSelect, 
  isSelected 
}: { 
  location: Location; 
  onSelect: (loc: Location) => void;
  isSelected: boolean;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      ref={markerRef}
      position={{ lat: location.lat, lng: location.lng }}
      onClick={() => onSelect(location)}
      title={location.name}
    >
      <Pin 
        background={isSelected ? "#4ade80" : "#22c55e"} 
        glyphColor="#000" 
        borderColor="#ffffff20"
        scale={isSelected ? 1.2 : 1}
      />
    </AdvancedMarker>
  );
}
