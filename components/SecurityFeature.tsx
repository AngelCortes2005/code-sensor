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
			<div id="security" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-CodeSensor-Primary/10 rounded-full blur-3xl" />

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
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-CodeSensor-Secondary/20 to-CodeSensor-Primary/20 border border-CodeSensor-Primary/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
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
						className="relative hidden lg:block"
					>
						<div className="relative aspect-square">
							{/* Outer rotating ring */}
							<motion.div
								animate={{ rotate: 360 }}
								transition={{
									duration: 30,
									repeat: Infinity,
									ease: "linear",
								}}
								className="absolute inset-0"
							>
								<div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 blur-xl opacity-60" />
								<div className="absolute bottom-0 right-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 blur-xl opacity-60" />
							</motion.div>

							{/* Middle rotating ring - opposite direction */}
							<motion.div
								animate={{ rotate: -360 }}
								transition={{
									duration: 20,
									repeat: Infinity,
									ease: "linear",
								}}
								className="absolute inset-8"
							>
								<div className="absolute top-1/4 right-0 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-xl opacity-60" />
								<div className="absolute bottom-1/3 left-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 blur-xl opacity-60" />
							</motion.div>

							{/* Center content */}
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="relative">
									{/* Animated circles */}
									<motion.div
										animate={{
											scale: [1, 1.2, 1],
											opacity: [0.3, 0.6, 0.3],
										}}
										transition={{
											duration: 3,
											repeat: Infinity,
											ease: "easeInOut",
										}}
										className="absolute inset-0 w-80 h-80 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border-2 border-CodeSensor-Primary/30"
									/>
									<motion.div
										animate={{
											scale: [1, 1.3, 1],
											opacity: [0.2, 0.5, 0.2],
										}}
										transition={{
											duration: 3,
											repeat: Infinity,
											ease: "easeInOut",
											delay: 0.5,
										}}
										className="absolute inset-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border-2 border-CodeSensor-Secondary/20"
									/>

									{/* Center gradient blob */}
									<motion.div
										animate={{
											scale: [1, 1.05, 1],
											rotate: [0, 180, 360],
										}}
										transition={{
											duration: 8,
											repeat: Infinity,
											ease: "linear",
										}}
										className="w-48 h-48 rounded-full bg-gradient-to-br from-CodeSensor-Secondary/20 via-CodeSensor-Primary/30 to-CodeSensor-Primary/20 backdrop-blur-3xl border border-CodeSensor-Primary/30 shadow-2xl shadow-CodeSensor-Primary/50 flex items-center justify-center"
									>
										{/* Floating icons */}
										<div className="relative w-full h-full">
											<motion.div
												animate={{ y: [-10, 10, -10] }}
												transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
												className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-lg bg-gradient-to-br from-CodeSensor-Secondary to-CodeSensor-Primary flex items-center justify-center shadow-lg"
											>
												<Shield className="w-6 h-6 text-white" />
											</motion.div>
											
											<motion.div
												animate={{ x: [-10, 10, -10] }}
												transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
												className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
											>
												<Lock className="w-6 h-6 text-white" />
											</motion.div>
											
											<motion.div
												animate={{ y: [10, -10, 10] }}
												transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
												className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg"
											>
												<AlertTriangle className="w-6 h-6 text-white" />
											</motion.div>
											
											<motion.div
												animate={{ x: [10, -10, 10] }}
												transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
												className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
											>
												<Eye className="w-6 h-6 text-white" />
											</motion.div>
										</div>
									</motion.div>

									{/* Particle effects */}
									{[...Array(8)].map((_, i) => (
										<motion.div
											key={i}
											animate={{
												y: [0, -100, 0],
												opacity: [0, 1, 0],
											}}
											transition={{
												duration: 4,
												repeat: Infinity,
												delay: i * 0.5,
												ease: "easeOut",
											}}
											className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-CodeSensor-Primary"
											style={{
												transform: `rotate(${i * 45}deg) translateX(80px)`,
											}}
										/>
									))}
								</div>
							</div>

							{/* Grid background */}
							<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_110%)]" />
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
