"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";

const securityFeatures = [
	{
		icon: Shield,
		title: "Vulnerability Detection",
		description: "Scan for known security vulnerabilities in dependencies",
	},
	{
		icon: Lock,
		title: "Code Security",
		description: "Identify insecure coding patterns and potential exploits",
	},
	{
		icon: Eye,
		title: "Privacy Analysis",
		description: "Detect sensitive data exposure and privacy issues",
	},
	{
		icon: AlertTriangle,
		title: "Real-time Alerts",
		description: "Get instant notifications about critical security issues",
	},
];

export default function SecurityFeature() {
	return (
		<section className="relative py-32 px-4 overflow-hidden">
			{/* Background elements */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-CodeSensor-Primary/10 rounded-full blur-3xl" />

			<div className="max-w-7xl mx-auto relative">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Left side - Content */}
					<motion.div
						initial={{ x: -50, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
					>
						<div className="inline-block px-4 py-2 rounded-full bg-CodeSensor-Primary/10 border border-CodeSensor-Primary/20 mb-6">
							<span className="text-sm font-medium text-CodeSensor-Primary">Security</span>
						</div>

						<h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
							Security{" "}
							<span className="bg-gradient-to-r from-CodeSensor-Secondary to-CodeSensor-Primary bg-clip-text text-transparent">
								First Approach
							</span>
						</h2>

						<p className="text-xl text-gray-400 mb-12 font-light leading-relaxed">
							Our AI doesn't just analyze code quality—it actively hunts for
							security vulnerabilities, keeping your projects safe from threats.
						</p>

						<div className="space-y-4">
							{securityFeatures.map((feature, index) => (
								<motion.div
									key={index}
									initial={{ x: -20, opacity: 0 }}
									whileInView={{ x: 0, opacity: 1 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.1, duration: 0.5 }}
									className="flex items-start gap-4 group"
								>
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary/20 to-CodeSensor-Primary/20 border border-CodeSensor-Primary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
										<feature.icon className="w-6 h-6 text-CodeSensor-Primary" />
									</div>
									<div>
										<h4 className="text-lg font-semibold text-white mb-1">
											{feature.title}
										</h4>
										<p className="text-gray-400">
											{feature.description}
										</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Right side - Visual */}
					<motion.div
						initial={{ x: 50, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="relative"
					>
						<div className="relative aspect-square">
							{/* Center circle */}
							<div className="absolute inset-0 flex items-center justify-center">
								<motion.div
									animate={{ rotate: 360 }}
									transition={{
										duration: 20,
										repeat: Infinity,
										ease: "linear",
									}}
									className="w-64 h-64 rounded-full border-2 border-dashed border-CodeSensor-Primary/30"
								/>
							</div>

							{/* Center shield */}
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="w-32 h-32 rounded-full bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary flex items-center justify-center shadow-2xl shadow-CodeSensor-Primary/50 animate-pulse">
									<Shield className="w-16 h-16 text-white" />
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
