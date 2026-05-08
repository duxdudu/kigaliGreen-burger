import { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { Truck, MapPin, Navigation, Package, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const RESTAURANT_LOC = { lat: -1.9441, lng: 30.1035 };
const USER_LOC = { lat: -1.9580, lng: 30.0644 };

export function OrderTrackingMap() {
  const [deliveryPos, setDeliveryPos] = useState(RESTAURANT_LOC);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'PREPARING' | 'PICKED_UP' | 'DELIVERED'>('PREPARING');

  useEffect(() => {
    const timer = setTimeout(() => setStatus('PICKED_UP'), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status !== 'PICKED_UP') return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('DELIVERED');
          return 100;
        }
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    // Linear interpolation for simulation
    const lat = RESTAURANT_LOC.lat + (USER_LOC.lat - RESTAURANT_LOC.lat) * (progress / 100);
    const lng = RESTAURANT_LOC.lng + (USER_LOC.lng - RESTAURANT_LOC.lng) * (progress / 100);
    setDeliveryPos({ lat, lng });
  }, [progress]);

  if (!hasValidKey) {
    return (
      <div className="w-full h-[400px] bg-black/[0.02] rounded-[40px] border border-black/5 flex flex-col items-center justify-center p-8 text-center shadow-inner">
        <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mb-6">
          <Navigation className="text-brand-red w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-xl font-black uppercase mb-4 text-black">Live Tracking Ready</h3>
        <p className="text-black/40 max-w-md mb-8 italic uppercase text-[10px] font-bold tracking-widest">
          Global Grill tracking system is primed. Set your GOOGLE_MAPS_PLATFORM_KEY to see your burger crossing borders live.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-0 rounded-[40px] overflow-hidden border border-black/5 relative shadow-2xl">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          center={progress > 0 ? deliveryPos : RESTAURANT_LOC}
          zoom={14}
          mapId="AISTUDIO_TRACKING"
          disableDefaultUI={true}
          gestureHandling="greedy"
          colorScheme="LIGHT"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
        >
          <RoutePolyline origin={RESTAURANT_LOC} destination={USER_LOC} progress={progress} />
          
          {/* Restaurant */}
          <AdvancedMarker position={RESTAURANT_LOC}>
            <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center border-4 border-white shadow-xl rotate-3">
              <Package className="w-5 h-5 text-white" />
            </div>
          </AdvancedMarker>

          {/* Delivery Rider */}
          <AdvancedMarker position={deliveryPos}>
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center border-4 border-white shadow-2xl"
            >
              <Truck className="w-6 h-6 text-black" />
            </motion.div>
          </AdvancedMarker>

          {/* User Destination */}
          <AdvancedMarker position={USER_LOC}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-4 border-brand-red shadow-xl">
              <MapPin className="w-5 h-5 text-brand-red" />
            </div>
          </AdvancedMarker>
        </Map>
      </APIProvider>

      {/* Tracking Overlay */}
      <div className="absolute top-6 left-6 right-6 lg:left-6 lg:right-auto lg:w-72">
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-[32px] space-y-4 shadow-xl border border-black/5">
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
        </div>
      </div>
    </div>
  );
}

function RoutePolyline({ origin, destination, progress }: { 
  origin: google.maps.LatLngLiteral; 
  destination: google.maps.LatLngLiteral;
  progress: number;
}) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    if (!routesLib || !map) return;

    routesLib.Route.computeRoutes({
      origin,
      destination,
      travelMode: 'DRIVING',
      fields: ['path'],
    }).then(({ routes }) => {
      if (routes?.[0]) {
        if (polylineRef.current) polylineRef.current.setMap(null);
        
        const polyline = new google.maps.Polyline({
          path: routes[0].path,
          geodesic: true,
          strokeColor: '#4ade80',
          strokeOpacity: 0.3,
          strokeWeight: 4,
          map: map
        });
        polylineRef.current = polyline;
      }
    });

    return () => {
      if (polylineRef.current) polylineRef.current.setMap(null);
    };
  }, [routesLib, map]);

  return null;
}
