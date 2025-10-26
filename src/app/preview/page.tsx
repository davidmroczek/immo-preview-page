"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { Download, ExternalLink, Sparkles, Shield, Lock } from "lucide-react";
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
          `https://immo-scraper.davmro90.workers.dev/properties/${propertyId}/images`
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

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success("Image downloaded successfully");
    } catch (err) {
      toast.error("Failed to download image");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property images...</p>
        </div>
      </div>
    );
  }

  if (error || !propertyData?.success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find the property images you&apos;re looking for. Please check the link or contact support.
          </p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="https://immobild-ki.de">Visit Immobilien KI</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { data } = propertyData;
  const hasImages = data.beforeAfterImagePairs.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        className="bg-white border-b border-gray-200"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Immobilien KI</h1>
              <p className="text-sm text-gray-600">AI-powered property image optimization</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link href="https://immobild-ki.de" target="_blank" rel="noopener noreferrer">
                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Property Image Optimization Results
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Badge variant="secondary" className="px-3 py-1">
              Property ID: {data.propertyId}
            </Badge>
            {data.companyName && (
              <Badge variant="outline" className="px-3 py-1">
                {data.companyName}
              </Badge>
            )}
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the dramatic improvement our AI makes to your property listing photos.
            Professional results in seconds, not hours.
          </p>
        </motion.div>

        {hasImages ? (
          <div className="space-y-12">
            {data.beforeAfterImagePairs.map((pair, index) => (
              <motion.div
                key={pair.pairIndex}
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <ReactCompareSlider
                        itemOne={<ReactCompareSliderImage src={pair.afterUrl} alt="Optimized" />}
                        itemTwo={<ReactCompareSliderImage src={pair.beforeUrl} alt="Original" />}
                        position={50}
                        className="w-full h-auto aspect-[4/3]"
                      />
                      <div className="absolute top-4 left-4 bg-blue-600/90 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 z-10">
                        <Sparkles className="w-4 h-4" />
                        Optimized
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium z-10">
                        Original
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => handleDownload(pair.beforeUrl, `property-${propertyId}-before-${pair.pairIndex + 1}.jpg`)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Original
                  </Button>
                  <Button
                    onClick={() => handleDownload(pair.afterUrl, `property-${propertyId}-optimized-${pair.pairIndex + 1}.jpg`)}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Optimized
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 text-lg">No before/after images available for this property yet.</p>
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
            Ready to optimize your property images?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of real estate professionals who trust Immobilien KI to make their listings stand out.
            Get professional-quality images instantly with our AI-powered optimization.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <Link href="https://immobild-ki.de" target="_blank" rel="noopener noreferrer">
                Start Optimizing Now <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 rounded-xl">
              <Link href="https://immobild-ki.de/pricing" target="_blank" rel="noopener noreferrer">
                View Pricing
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 pt-6">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-green-600 mr-2" />
              <span>100% GDPR compliant</span>
            </div>
            <span className="text-gray-300">·</span>
            <div className="flex items-center">
              <span className="text-lg mr-2">🇩🇪</span>
              <span>Made in Germany</span>
            </div>
            <span className="text-gray-300">·</span>
            <div className="flex items-center">
              <Lock className="h-5 w-5 text-gray-500 mr-2" />
              <span>Secure Cloud</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2024 Immobilien KI. Transform your property images with AI.
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
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PropertyPreviewContent />
    </Suspense>
  );
}
