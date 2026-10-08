import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Home, Bath, Maximize, MapPin, Sparkles, Activity, Clock, ShieldCheck, BarChart3, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CustomSelect } from '../components/CustomSelect';

export default function EstimatorPage() {
  const [formData, setFormData] = useState({
    bhk: 2, size: 1200, city: 'Mumbai', property_type: 'Apartment', condition: 'Resale', bathroom: 2
  });
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ id: number, details: string, price: number }[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/predict', formData);
      const price = response.data.predicted_price;
      setPredictedPrice(price);
      setHistory(prev => [{ id: Date.now(), details: `${formData.bhk} BHK • ${formData.size} sqft • ${formData.city}`, price }, ...prev].slice(0, 4));
      if (window.innerWidth < 1024 && resultRef.current) setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    } catch (error) {
      alert("Failed to connect to ML model. Is the Flask server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-neutral-800 selection:bg-yellow-200">
      <nav className="w-full bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft size={20} className="text-neutral-500" />
            <span className="font-semibold text-neutral-600 hidden md:block">Back</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center shadow-md">
              <Home size={18} className="text-yellow-400" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">EstiMate<span className="text-yellow-500">.</span></h1>
          </Link>
          <div className="w-16"></div>
        </div>
      </nav>

      <div className="py-12 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Market Intelligence Dashboard</h2>
             <p className="text-neutral-500 text-lg max-w-2xl mx-auto">Enter the specifications of your property below to let our ML algorithms analyze local comparable sales instantly.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
            <div className="lg:col-span-8 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
              <div className="glass-card p-6 md:p-8 lg:p-10 relative overflow-visible shadow-2xl shadow-yellow-900/5 border-white/60 bg-white/40">
                <h3 className="text-2xl font-bold mb-6 text-neutral-800 flex items-center gap-3">
                  Property Details
                </h3>
                
                <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5 z-[50]">
                    <label className="text-sm font-semibold text-neutral-600 flex items-center gap-2"><Home size={16} className="text-yellow-600"/> BHK</label>
                    <CustomSelect name="bhk" value={formData.bhk} onChange={handleChange} options={[1,2,3,4,5].map(n => ({ label: `${n} Bedroom${n>1?'s':''}`, value: n }))} />
                  </div>
                  <div className="flex flex-col gap-1.5 z-[49]">
                    <label className="text-sm font-semibold text-neutral-600 flex items-center gap-2"><Bath size={16} className="text-yellow-600"/> Bathrooms</label>
                    <CustomSelect name="bathroom" value={formData.bathroom} onChange={handleChange} options={[1,2,3,4,5].map(n => ({ label: `${n} Bathroom${n>1?'s':''}`, value: n }))} />
                  </div>
                  <div className="flex flex-col gap-1.5 z-[48]">
                    <label className="text-sm font-semibold text-neutral-600 flex items-center gap-2"><Maximize size={16} className="text-yellow-600"/> Size (sqft)</label>
                    <input type="number" name="size" value={formData.size} onChange={handleChange} className="px-5 py-4 font-medium text-neutral-700 bg-white/70 backdrop-blur-md shadow-sm rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all hover:bg-white text-base md:text-lg" />
                  </div>
                  <div className="flex flex-col gap-1.5 z-[47]">
                    <label className="text-sm font-semibold text-neutral-600 flex items-center gap-2"><MapPin size={16} className="text-yellow-600"/> City</label>
                    <CustomSelect name="city" value={formData.city} onChange={handleChange} options={['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'].map(c => ({ label: c, value: c }))} />
                  </div>
                  <div className="flex flex-col gap-1.5 z-[46]">
                    <label className="text-sm font-semibold text-neutral-600 flex items-center gap-2"><Home size={16} className="text-yellow-600"/> Property Type</label>
                    <CustomSelect name="property_type" value={formData.property_type} onChange={handleChange} options={[{ label: 'Apartment', value: 'Apartment' }, { label: 'Independent House', value: 'Independent House' }, { label: 'Villa', value: 'Villa' }]} />
                  </div>
                  <div className="flex flex-col gap-1.5 z-[45]">
                    <label className="text-sm font-semibold text-neutral-600 flex items-center gap-2"><Sparkles size={16} className="text-yellow-600"/> Condition</label>
                    <CustomSelect name="condition" value={formData.condition} onChange={handleChange} options={[{ label: 'Resale', value: 'Resale' }, { label: 'New Property', value: 'New Property' }]} />
                  </div>

                  <div className="md:col-span-2 mt-4 z-0">
                    <button type="submit" disabled={loading} className="w-full bg-neutral-900 text-white p-4 rounded-2xl font-bold text-lg hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/20 flex justify-center items-center gap-3 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0">
                      {loading ? <><Activity className="animate-spin" size={20}/> Analyzing Market Data...</> : <><BarChart3 size={20}/> Calculate Property Value</>}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <div ref={resultRef} className="glass-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden bg-white/60 border-white/80">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <p className="text-neutral-500 font-bold mb-3 uppercase tracking-wider text-xs">Estimated Property Value</p>
                {predictedPrice !== null ? (
                  <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center w-full">
                    <div className="text-4xl lg:text-5xl font-bold tracking-tighter text-neutral-900 mb-4 drop-shadow-sm truncate w-full text-center px-4">
                      <span className="text-2xl font-medium text-neutral-400 mr-1">₹</span>{Math.round(predictedPrice).toLocaleString('en-IN')}
                    </div>
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-100/80 px-4 py-1.5 rounded-full shadow-sm border border-emerald-200">
                      <ShieldCheck size={16} /> Market Aligned
                    </div>
                  </div>
                ) : (
                  <div className="text-neutral-400 flex flex-col items-center gap-4 py-6">
                    <div className="w-20 h-20 bg-white/60 shadow-inner border border-white/80 rounded-full flex items-center justify-center">
                      <Activity size={32} className="text-neutral-300" />
                    </div>
                    <p className="text-sm font-medium">Ready for your inputs</p>
                  </div>
                )}
              </div>

              <div className="dark-card p-8 flex-1 flex flex-col relative overflow-hidden group border-neutral-800">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl -mr-10 -mb-10 group-hover:bg-yellow-500/20 transition-all duration-700"></div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white relative z-10"><Clock size={18} className="text-yellow-400" /> Recent Estimates</h3>
                <div className="flex flex-col gap-3 flex-1 relative z-10">
                  {history.length === 0 ? (
                    <div className="text-neutral-500 text-sm font-medium italic mt-2">
                      Your estimate history will appear here.
                    </div>
                  ) : (
                    history.map(item => (
                      <div key={item.id} className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/50 rounded-2xl transition-all cursor-pointer group/item hover:border-neutral-600 shadow-sm backdrop-blur-md">
                        <p className="text-neutral-400 text-xs font-semibold mb-1 group-hover/item:text-yellow-400 transition-colors">{item.details}</p>
                        <p className="text-xl font-bold text-white">₹{Math.round(item.price).toLocaleString('en-IN')}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
