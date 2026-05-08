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
      <div className="w-full h-[400px] bg-white/5 rounded-[40px] border border-white/10 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-brand-lime/20 rounded-full flex items-center justify-center mb-6">
          <Navigation className="text-brand-lime w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-xl font-black uppercase mb-4 text-white">Live Tracking Active</h3>
        <p className="text-white/40 max-w-md mb-8 italic">
          Kigali Greens tracking system is ready. Set your GOOGLE_MAPS_PLATFORM_KEY to see the rider live.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[500px] lg:min-h-0 rounded-[40px] overflow-hidden border border-white/10 relative">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          center={progress > 0 ? deliveryPos : RESTAURANT_LOC}
          zoom={14}
          mapId="AISTUDIO_TRACKING"
          disableDefaultUI={true}
          gestureHandling="greedy"
          colorScheme="DARK"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
        >
          <RoutePolyline origin={RESTAURANT_LOC} destination={USER_LOC} progress={progress} />
          
          {/* Restaurant */}
          <AdvancedMarker position={RESTAURANT_LOC}>
            <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center border-2 border-white/20">
              <Package className="w-4 h-4 text-dark-surface" />
            </div>
          </AdvancedMarker>

          {/* Delivery Rider */}
          <AdvancedMarker position={deliveryPos}>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 bg-brand-lime rounded-full flex items-center justify-center border-2 border-white shadow-2xl"
            >
              <Truck className="w-5 h-5 text-dark-surface" />
            </motion.div>
          </AdvancedMarker>

          {/* User Destination */}
          <AdvancedMarker position={USER_LOC}>
            <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-brand-lime">
              <MapPin className="w-4 h-4 text-brand-lime" />
            </div>
          </AdvancedMarker>
        </Map>
      </APIProvider>

      {/* Tracking Overlay */}
      <div className="absolute top-6 left-6 right-6 lg:left-6 lg:right-auto lg:w-72">
        <div className="glass-morphism p-6 rounded-[32px] space-y-4 border-white/5">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center">
                 {status === 'DELIVERED' ? <CheckCircle2 className="text-brand-green" /> : <Truck className="text-brand-lime animate-bounce" />}
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-none mb-1">Status</p>
                <h4 className="font-black uppercase text-sm">
                  {status === 'PREPARING' && 'Kitchen Firing...'}
                  {status === 'PICKED_UP' && 'Rider on Route'}
                  {status === 'DELIVERED' && 'Order Arrived!'}
                </h4>
              </div>
           </div>
           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-brand-lime" 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
           </div>
           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
              <span>Restaurant</span>
              <span>Home</span>
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
