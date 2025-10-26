"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Sparkles, Shield, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

interface ImagePair {
  pairIndex: number;
  beforeUrl: string;
  afterUrl: string;
}

interface PropertyData {
  success: boolean;
  data: {
    propertyId: string;
    companyId: string | null;
    companyName: string | null;
    beforeAfterImagePairs: ImagePair[];
  };
}

function PropertyPreviewContent() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('id');

  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) {
      setError("No property ID provided");
      setLoading(false);
      return;
    }

    const fetchPropertyData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://immo-scraper.davmro90.workers.dev/api/external/properties/${propertyId}/images`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch property data: ${response.status}`);
        }

        const data: PropertyData = await response.json();
        setPropertyData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error(err);
        toast.error("Failed to load property images");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [propertyId]);


  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Immobilienbilder werden geladen...</p>
        </div>
      </div>
    );
  }

  if (error || !propertyData?.success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Immobilie nicht gefunden</h1>
          <p className="text-gray-600 mb-6">
            Wir konnten die gesuchten Immobilienbilder nicht finden. Bitte überprüfen Sie den Link oder kontaktieren Sie den Support.
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="https://immobild-ki.de">Immobilien KI besuchen</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { data } = propertyData;
  const hasImages = data.beforeAfterImagePairs.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <motion.header
        className="bg-white/10 backdrop-blur-sm"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <img src="/logo-wide.webp" alt="Immobilien KI" className="h-20 w-auto" />
            </div>
            <Button asChild className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 has-[>svg]:px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 w-full sm:w-auto hidden sm:flex">
              <Link href="https://immobild-ki.de" target="_blank" rel="noopener noreferrer">
                Website besuchen <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Info */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Ihre Ergebnisse
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Badge variant="secondary" className="px-3 py-1">
              Immobilien-ID: {data.propertyId}
            </Badge>
            {data.companyName && (
              <Badge variant="outline" className="px-3 py-1">
                {data.companyName}
              </Badge>
            )}
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sehen Sie die dramatische Verbesserung, die unsere KI an Ihren Immobilien-Anzeigenfotos vornimmt.
            Professionelle Ergebnisse in Sekunden, nicht Stunden.
          </p>
        </motion.div>

        {hasImages ? (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {data.beforeAfterImagePairs.map((pair, index) => (
              <Card key={pair.pairIndex} className="overflow-hidden bg-white/60 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  {/* Desktop: Side by side layout */}
                  <div className="hidden md:block">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-6 h-6 bg-black/70 text-white rounded-full flex items-center justify-center text-sm font-medium">O</div>
                          <span className="text-lg font-semibold text-gray-900">Original</span>
                        </div>
                        <div className="relative">
                          <img
                            src={pair.beforeUrl}
                            alt={`Original image ${pair.pairIndex}`}
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <span className="text-lg font-semibold text-gray-900">Optimiert</span>
                        </div>
                        <div className="relative">
                          <img
                            src={pair.afterUrl}
                            alt={`Optimized image ${pair.pairIndex}`}
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile: Stacked layout */}
                  <div className="block md:hidden space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-6 h-6 bg-black/70 text-white rounded-full flex items-center justify-center text-sm font-medium">O</div>
                        <span className="text-lg font-semibold text-gray-900">Original</span>
                      </div>
                      <div className="relative">
                        <img
                          src={pair.beforeUrl}
                          alt={`Original image ${pair.pairIndex}`}
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-semibold text-gray-900">Optimiert</span>
                      </div>
                      <div className="relative">
                        <img
                          src={pair.afterUrl}
                          alt={`Optimized image ${pair.pairIndex}`}
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex justify-center mt-6">
                    <Button asChild className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 has-[>svg]:px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 w-full sm:w-auto">
                      <Link href="https://immobild-ki.de" target="_blank" rel="noopener noreferrer">
                        Jetzt kostenlos ausprobieren! <ExternalLink className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 text-lg">Für diese Immobilie sind noch keine Vorher/Nachher-Bilder verfügbar.</p>
          </motion.div>
        )}

        <Separator className="my-12" />

        {/* CTA Section */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900">
            Bereit, Ihre Immobilienbilder zu optimieren?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schließen Sie sich Tausenden von Immobilienprofis an, die Immobilien KI vertrauen, um ihre Inserate hervorzuheben.
            Erhalten Sie professionelle Bilderqualität sofort mit unserer KI-gestützten Optimierung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 has-[>svg]:px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 w-full sm:w-auto">
              <Link href="https://immobild-ki.de" target="_blank" rel="noopener noreferrer">
                Jetzt kostenlos meine Exposés aufpolieren! <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 pt-6">
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
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-sm border-t border-white/20 mt-16">
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

export default function PropertyPreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    }>
      <PropertyPreviewContent />
    </Suspense>
  );
}
