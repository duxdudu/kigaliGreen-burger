import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, ShoppingBag, TrendingUp, Truck, 
  Map as MapIcon, ChevronRight, CheckCircle2, 
  Clock, AlertCircle, Search, Filter 
} from 'lucide-react';
import { collection, query, onSnapshot, orderBy, limit, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { io } from 'socket.io-client';

interface Order {
  id: string;
  userId: string;
  status: 'PREPARING' | 'PICKED_UP' | 'DELIVERED';
  total: number;
  items: any[];
  createdAt: any;
  address?: string;
}

export function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeOrders: 0,
    deliveredToday: 0
  });

  useEffect(() => {
    const s = io();
    setSocket(s);
    return () => s.disconnect();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
      setOrders(ordersData);
      
      const active = ordersData.filter(o => o.status !== 'DELIVERED').length;
      const revenue = ordersData.reduce((acc, o) => acc + o.total, 0);
      setStats({
        totalRevenue: revenue,
        activeOrders: active,
        deliveredToday: ordersData.filter(o => o.status === 'DELIVERED').length
      });
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      
      // Emit to socket for real-time map updates if order is in progress
      if ((newStatus === 'PICKED_UP' || newStatus === 'DELIVERED') && socket) {
         socket.emit('update-rider-location', {
           orderId: 'demo', // Hardcoded for demo/sim simplicity
           lat: -1.9441 + (newStatus === 'DELIVERED' ? -0.0139 : -0.007),
           lng: 30.1035 + (newStatus === 'DELIVERED' ? -0.0391 : -0.02),
           status: newStatus,
           progress: newStatus === 'DELIVERED' ? 100 : 50
         });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
           <div>
              <h1 className="text-5xl font-black uppercase tracking-tighter text-black">Command Center</h1>
              <p className="text-[10px] text-black/40 font-black uppercase tracking-[4px] mt-2 italic">Kigali Express Network Operation</p>
           </div>
           <div className="flex gap-4">
              <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-xl flex items-center gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center">
                    <TrendingUp className="text-brand-red w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-[8px] text-black/40 font-black uppercase tracking-widest leading-none mb-1">Total Revenue</p>
                    <p className="text-xl font-black text-black">{stats.totalRevenue.toLocaleString()} FRW</p>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-black/5 shadow-xl flex items-center gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-brand-yellow/10 flex items-center justify-center">
                    <Truck className="text-brand-yellow w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-[8px] text-black/40 font-black uppercase tracking-widest leading-none mb-1">Active Deliveries</p>
                    <p className="text-xl font-black text-black">{stats.activeOrders}</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Active Orders Feed */}
           <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between px-4">
                 <h2 className="text-[10px] font-black uppercase tracking-[4px] text-black/20 flex items-center gap-3">
                   <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                   Live Order Stream
                 </h2>
                 <div className="flex gap-2">
                    <button className="p-2 bg-white rounded-full border border-black/5 text-black/40 hover:text-black transition-all">
                       <Filter className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white rounded-full border border-black/5 text-black/40 hover:text-black transition-all">
                       <Search className="w-4 h-4" />
                    </button>
                 </div>
              </div>

              <div className="space-y-4">
                 {orders.map((order) => (
                   <motion.div 
                    layout
                    key={order.id} 
                    className="bg-white p-8 rounded-[40px] border border-black/5 shadow-xl hover:border-brand-red/30 transition-all group"
                   >
                     <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                           <div className={cn(
                             "w-16 h-16 rounded-[24px] flex items-center justify-center transition-all",
                             order.status === 'PREPARING' ? "bg-zinc-100 text-black/40" :
                             order.status === 'PICKED_UP' ? "bg-brand-yellow/10 text-brand-yellow" :
                             "bg-brand-red/10 text-brand-red"
                           )}>
                              {order.status === 'PREPARING' && <Clock className="w-8 h-8" />}
                              {order.status === 'PICKED_UP' && <Truck className="w-8 h-8" />}
                              {order.status === 'DELIVERED' && <CheckCircle2 className="w-8 h-8" />}
                           </div>
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <h4 className="text-xs font-black uppercase tracking-tight text-black">{order.id}</h4>
                                 <span className="text-[8px] px-2 py-0.5 bg-black/5 rounded-full font-black text-black/40">{order.createdAt?.toDate ? order.createdAt.toDate().toLocaleTimeString() : 'Recent'}</span>
                              </div>
                              <p className="text-[10px] text-black/20 font-black uppercase tracking-widest">{order.address || 'Kigali Central'}</p>
                           </div>
                        </div>

                        <div className="flex items-center gap-8">
                           <div className="text-right">
                              <p className="text-[8px] text-black/20 font-black uppercase tracking-widest mb-1">Order Total</p>
                              <p className="text-lg font-black text-black">{order.total.toLocaleString()} FRW</p>
                           </div>
                           <div className="flex gap-2">
                              {order.status === 'PREPARING' && (
                                <Button 
                                  variant="secondary"
                                  onClick={() => updateStatus(order.id, 'PICKED_UP')}
                                  className="h-12 px-6 rounded-2xl text-[10px] uppercase font-black tracking-widest"
                                >
                                  Dispatch
                                </Button>
                              )}
                              {order.status === 'PICKED_UP' && (
                                <Button 
                                  onClick={() => updateStatus(order.id, 'DELIVERED')}
                                  className="h-12 px-6 rounded-2xl bg-brand-red text-white text-[10px] uppercase font-black tracking-widest"
                                >
                                  Mark Delivered
                                </Button>
                              )}
                           </div>
                        </div>
                     </div>
                   </motion.div>
                 ))}
              </div>
           </div>

           {/* Analytics Sidebar */}
           <div className="space-y-8">
              <div className="bg-black text-white p-10 rounded-[48px] shadow-2xl space-y-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/20 blur-3xl rounded-full" />
                 <div>
                    <h3 className="text-xs font-black uppercase tracking-[4px] text-white/40 mb-2">Network Health</h3>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                       <p className="text-2xl font-black tracking-tighter">OPTIMAL</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex justify-between items-center py-4 border-b border-white/10">
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Load Balance</span>
                       <span className="text-sm font-black">94%</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-white/10">
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Rider Density</span>
                       <span className="text-sm font-black">HIGH</span>
                    </div>
                 </div>

                 <Button className="w-full h-14 rounded-2xl bg-white text-black hover:bg-zinc-200 uppercase font-black text-[10px] tracking-widest">
                    Manage Logistics
                 </Button>
              </div>

              <div className="bg-white p-10 rounded-[48px] border border-black/5 shadow-xl space-y-6">
                 <h3 className="text-[10px] font-black uppercase tracking-[4px] text-black/20">System Alerts</h3>
                 <div className="space-y-4">
                    <div className="p-4 bg-zinc-50 rounded-2xl flex items-start gap-3">
                       <AlertCircle className="w-4 h-4 text-brand-red mt-0.5" />
                       <p className="text-[9px] font-black uppercase text-black/40 leading-relaxed">High demand detected in Nyarutarama district.</p>
                    </div>
                    <div className="p-4 bg-zinc-50 rounded-2xl flex items-start gap-3">
                       <MapIcon className="w-4 h-4 text-brand-yellow mt-0.5" />
                       <p className="text-[9px] font-black uppercase text-black/40 leading-relaxed">Rider #042 offline near Kimironko market.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
