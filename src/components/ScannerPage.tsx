import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Shield, AlertTriangle, ShieldX, Loader2, Share2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Verdict = "real" | "suspicious" | "fake";

interface ScanResult {
  verdict: Verdict;
  confidence: number;
  scores: { real: number; suspicious: number; fake: number };
}

const verdictConfig = {
  real: { label: "REAL", icon: Shield, colorClass: "text-safe", bgClass: "bg-safe/10 border-safe/30", barClass: "bg-safe" },
  suspicious: { label: "SUSPICIOUS", icon: AlertTriangle, colorClass: "text-suspicious", bgClass: "bg-suspicious/10 border-suspicious/30", barClass: "bg-suspicious" },
  fake: { label: "FAKE", icon: ShieldX, colorClass: "text-destructive", bgClass: "bg-destructive/10 border-destructive/30", barClass: "bg-destructive" },
};

const ScannerPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) {
      setFile(f);
      setImage(URL.createObjectURL(f));
      setResult(null);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setImage(URL.createObjectURL(f));
      setResult(null);
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setScanning(true);
    setResult(null);
    try {
      // Call the FastAPI backend
      const formData = new FormData();
      formData.append("image", file);
      
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Analysis failed. Please try again.");
      }
      
      const data = await res.json();
      setResult(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Analysis failed. Please try again.";
      toast.error(message);
    } finally {
      setScanning(false);
    }
  };

  const handleClear = () => {
    setImage(null);
    setFile(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Hakiki <span className="text-gradient-primary">Scanner</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Pakia picha ili kuangalia ikiwa ni halisi au feki.
          </p>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {!image ? (
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-16 transition-colors hover:border-primary/50"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="font-display text-lg font-semibold">Weka picha hapa</p>
              <p className="mt-2 text-sm text-muted-foreground">Inaruhusu JPG, PNG, WebP</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="relative">
                <img
                  src={image}
                  alt="Uploaded for scanning"
                  className="mx-auto max-h-96 rounded-xl object-contain"
                />
                {scanning && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/60 backdrop-blur-sm">
                    <div className="text-center">
                      <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
                      <p className="mt-3 font-display text-sm font-semibold text-primary">Inachambua Picha..</p>
                    </div>
                    <div className="scanner-line absolute left-0 right-0 top-0" />
                  </div>
                )}
                <button
                  onClick={handleClear}
                  className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {!result && !scanning && (
                <div className="mt-6 text-center">
                  <Button variant="hero" size="lg" onClick={handleScan} className="h-14 px-10 text-base pulse-ring">
                    <Shield className="mr-2 h-5 w-5" /> Chambua Picha
                  </Button>
                </div>
              )}

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6"
                  >
                    {/* Verdict banner */}
                    <div className={`flex items-center gap-4 rounded-xl border p-5 ${verdictConfig[result.verdict].bgClass}`}>
                      {(() => {
                        const Icon = verdictConfig[result.verdict].icon;
                        return <Icon className={`h-10 w-10 ${verdictConfig[result.verdict].colorClass}`} />;
                      })()}
                      <div>
                        <p className={`font-display text-2xl font-bold ${verdictConfig[result.verdict].colorClass}`}>
                          {verdictConfig[result.verdict].label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Asilimia {result.confidence}%
                        </p>
                      </div>
                    </div>

                    {/* Score breakdown */}
                    <div className="mt-6 space-y-4">
                      {(["real", "suspicious", "fake"] as const).map((key) => (
                        <div key={key}>
                          <div className="mb-1 flex justify-between text-sm">
                            <span className="font-medium capitalize">{verdictConfig[key].label}</span>
                            <span className="text-muted-foreground">{result.scores[key]}%</span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                            <motion.div
                              className={`h-full rounded-full ${verdictConfig[key].barClass}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${result.scores[key]}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => toast.success("Result shared!")}
                      >
                        <Share2 className="mr-2 h-4 w-4" /> Tuma Matokeo
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => toast.info("Image flagged for community review.")}
                      >
                        <Flag className="mr-2 h-4 w-4" /> Ripoti Picha
                      </Button>
                    </div>

                    <div className="mt-4 text-center">
                      <Button variant="hero" onClick={handleClear}>
                        Skani Picha Nyingine
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ScannerPage;
