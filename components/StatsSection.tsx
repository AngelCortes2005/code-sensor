'use client';
import { useEffect, useState } from 'react';
import { TrendingUp, Users, Shield, Zap } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 10000,
    label: 'Desarrolladores',
    suffix: '+',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    icon: Shield,
    value: 50000,
    label: 'Vulnerabilidades Detectadas',
    suffix: '+',
    color: 'from-purple-400 to-pink-400',
  },
  {
    icon: Zap,
    value: 99,
    label: 'Tiempo de Respuesta',
    suffix: '%',
    color: 'from-amber-400 to-orange-400',
  },
  {
    icon: TrendingUp,
    value: 500,
    label: 'Repositorios Analizados',
    suffix: '+',
    color: 'from-green-400 to-emerald-400',
  },
];

function Counter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{count.toLocaleString()}</>;
}

export default function StatsSection() {
  return (
    <div className="py-16 md:py-24">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 p-6 md:p-8 hover:border-slate-700 transition-all duration-300 hover:scale-105"
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            <div className="relative z-10">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${stat.color} p-3 mb-4 md:mb-6 shadow-lg`}>
                <stat.icon className="w-full h-full text-white" />
              </div>
              
              <div className="space-y-1 md:space-y-2">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  <Counter value={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-sm md:text-base text-slate-400 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}