import { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Truck, MapPin, Package, CheckCircle2, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { io } from 'socket.io-client';

// Leaflet marker bug fix for default icons
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

const RESTAURANT_LOC: [number, number] = [-1.9441, 30.1035];
const DEFAULT_USER_LOC: [number, number] = [-1.9580, 30.0644];

// Dark Mode Tiles: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
// Light Mode Tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const LIGHT_TILES = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

function RecenterMap({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  } , [position, map]);
  return null;
}

export function OrderTrackingMap() {
  const [deliveryPos, setDeliveryPos] = useState<[number, number]>(RESTAURANT_LOC);
  const [userPos, setUserPos] = useState<[number, number]>(DEFAULT_USER_LOC);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'PREPARING' | 'PICKED_UP' | 'DELIVERED'>('PREPARING');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const socketRef = useRef<any>(null);

  // Custom Icons
  const restaurantIcon = useMemo(() => L.divIcon({
    html: `<div class="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center border-4 border-white shadow-xl rotate-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"/><path d="M16.5 9.4 7.55 4.24"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg></div>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  }), []);

  const riderIcon = useMemo(() => L.divIcon({
    html: `<div class="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center border-4 border-white shadow-2xl animate-pulse"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>`,
    className: '',
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  }), []);

  const userIcon = useMemo(() => L.divIcon({
    html: `<div class="w-10 h-10 bg-white rounded-full flex items-center justify-center border-4 border-brand-red shadow-xl"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  }), []);

  // Get User Real Location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPos([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.log("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Socket.io Connection
  useEffect(() => {
    socketRef.current = io();

    // Listen for real-time updates for the active order
    socketRef.current.on('order-tracking-demo', (data: any) => {
      setDeliveryPos([data.lat, data.lng]);
      setStatus(data.status);
      setProgress(data.progress);
    });

    return () => socketRef.current.disconnect();
  }, []);

  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-0 rounded-[40px] overflow-hidden border border-black/5 relative shadow-2xl z-0">
      <MapContainer 
        center={RESTAURANT_LOC} 
        zoom={14} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={isDarkMode ? DARK_TILES : LIGHT_TILES}
        />
        
        <Polyline 
          positions={[RESTAURANT_LOC, userPos]} 
          color={isDarkMode ? "#FF6B00" : "#FF6B00"} 
          weight={4} 
          opacity={0.2} 
          dashArray="10, 10"
        />
        
        <Polyline 
          positions={[RESTAURANT_LOC, deliveryPos]} 
          color="#FF6B00" 
          weight={4} 
        />

        <Marker position={RESTAURANT_LOC} icon={restaurantIcon} />
        <Marker position={deliveryPos} icon={riderIcon} />
        <Marker position={userPos} icon={userIcon} />

        <RecenterMap position={deliveryPos} />
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2">
         <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-brand-red hover:text-white transition-all text-black/40"
         >
           <Navigation className="w-5 h-5" />
         </button>
      </div>

      {/* Tracking Overlay */}
      <div className="absolute top-6 left-6 right-6 lg:left-6 lg:right-auto lg:w-72 z-[1000]">
        <div className="bg-white p-6 rounded-[32px] space-y-4 shadow-2xl border border-black/5">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center">
                 {status === 'DELIVERED' ? <CheckCircle2 className="text-brand-red" /> : <Truck className="text-brand-red animate-bounce" />}
              </div>
              <div>
                <p className="text-[8px] text-black/40 font-black uppercase tracking-[2px] leading-none mb-1">Live Status</p>
                <h4 className="font-black uppercase text-xs text-black">
                  {status === 'PREPARING' && 'Kitchen Active...'}
                  {status === 'PICKED_UP' && 'Driver in Route'}
                  {status === 'DELIVERED' && 'Delivered!'}
                </h4>
              </div>
           </div>
           <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-brand-red shadow-[0_0_10px_rgba(255,107,0,0.5)]" 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
           </div>
           <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-black/20">
              <span>Kitchen</span>
              <span>Destination</span>
           </div>
           <p className="text-[9px] font-black text-black/40 uppercase tracking-tight italic">
              Estimated: {Math.max(0, Math.ceil(15 - (progress * 0.15)))} mins
           </p>
        </div>
      </div>
    </div>
  );
}
