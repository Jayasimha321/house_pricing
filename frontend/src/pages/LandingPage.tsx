import { Home, Sparkles, ShieldCheck, BarChart3, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans bg-[#fdfbf7] text-neutral-800 selection:bg-yellow-200">
      
      <nav className="fixed w-full z-[100] top-0 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center shadow-md">
              <Home size={18} className="text-yellow-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">EstiMate<span className="text-yellow-500">.</span></h1>
          </div>
          <div className="hidden md:flex gap-8 font-medium text-sm text-neutral-600">
            <a href="#features" className="hover:text-yellow-600 transition-colors">Features</a>
          </div>
          <Link to="/estimator" className="hidden md:flex bg-neutral-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/20 items-center gap-2 group">
            Get Pro Report <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
          <video autoPlay loop muted playsInline className="absolute min-w-full min-h-full object-cover opacity-80">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#fdfbf7] z-0"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-400/20 text-yellow-300 rounded-full text-sm font-bold mb-8 backdrop-blur-md border border-yellow-400/30">
              <Sparkles size={16} /> Highly Accurate ML Model
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1] text-white drop-shadow-xl">
              Discover your property's <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">true market value.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto mb-12 drop-shadow-md">
              Stop guessing. Use real-time local market data and advanced regression algorithms to get a precise property valuation in seconds.
            </p>
            <Link to="/estimator" className="inline-flex items-center gap-3 bg-yellow-400 text-yellow-950 px-10 py-5 rounded-full font-bold text-xl hover:bg-yellow-300 transition-all shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:shadow-[0_0_50px_rgba(250,204,21,0.6)] hover:-translate-y-1">
               Calculate Price Now <ArrowRight size={24} className="animate-pulse" />
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Why professionals trust EstiMate.</h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">Our regression model analyzes millions of data points to ensure you never underprice your property or let it sit vacant.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#fdfbf7] p-8 md:p-10 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-neutral-600 leading-relaxed">No more waiting for agents. Get instantaneous, highly accurate property valuations delivered straight to your screen.</p>
            </div>
            
            <div className="bg-[#fdfbf7] p-8 md:p-10 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all md:col-span-2 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-5 -mb-10 -mr-10">
                <BarChart3 size={250} />
              </div>
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 relative z-10">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 relative z-10">Data-Driven Precision</h3>
              <p className="text-neutral-600 leading-relaxed max-w-md relative z-10">Our machine learning model is trained on extensive, verified real estate datasets encompassing macro and micro-market variables, ensuring absolute pricing confidence.</p>
            </div>
            
            <div className="bg-neutral-900 p-8 md:p-10 rounded-[2.5rem] shadow-xl md:col-span-3 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="max-w-xl relative z-10 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold mb-4">Ready to optimize your yield?</h3>
                <p className="text-neutral-400 text-lg">Join thousands of landlords who use our Pro reports for deep neighborhood comps and ROI projections.</p>
              </div>
              <Link to="/estimator" className="relative z-10 bg-yellow-400 text-yellow-950 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] whitespace-nowrap flex items-center gap-2">
                Upgrade to Pro <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#fdfbf7] py-12 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
             <h2 className="text-xl font-bold tracking-tight text-neutral-400">EstiMate<span className="text-yellow-500">.</span></h2>
          </div>
          <p className="text-neutral-400 font-medium text-sm">© 2026 EstiMate Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
