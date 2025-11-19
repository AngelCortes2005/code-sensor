import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative py-24 border-t border-border bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-evenly gap-8">

          {/* Product */}
          <div className="w-[40%] md:w-auto">
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#019A8E] to-CodeSensor-Primary">
              Product
            </h3>
            <ul className="space-y-2">
              <li><Link href="#">Features</Link></li>
              <li><Link href="#">How It Works</Link></li>
              <li><Link href="#">Interactive Reports</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="w-[40%] md:w-auto">
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#019A8E] to-CodeSensor-Primary">
              Resources
            </h3>
            <ul className="space-y-2">
              <li><Link href="#">GitHub Repository</Link></li>
              <li><Link href="#">Documentation</Link></li>
              <li><Link href="#">Roadmap</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="w-[40%] md:w-auto">
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#019A8E] to-CodeSensor-Primary">
              Company
            </h3>
            <ul className="space-y-2">
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="w-[40%] md:w-auto">
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-linear-to-r from-[#019A8E] to-CodeSensor-Primary">
              Legal
            </h3>
            <ul className="space-y-2">
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Code Sensor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
