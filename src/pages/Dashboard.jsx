import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="bg-navy min-h-screen text-white font-jakarta overflow-x-hidden selection:bg-sage selection:text-navy">

      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col justify-center px-8 md:px-12 overflow-hidden bg-navy">
        {/* Ambient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[384px] h-[384px] bg-sage rounded-full blur-[120px] opacity-20 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[384px] h-[384px] bg-softblue rounded-full blur-[120px] opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="relative z-10 flex flex-col pt-20">
          <h1 className="font-anton text-[18vw] leading-[0.85] uppercase tracking-tighter text-white">
            POWER
          </h1>
          <h1 className="font-anton text-[18vw] leading-[0.85] uppercase tracking-tighter text-outline">
            EXCHANGE
          </h1>
        </div>

        <div className="relative z-10 mt-auto pb-12 flex justify-between items-end">
          <p className="max-w-[320px] text-sm uppercase tracking-widest text-taupe font-semibold">
            Decentralized peer-to-peer energy trading for a sustainable, transparent, and direct future.
          </p>
          <div className="w-16 h-16 rounded-full border border-taupe flex items-center justify-center animate-bounce">
            ↓
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="bg-white text-navy py-32 px-8 md:px-12">
        <h2 className="font-anton text-8xl md:text-9xl mb-24 uppercase tracking-tighter">Live Trades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3, 4].map((item, i) => (
            <div key={item} className={`relative overflow-hidden group cursor-crosshair hover-reveal-mask ${i % 2 !== 0 ? 'md:mt-16' : ''}`}>
              <div className="aspect-[3/4] md:aspect-[4/5] w-full bg-gray-200 overflow-hidden relative">
                {/* Placeholder Image */}
                <img 
                  src={`https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800&h=1000`} 
                  alt="Energy Grid"
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Hover Reveal Mask */}
                <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center view-btn">
                    <span className="font-anton text-sm tracking-[0.2em] text-navy">VIEW</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xl">Solar Batch #{item}00{item}</h3>
                  <p className="text-taupe uppercase text-sm tracking-widest mt-1">200 kWh available</p>
                </div>
                <div className="font-anton text-2xl">0.05 ETH</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Asymmetric Section */}
      <section className="bg-navy text-white py-32 px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan opacity-20 -translate-x-12 translate-y-12 w-full h-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800" 
              alt="Wind Turbines" 
              className="relative z-10 w-full aspect-square object-cover grayscale"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-anton text-sage text-2xl uppercase tracking-widest mb-6">The Protocol</span>
            <h2 className="font-anton text-6xl md:text-7xl uppercase tracking-tighter leading-none mb-8">
              Trustless Energy Escrow
            </h2>
            <p className="text-taupe text-lg leading-relaxed mb-12 max-w-md font-light">
              We leverage smart contracts to ensure your payments are securely locked until the energy is delivered. No middlemen. Total transparency.
            </p>
            <Link to="/buy" className="group flex items-center gap-4 text-white uppercase tracking-widest text-sm font-bold border-b border-white pb-2 hover:text-sage hover:border-sage transition-colors duration-300">
              Explore Network
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="bg-[#fafafa] text-navy py-32 px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h3 className="uppercase tracking-widest text-taupe font-bold text-sm mb-12">Features</h3>
            <ul className="space-y-8">
              {['Direct P2P Trading', 'Smart Contract Escrow', 'Real-time Analytics', 'Verified Green Energy'].map((item) => (
                <li key={item} className="flex items-center gap-4 group cursor-crosshair">
                  <div className="w-10 h-[1px] bg-taupe group-hover:w-16 transition-all duration-300"></div>
                  <span className="text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <h2 className="text-5xl md:text-6xl font-light leading-tight">
              Empowering consumers to <em className="text-taupe font-serif">take control</em> of their energy sourcing and <em className="text-taupe font-serif">monetize</em> their excess solar capacity.
            </h2>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-charcoal text-white py-40 px-8 md:px-12 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[30rem] leading-none text-navy opacity-30 select-none pointer-events-none">
          "
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="font-anton text-4xl md:text-5xl uppercase leading-tight mb-16 tracking-wide">
            POWERPEER HAS COMPLETELY REVOLUTIONIZED HOW MY NEIGHBORHOOD SHARES SOLAR ENERGY. IT'S SEAMLESS, SECURE, AND EMPOWERING.
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center text-navy font-bold text-xl">
              EV
            </div>
            <div className="font-anton tracking-widest uppercase text-sm">Elena Vance</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-navy text-white pt-32 pb-8 px-8 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-32">
          <h2 className="font-anton text-[12vw] leading-none uppercase tracking-tighter mb-8 text-white">
            LET'S CREATE
          </h2>
          <a href="mailto:omkarbhujbal40@gmail.com" className="text-2xl md:text-4xl text-sage font-medium tracking-wide border-b-2 border-sage pb-2 hover:text-white hover:border-white transition-colors duration-300">
            hello@powerpeer.io
          </a>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] uppercase tracking-[0.2em] text-taupe font-semibold">
          <div>© 2026 POWERPEER ENERGY LABS</div>
          <div className="flex gap-8">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
