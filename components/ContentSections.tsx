import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionProps } from '../types/types';

const Section: React.FC<SectionProps> = ({ id, className, children }) => (
  <section id={id} className={className}>
    {children}
  </section>
);

const ContentSections = () => {
     const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  
  const isInView1 = useInView(ref1, { once: true, amount: 0.3 });
  const isInView2 = useInView(ref2, { once: true, amount: 0.3 });
  const isInView3 = useInView(ref3, { once: true, amount: 0.3 });

  return (
    <div className="py-20 space-y-32">
      <motion.div
        ref={ref1}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Section id="features" className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Análisis Profundo de tu Código
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Nuestra IA examina cada línea de código en busca de vulnerabilidades, code smells y oportunidades de optimización.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Seguridad</h3>
              <p className="text-gray-300">
                Detecta vulnerabilidades de seguridad y prácticas peligrosas antes de que lleguen a producción.
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Calidad</h3>
              <p className="text-gray-300">
                Mejora la calidad del código identificando code smells y anti-patrones.
              </p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Rendimiento</h3>
              <p className="text-gray-300">
                Optimiza el rendimiento encontrando cuellos de botella y código ineficiente.
              </p>
            </div>
          </div>
        </Section>
      </motion.div>

      <motion.div
        ref={ref2}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Section id="how-it-works" className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Cómo Funciona
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Integración sencilla con tus repositorios y análisis automático con cada commit.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Conecta tu Repositorio</h3>
                <p className="text-gray-300">Conecta GitHub, GitLab o Bitbucket en segundos</p>
              </div>
              
              <div className="flex-1 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Análisis Automático</h3>
                <p className="text-gray-300">Nuestra IA analiza cada commit automáticamente</p>
              </div>
              
              <div className="flex-1 text-center">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Feedback Detallado</h3>
                <p className="text-gray-300">Recibe reportes detallados con recomendaciones</p>
              </div>
            </div>
          </div>
        </Section>
      </motion.div>
    </div>
  );
}

export default ContentSections