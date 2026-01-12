'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Sparkles, Check, Star } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const benefits = [
  'Instant code analysis',
  'Real-time vulnerability detection',
  'GitHub integration',
  'Detailed visual reports',
];

export default function CTASection() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleGetStarted = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (status === 'authenticated') {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#019A8E]/20 to-CodeSensor-Primary/20 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Gradient border */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#019A8E] via-CodeSensor-Primary to-[#019A8E] opacity-50" />
          
          {/* Main content container */}
          <div className="relative m-[2px] rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
            {/* Animated grid background */}
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#019A8E]/5 via-CodeSensor-Primary/5 to-transparent" />
            
            {/* Grid Layout */}
            <div className="relative grid lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16">
              {/* Left Side - Content */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-CodeSensor-Primary/10 border border-CodeSensor-Primary/20">
                  <Sparkles className="w-4 h-4 text-CodeSensor-Primary" />
                  <span className="text-sm font-medium text-CodeSensor-Primary">Start free today</span>
                </div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white">Ready to </span>
                  <span className="bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary bg-clip-text text-transparent">
                    secure
                  </span>
                  <span className="text-white"> your code?</span>
                </h2>
                
                {/* Description */}
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                  Join thousands of developers who trust CodeSensor to keep 
                  their repositories secure and optimized.
                </p>

                {/* Benefits List */}
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#019A8E] to-CodeSensor-Primary flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-black" />
                      </div>
                      <span className="text-gray-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    onClick={handleGetStarted}
                    className="group relative overflow-hidden bg-gradient-to-r from-[#019A8E] to-CodeSensor-Primary hover:shadow-[0_0_40px_rgba(0,254,116,0.3)] px-8 py-6 text-lg font-semibold transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center text-black">
                      Get Started Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Button>

                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="group border-2 border-gray-700 bg-transparent hover:bg-CodeSensor-Primary/5 hover:border-CodeSensor-Primary px-8 py-6 text-lg font-semibold transition-all duration-300"
                    asChild
                  >
                    <Link href="https://github.com" target="_blank">
                      <Github className="mr-2 w-5 h-5" />
                      View on GitHub
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Right Side - Stats & Trust Signals */}
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center space-y-8"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '10K+', label: 'Developers', icon: '👨‍💻' },
                    { value: '50K+', label: 'Analyses', icon: '🔍' },
                    { value: '99.9%', label: 'Accuracy', icon: '🎯' },
                    { value: '24/7', label: 'Support', icon: '💬' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#019A8E]/20 to-CodeSensor-Primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                      <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 p-6 rounded-2xl group-hover:border-CodeSensor-Primary/50 transition-all duration-300">
                        <div className="text-3xl mb-2">{stat.icon}</div>
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/60 to-black/60 border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-CodeSensor-Primary fill-CodeSensor-Primary" />
                      ))}
                    </div>
                    <span className="text-white font-semibold">5.0</span>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { icon: '✓', text: '100% Free', color: 'text-green-400' },
                      { icon: '✓', text: 'Open Source', color: 'text-blue-400' },
                      { icon: '✓', text: 'No credit card required', color: 'text-purple-400' },
                    ].map((badge, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full ${badge.color} flex items-center justify-center text-sm font-bold`}>
                          {badge.icon}
                        </div>
                        <span className="text-gray-300">{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-CodeSensor-Primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#019A8E]/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}