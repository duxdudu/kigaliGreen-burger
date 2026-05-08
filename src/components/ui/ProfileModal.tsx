import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, History, Heart, Package, Calendar, Clock, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../../lib/firestoreUtils';
import { MENU_ITEMS } from '../../constants';
import { LogOut } from 'lucide-react';

export function ProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user, favorites, signOut } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites'>('orders');

  useEffect(() => {
    if (isOpen && user) {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const q = query(
            collection(db, 'users', user.uid, 'orders'),
            orderBy('createdAt', 'desc'),
            limit(10)
          );
          const querySnapshot = await getDocs(q);
          const fetchedOrders = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
          }));
          setOrders(fetchedOrders);
        } catch (error) {
          handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/orders`);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [isOpen, user]);

  const favoriteItems = MENU_ITEMS.filter(item => favorites.includes(item.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl max-h-[90vh] bg-dark-card border border-white/10 rounded-[48px] z-[201] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-green/20 blur-xl rounded-full" />
                  <img src={user?.photoURL || ''} alt="User" className="relative w-20 h-20 rounded-[32px] object-cover border-2 border-brand-green/30" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">{user?.displayName}</h2>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{user?.email}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-full transition-colors border border-white/5">
                <X className="w-8 h-8 text-white/40" />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-64 p-6 border-b md:border-b-0 md:border-r border-white/10 space-y-2">
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'orders' ? 'bg-brand-green text-dark-surface' : 'text-white/40 hover:bg-white/5'}`}
                >
                  <History className="w-4 h-4" />
                  Order History
                </button>
                <button 
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'favorites' ? 'bg-brand-green text-dark-surface' : 'text-white/40 hover:bg-white/5'}`}
                >
                  <Heart className="w-4 h-4" />
                  Favorites
                </button>
                <div className="pt-8 mt-auto">
                   <button 
                    onClick={() => { signOut(); onClose(); }}
                    className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                   >
                     <LogOut className="w-4 h-4" />
                     Sign Out
                   </button>
                </div>
              </div>

              {/* List Area */}
              <div className="flex-1 overflow-y-auto p-8 bg-zinc-950/50 hide-scrollbar">
                {activeTab === 'orders' ? (
                  <div className="space-y-6">
                    {loading ? (
                      <div className="py-20 flex flex-col items-center justify-center opacity-40">
                         <div className="w-12 h-12 border-2 border-brand-green border-t-transparent rounded-full animate-spin mb-4" />
                         <p className="font-bold uppercase text-[10px] tracking-widest">Rewinding Orders...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="py-20 flex flex-col items-center justify-center opacity-20 text-center">
                        <Package className="w-16 h-16 mb-4" />
                        <p className="text-xl font-bold uppercase">No Orders Yet</p>
                        <p className="italic uppercase text-[10px] tracking-widest mt-2">The grill is waiting for your return.</p>
                      </div>
                    ) : (
                      orders.map((order, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={order.id} 
                          className="p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-brand-green/30 transition-all flex flex-col md:flex-row gap-6 items-center"
                        >
                          <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                             <Package className="text-brand-green w-8 h-8" />
                          </div>
                          <div className="flex-1 text-center md:text-left">
                             <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-lime">#KG-{order.id.slice(0, 6).toUpperCase()}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                                   <Calendar className="w-3 h-3 inline mr-1" />
                                   {order.createdAt?.toLocaleDateString()}
                                </span>
                             </div>
                             <h4 className="font-bold text-sm uppercase mb-1">
                                {order.items.map((it: any) => `${it.quantity}x ${it.name}`).join(', ')}
                             </h4>
                          </div>
                          <div className="text-center md:text-right">
                             <p className="text-2xl font-black text-brand-green leading-none mb-1">{order.total.toLocaleString()} FRW</p>
                             <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-brand-lime/20 text-brand-lime rounded-full">Completed</span>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favoriteItems.length === 0 ? (
                       <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-20 text-center">
                        <Heart className="w-16 h-16 mb-4" />
                        <p className="text-xl font-bold uppercase">No Favorites Yet</p>
                        <p className="italic uppercase text-[10px] tracking-widest mt-2">Double tap your favorite hills.</p>
                      </div>
                    ) : (
                      favoriteItems.map((item, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          key={item.id} 
                          className="group p-4 bg-white/5 border border-white/5 rounded-3xl hover:border-brand-green/30 transition-all flex items-center gap-4"
                        >
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                          <div className="flex-1">
                            <h4 className="font-bold text-xs uppercase mb-1">{item.name}</h4>
                            <p className="text-[10px] text-brand-green font-black">{(item.price).toLocaleString()} FRW</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-brand-green" />
                        </motion.div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
