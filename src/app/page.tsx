import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Shield, Lock, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Immobilien KI</h1>
              <p className="text-sm text-gray-600">AI-powered property image optimization</p>
            </div>
            <Button asChild variant="outline">
              <Link href="https://immobilt-ki.de" target="_blank" rel="noopener noreferrer">
                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
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
              Property Image Optimization Preview
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This is a preview service for Immobilien KI. Real estate agents receive personalized links
              to showcase the before and after results of our AI-powered image optimization service.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">1</div>
                  <p className="text-gray-600">You receive a personalized link for your property</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">2</div>
                  <p className="text-gray-600">View interactive before/after comparisons</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">3</div>
                  <p className="text-gray-600">Download optimized images for your listings</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">4</div>
                  <p className="text-gray-600">Start using Immobilien KI for all your properties</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <Link href="https://immobilt-ki.de" target="_blank" rel="noopener noreferrer">
                Start Optimizing Your Images <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            {/* Trust badges */}
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
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
          </div>
        </div>
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