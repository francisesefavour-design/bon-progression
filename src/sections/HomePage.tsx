import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Users, TrendingUp, Shield, Zap, ChevronDown, ChevronLeft, ChevronRight, Star, Quote, AlertTriangle, Lock, Eye } from 'lucide-react';
import type { View } from '@/types';

interface HomePageProps {
  onViewChange: (view: View) => void;
}

export function HomePage({ onViewChange }: HomePageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: TrendingUp,
      title: 'Advanced Trading Scripts',
      description: 'Access cutting-edge trading algorithms and automated strategies.',
    },
    {
      icon: Users,
      title: 'Exclusive Community',
      description: 'Join elite traders in our private WhatsApp groups.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data and trades are protected with enterprise security.',
    },
    {
      icon: Zap,
      title: 'Real-time Signals',
      description: 'Get instant notifications for market opportunities.',
    },
  ];

  const testimonials = [
    { image: '/testimonial1.jpg', name: 'Michael O.', role: 'Forex Trader', quote: 'Nice works Bon Jac! The MOD script changed my trading game completely. 95% accuracy is real!' },
    { image: '/testimonial2.jpg', name: 'Sarah K.', role: 'Crypto Investor', quote: 'Bon Jac, you are a genius! Progression has helped me achieve financial freedom. Thank you!' },
    { image: '/testimonial3.jpg', name: 'David A.', role: 'Day Trader', quote: 'Incredible work Bon Jac! The signals are always on point. Best investment I ever made.' },
    { image: '/testimonial4.jpg', name: 'Grace M.', role: 'Portfolio Manager', quote: 'Nice works Bon Jac! My clients are seeing amazing returns thanks to your scripts.' },
    { image: '/testimonial5.jpg', name: 'James T.', role: 'Retired Banker', quote: 'Bon Jac, your expertise is unmatched. Progression is the real deal for serious traders.' },
    { image: '/testimonial6.jpg', name: 'Amanda P.', role: 'Student Trader', quote: 'Started with nothing, now making consistent profits. Nice works Bon Jac, you changed my life!' },
    { image: '/testimonial7.jpg', name: 'Chris B.', role: 'Tech Entrepreneur', quote: 'The automation features are brilliant. Bon Jac, you have built something special here.' },
    { image: '/testimonial8.jpg', name: 'Patricia N.', role: 'Financial Analyst', quote: 'Nice works Bon Jac! The data accuracy and timing of signals is phenomenal.' },
    { image: '/testimonial9.jpg', name: 'Kevin L.', role: 'Part-time Trader', quote: 'Even with my busy schedule, I am making profits. Thank you Bon Jac for this platform!' },
    { image: '/testimonial10.jpg', name: 'Victoria R.', role: 'Business Owner', quote: 'Bon Jac, your scripts have become an essential part of my investment strategy. Amazing work!' },
    { image: '/testimonial11.jpg', name: 'Robert S.', role: 'Hedge Fund Manager', quote: 'Nice works Bon Jac! I have recommended Progression to all my colleagues. Top notch!' },
    { image: '/testimonial12.jpg', name: 'Jennifer W.', role: 'Creative Director', quote: 'Who knew trading could be this accessible? Bon Jac, you have democratized forex trading!' },
    { image: '/testimonial13.jpg', name: 'Daniel H.', role: 'Consultant', quote: 'The community support combined with Bon Jac\'s scripts is unbeatable. Highly recommended!' },
    { image: '/testimonial14.jpg', name: 'Michelle C.', role: 'Real Estate Investor', quote: 'Nice works Bon Jac! Diversified my portfolio with forex and never looked back.' },
  ];

  const cryptoAttacks = [
    { image: '/hack1.jpg', title: 'The DAO Hack', description: '50M ETH stolen through smart contract exploit', year: '2016' },
    { image: '/hack2.jpg', title: 'Wallet Drain Attack', description: 'DeFi protocol vulnerability leads to massive losses', year: '2021' },
    { image: '/hack3.jpg', title: 'Smart Contract Exploit', description: 'Flash loan attack manipulates price oracle', year: '2022' },
    { image: '/hack4.jpg', title: 'Bridge Hack', description: 'Cross-chain bridge compromised, funds stolen', year: '2023' },
  ];

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialRef.current) {
      const scrollAmount = 320;
      testimonialRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen noise-bg" style={{ pointerEvents: 'auto' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
        </div>

        <div className={`relative z-10 max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo Display */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple rounded-3xl blur-2xl opacity-30" />
              <div className="relative glass-panel p-2 rounded-3xl">
                <img 
                  src="/logo.png" 
                  alt="Progression" 
                  className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Welcome to </span>
            <span className="neon-text">Progression</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            The ultimate platform for traders. Access premium scripts, join exclusive communities, 
            and elevate your trading journey with cutting-edge tools.
          </p>

          {/* CTA Buttons - Fully Clickable */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => onViewChange('signup')}
              className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4 cursor-pointer"
              type="button"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onViewChange('login')}
              className="btn-secondary flex items-center justify-center gap-2 text-lg px-8 py-4 cursor-pointer"
              type="button"
            >
              Sign In
            </button>
            <button 
              onClick={() => onViewChange('about')}
              className="btn-secondary flex items-center justify-center gap-2 text-lg px-8 py-4 cursor-pointer"
              type="button"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="glass-card p-4">
              <div className="text-2xl md:text-3xl font-bold neon-text">10+</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl md:text-3xl font-bold neon-text">3</div>
              <div className="text-sm text-muted-foreground">Groups</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl md:text-3xl font-bold neon-text">95%</div>
              <div className="text-sm text-muted-foreground">Success</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Choose <span className="neon-text">Progression</span>?
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Everything you need to succeed in the trading world
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card p-6 group hover:border-neon-pink/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-neon-pink" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crypto Hacking Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              <span className="text-white">Crypto </span>
              <span className="text-red-500">Attack</span>
              <span className="text-white"> Archives</span>
            </h2>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Learn from the biggest Ethereum hacks in history. Knowledge is power, and power protects your assets.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {cryptoAttacks.map((attack) => (
              <div 
                key={attack.title}
                className="glass-card overflow-hidden group hover:border-red-500/30 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={attack.image} 
                    alt={attack.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30">
                    <span className="text-xs text-red-400 font-mono">{attack.year}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-red-400">BREACH DETECTED</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-red-400" />
                    {attack.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{attack.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What Our <span className="neon-text">Members Say</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Real testimonials from real traders who transformed their journey with Progression
          </p>

          {/* Testimonials Carousel */}
          <div className="relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Member Testimonials
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => scrollTestimonials('left')}
                  className="p-3 rounded-xl glass-card hover:border-neon-pink/30 transition-colors cursor-pointer"
                  type="button"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollTestimonials('right')}
                  className="p-3 rounded-xl glass-card hover:border-neon-pink/30 transition-colors cursor-pointer"
                  type="button"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div 
              ref={testimonialRef}
              className="flex gap-6 overflow-x-auto scrollbar-thin pb-4 snap-x snap-mandatory"
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-80 snap-start"
                >
                  <div className="glass-card p-6 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-neon-pink/30"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-neon-pink">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <Quote className="absolute top-0 left-0 w-6 h-6 text-neon-pink/20" />
                      <p className="text-sm text-muted-foreground pl-8 italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="flex gap-1 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-pink to-neon-purple" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-pink/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-neon-purple/20 rounded-full blur-[80px]" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
              Ready to Start Your Journey?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto relative z-10">
              Join thousands of traders who have already transformed their trading experience with Progression.
            </p>
            <button 
              onClick={() => onViewChange('signup')}
              className="btn-primary text-lg px-10 py-4 relative z-10 cursor-pointer"
              type="button"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Progression" className="w-8 h-8 object-contain" />
            <span className="text-white font-semibold">Progression</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Progression. All rights reserved.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => onViewChange('about')} 
              className="text-sm text-muted-foreground hover:text-white transition-colors cursor-pointer"
              type="button"
            >
              About
            </button>
            <button 
              onClick={() => onViewChange('login')} 
              className="text-sm text-muted-foreground hover:text-white transition-colors cursor-pointer"
              type="button"
            >
              Login
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
