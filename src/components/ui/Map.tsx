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

  if (!hasValidKey) {
    return (
      <div className="w-full h-[500px] bg-zinc-50 rounded-[48px] border border-black/5 flex flex-col items-center justify-center p-8 text-center shadow-inner">
        <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mb-10 shadow-xl shadow-brand-red/10">
          <MapPin className="text-brand-red w-10 h-10" />
        </div>
        <h3 className="text-xl font-black uppercase mb-4 text-black">Interactive Network Ready</h3>
        <p className="text-black/40 max-w-md mb-10 text-[10px] uppercase font-black tracking-widest leading-relaxed italic">
          To enable live tracking and precise locations across Kigali, please add your Google Maps API Key in Settings → Secrets.
        </p>
        <div className="space-y-4 text-left bg-white p-8 rounded-[32px] border border-black/5 text-[10px] text-black/40 leading-relaxed font-black uppercase tracking-widest shadow-xl shadow-black/5">
           <p><span className="text-brand-red"># Step 1:</span> Get a key at console.cloud.google.com</p>
           <p><span className="text-brand-red"># Step 2:</span> Add secret <span className="text-black">GOOGLE_MAPS_PLATFORM_KEY</span></p>
           <p><span className="text-brand-red"># Step 3:</span> Experience Kigali like never before.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-[48px] overflow-hidden border-8 border-white relative shadow-2xl">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={{ lat: -1.9441, lng: 30.1035 }}
          defaultZoom={13}
          mapId="KIGALI_GRILL_ELITE"
          disableDefaultUI={true}
          gestureHandling="greedy"
          colorScheme="LIGHT"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
        >
          {KIGALI_LOCATIONS.map((loc) => (
            <MarkerWithInfoWindow 
              key={loc.id} 
              location={loc} 
              onSelect={(l) => setSelectedLocation(l)}
              isSelected={selectedLocation?.id === loc.id}
            />
          ))}
        </Map>
      </APIProvider>

      {/* Floating Info Overlay */}
      {selectedLocation && (
        <div className="absolute bottom-8 left-8 right-8 lg:left-auto lg:right-8 lg:w-80 bg-white p-10 rounded-[48px] border border-black/5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
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
  key?: string;
  location: Location; 
  onSelect: (loc: Location) => void;
  isSelected: boolean;
}) {
  const [markerRef] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      ref={markerRef}
      position={{ lat: location.lat, lng: location.lng }}
      onClick={() => onSelect(location)}
      title={location.name}
    >
      <Pin 
        background={isSelected ? "#FF6B00" : "#FF9F1C"} 
        glyphColor="#fff" 
        borderColor="#ffffff"
        scale={isSelected ? 1.4 : 1}
      />
    </AdvancedMarker>
  );
}
