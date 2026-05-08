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
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl max-h-[90vh] bg-white border border-black/5 rounded-[48px] z-[201] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-black/5 flex items-center justify-between bg-black/[0.01]">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-red/10 blur-xl rounded-full" />
                  <img src={user?.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400'} alt="User" className="relative w-24 h-24 rounded-[40px] object-cover border-4 border-white shadow-xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-black">{user?.displayName}</h2>
                  <p className="text-black/40 text-[10px] font-black uppercase tracking-widest">{user?.email}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-black/5 rounded-full transition-colors border border-black/5 text-black/20 hover:text-black">
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-64 p-6 border-b md:border-b-0 md:border-r border-black/5 space-y-2 bg-zinc-50/50">
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-4 px-6 py-5 rounded-[24px] font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'orders' ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' : 'text-black/40 hover:bg-black/5'}`}
                >
                  <History className="w-5 h-5" />
                  Order History
                </button>
                <button 
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center gap-4 px-6 py-5 rounded-[24px] font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === 'favorites' ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20' : 'text-black/40 hover:bg-black/5'}`}
                >
                  <Heart className="w-5 h-5" />
                  Favorites
                </button>
                <div className="pt-8">
                   <button 
                    onClick={() => { signOut(); onClose(); }}
                    className="w-full flex items-center gap-4 px-6 py-5 rounded-[24px] font-black uppercase text-[10px] tracking-widest text-brand-red hover:bg-brand-red/5 transition-all border border-transparent hover:border-brand-red/10"
                   >
                     <LogOut className="w-5 h-5" />
                     Sign Out
                   </button>
                </div>
              </div>

              {/* List Area */}
              <div className="flex-1 overflow-y-auto p-8 bg-zinc-100/30 hide-scrollbar">
                {activeTab === 'orders' ? (
                  <div className="space-y-6">
                    {loading ? (
                      <div className="py-20 flex flex-col items-center justify-center opacity-20">
                         <div className="w-12 h-12 border-4 border-brand-red border-t-brand-yellow rounded-full animate-spin mb-4" />
                         <p className="font-black uppercase text-[10px] tracking-widest text-black">Authenticating History...</p>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="py-20 flex flex-col items-center justify-center opacity-10 text-center grayscale">
                        <Package className="w-16 h-16 mb-4" />
                        <p className="text-xl font-black uppercase text-black">No Recent Bites</p>
                        <p className="italic uppercase text-[10px] font-black tracking-widest mt-2 text-black">Ready to explore global flavors?</p>
                      </div>
                    ) : (
                      orders.map((order, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          key={order.id} 
                          className="p-8 bg-white border border-black/5 rounded-[32px] hover:shadow-xl hover:shadow-black/5 transition-all flex flex-col md:flex-row gap-6 items-center"
                        >
                          <div className="w-16 h-16 rounded-2xl bg-brand-red/5 flex items-center justify-center flex-shrink-0 animate-pulse">
                             <Package className="text-brand-red w-8 h-8" />
                          </div>
                          <div className="flex-1 text-center md:text-left">
                             <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-2">
                                <span className="text-[10px] font-black uppercase tracking-[3px] text-brand-red">#GG-{order.id.slice(0, 6).toUpperCase()}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-black/20">
                                   <Calendar className="w-3 h-3 inline mr-1" />
                                   {order.createdAt?.toLocaleDateString()}
                                </span>
                             </div>
                             <h4 className="font-black text-xs uppercase mb-1 text-black/80">
                                {order.items.map((it: any) => `${it.quantity}X ${it.name}`).join(', ')}
                             </h4>
                          </div>
                          <div className="text-center md:text-right">
                             <p className="text-2xl font-black text-brand-red leading-none mb-2">{order.total.toLocaleString()} FRW</p>
                             <span className="text-[8px] font-black uppercase tracking-[3px] px-4 py-2 bg-black/[0.04] text-black/60 rounded-full">Completed</span>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favoriteItems.length === 0 ? (
                       <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-10 text-center grayscale">
                        <Heart className="w-16 h-16 mb-4" />
                        <p className="text-xl font-black uppercase text-black">Empty Favorites</p>
                        <p className="italic uppercase text-[10px] font-black tracking-widest mt-2 text-black">Heart your favorite global burgers.</p>
                      </div>
                    ) : (
                      favoriteItems.map((item, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          key={item.id} 
                          className="group p-6 bg-white border border-black/5 rounded-[32px] hover:shadow-xl hover:shadow-black/5 transition-all flex items-center gap-6"
                        >
                          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all border border-black/5" />
                          <div className="flex-1">
                            <h4 className="font-black text-xs uppercase mb-1 text-black/80 group-hover:text-brand-red transition-colors">{item.name}</h4>
                            <p className="text-[10px] text-brand-red font-black uppercase tracking-widest">{(item.price).toLocaleString()} FRW</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-black/10 group-hover:text-brand-red transition-colors" />
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
