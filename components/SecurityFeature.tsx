import { Shield } from "lucide-react";

export default function SecurityFeature() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="relative p-8 rounded-2xl bg-black/80 backdrop-blur-xs border border-CodeSensor-Primary/20">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-linear-to-r from-[#019A8E] to-CodeSensor-Primary rounded-full opacity-20 animate-pulse"></div>
            <Shield className="w-full h-full text-white" />
          </div>
        </div>
        <div className="text-center max-w-2xl mx-auto pt-12">
          <h2 className="scroll-m-20 text-4xl mb-4 font-bold">
            A smarter, safer and more reliable way
            <br />
            to evaluate your <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-[#019A8E] to-CodeSensor-Primary">code quality</span>.
          </h2>
          <p className="">
            Code Sensor provides an intelligent and stable approach to analyzing
            your repositories. By combining AI-driven insights with meticulous
            structural and security evaluations, the platform ensures your code
            remains clean, maintainable, and protected — all without slowing
            down your development workflow.
          </p>
        </div>
      </div>
    </section>
  );
}
