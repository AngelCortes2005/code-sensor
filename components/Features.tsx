"use client";

import { motion } from "framer-motion";
const KEY_FEATURES = [
  {
    title: "GitHub Integration",
    description:
      "Connect your GitHub account securely and allow Code Sensor to analyze your repositories automatically.",
  },
  {
    title: "AI-Powered Code Analysis",
    description:
      "Evaluate code quality, structure, security, documentation, and best practices using advanced AI models.",
  },
  {
    title: "Quality Scoring System",
    description:
      "Receive a global quality score for each repository, with detailed breakdowns across multiple technical criteria.",
  },
  {
    title: "Smart Recommendations",
    description:
      "Get actionable suggestions to improve maintainability, documentation, security, and overall code health.",
  },
  {
    title: "Interactive Reports",
    description:
      "View clean, modern reports with visual metrics, issue summaries, and improvement paths, all inside a sleek dashboard.",
  },
  {
    title: "Completely Free",
    description:
      "All features are entirely free to use—focus on writing great code while Code Sensor handles the analysis.",
  },
];
export default function FeaturesGrid() {
  return (
    <motion.section
      className="relative py-32"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            y: 20,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          className="text-center mb-20"
        >
          <h2 className="md:text-5xl font-bold mb-6 text-[1.5rem] sm:text-3xl">
            Everything you need to launch{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#019A8E] to-CodeSensor-Primary">
              faster
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Stop guessing about your code quality. Let Code Sensor analyze your
            repositories and deliver powerful insights, recommendations, and
            scores in seconds—so you can focus on building, not debugging.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {KEY_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{
                y: 20,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: i * 0.1,
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-linear-to-b from-primary/20 to-transparent rounded-2xl blur-xl transition-all duration-500 group-hover:opacity-100 opacity-0" />
              <div className="relative backdrop-blur-xl bg-black/80 border border-border p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#019A8E] to-CodeSensor-Primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
