import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Shield, Lock, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <img src="/logo-wide.webp" alt="Immobilien KI" className="h-12 w-auto" />
            </div>
            <Button asChild className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 has-[>svg]:px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 w-full sm:w-auto">
              <Link href="https://immobild-ki.de" target="_blank" rel="noopener noreferrer">
                Website besuchen <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
              Immobilienbild-Optimierung Vorschau
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dies ist ein Vorschaudienst für Immobilien KI. Immobilienmakler erhalten personalisierte Links,
              um die Vorher- und Nachher-Ergebnisse unseres KI-gestützten Bildoptimierungsdienstes zu präsentieren.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Wie es funktioniert
              </h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">1</div>
                  <p className="text-gray-600">Sie erhalten einen personalisierten Link für Ihre Immobilie</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">2</div>
                  <p className="text-gray-600">Interaktive Vorher/Nachher-Vergleiche ansehen</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">3</div>
                  <p className="text-gray-600">Optimierte Bilder für Ihre Inserate herunterladen</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">4</div>
                  <p className="text-gray-600">Beginnen Sie Immobilien KI für all Ihre Immobilien zu nutzen</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Button asChild className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 has-[>svg]:px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 w-full sm:w-auto">
              <Link href="https://immobild-ki.de" target="_blank" rel="noopener noreferrer">
                Jetzt kostenlos meine Exposés aufpolieren! <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            {/* Trust badges */}
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <span>100% DSGVO konform</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center">
                <span className="text-lg mr-2">🇩🇪</span>
                <span>Hergestellt in Deutschland</span>
              </div>
              <span className="text-gray-300">·</span>
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-gray-500 mr-2" />
                <span>Sichere Cloud</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2025 Immobilien KI. Transformieren Sie Ihre Immobilienbilder mit KI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}