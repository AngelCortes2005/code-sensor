"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Is CodeSensor really free?",
    answer: "Yes! CodeSensor is completely free to use. We believe in democratizing code quality and security analysis for all developers. No credit card required, no hidden fees.",
  },
  {
    question: "What languages and frameworks are supported?",
    answer: "CodeSensor supports all major programming languages including JavaScript, TypeScript, Python, Java, Go, Rust, PHP, and many more. Our AI is trained on millions of code repositories across diverse tech stacks.",
  },
  {
    question: "How accurate is the AI analysis?",
    answer: "Our AI achieves 99% accuracy in detecting code quality issues and security vulnerabilities. It's powered by advanced machine learning models trained on real-world codebases and continuously improved with feedback.",
  },
  {
    question: "Is my code secure and private?",
    answer: "Absolutely. We use OAuth 2.0 with GitHub for authentication, and your code is analyzed in a secure, isolated environment. We never store your source code permanently and never share it with third parties.",
  },
  {
    question: "Can I use CodeSensor for private repositories?",
    answer: "Yes! CodeSensor works seamlessly with both public and private GitHub repositories. Your privacy settings are fully respected.",
  },
  {
    question: "How long does an analysis take?",
    answer: "Most repositories are analyzed in under 2 minutes. The exact time depends on the size and complexity of your codebase, but our optimized AI ensures fast results.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No installation required! CodeSensor is a fully web-based platform. Just sign in with your GitHub account and start analyzing immediately.",
  },
  {
    question: "Can I integrate CodeSensor into my CI/CD pipeline?",
    answer: "While our current version focuses on on-demand analysis, API integration for CI/CD pipelines is coming soon. Stay tuned for updates!",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-CodeSensor-Primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-CodeSensor-Secondary/20 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-CodeSensor-Primary/10 border border-CodeSensor-Primary/20 mb-6">
            <span className="text-sm font-medium text-CodeSensor-Primary">FAQ</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 font-light">
            Everything you need to know about CodeSensor
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group"
            >
              <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800 rounded-2xl overflow-hidden hover:border-CodeSensor-Primary/50 transition-all duration-300">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-white pr-8">
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full bg-CodeSensor-Primary/10 flex items-center justify-center transition-all duration-300 ${
                    openIndex === index ? 'rotate-180 bg-CodeSensor-Primary' : ''
                  }`}>
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-black" />
                    ) : (
                      <Plus className="w-5 h-5 text-CodeSensor-Primary" />
                    )}
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-gray-800/50 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="mailto:support@codesensor.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-gray-800 hover:border-CodeSensor-Primary/50 text-white font-medium transition-all duration-300 hover:bg-white/10"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
