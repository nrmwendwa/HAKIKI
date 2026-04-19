import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Shield, AlertTriangle, ShieldX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ShareMenu from "@/components/ShareMenu";
import ReportButton from "@/components/ReportButton";
import {
  validateUpload,
  ApiError,
  type DecisionResult,
  type DeepfakeScores,
} from "@/lib/api";

type Verdict = "real" | "suspicious" | "fake";

const decisionVerdictToColorKey: Record<DecisionResult["verdict"], Verdict> = {
  valid: "real",
  suspicious: "suspicious",
  invalid: "fake",
};

const verdictConfig = {
  real: {
    label: "HALISI",
    description: "Picha inaonekana kuwa halisi kulingana na viashiria",
    icon: Shield,
    colorClass: "text-safe",
    bgClass: "bg-safe/10 border-safe/30",
    barClass: "bg-safe",
  },
  suspicious: {
    label: "INATIA SHAKA",
    description: "Picha ina viashiria mchanganyiko vya uhalisia",
    icon: AlertTriangle,
    colorClass: "text-suspicious",
    bgClass: "bg-suspicious/10 border-suspicious/30",
    barClass: "bg-suspicious",
  },
  fake: {
    label: "FEKI",
    description: "Picha inaonyesha viashiria vikali vya kuchezewa au AI",
    icon: ShieldX,
    colorClass: "text-destructive",
    bgClass: "bg-destructive/10 border-destructive/30",
    barClass: "bg-destructive",
  },
};

const GENERIC_ERROR = "Uchambuzi umeshindwa. Tafadhali jaribu tena.";

const pickErrorMessage = (err: unknown): string => {
  if (err instanceof ApiError && err.message) return err.message;
  if (err instanceof Error && err.message) return err.message;
  return GENERIC_ERROR;
};

const ImageScanPanel = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [decision, setDecision] = useState<DecisionResult | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) {
      setFile(f);
      setImage(URL.createObjectURL(f));
      setDecision(null);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setImage(URL.createObjectURL(f));
      setDecision(null);
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setScanning(true);
    setDecision(null);

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const dr = await validateUpload(file, controller.signal);
      setDecision(dr);
    } catch (err) {
      toast.error(pickErrorMessage(err));
    } finally {
      setScanning(false);
      setAbortController((current) => (current === controller ? null : current));
    }
  };

  const handleClear = () => {
    abortController?.abort();
    setAbortController(null);
    setImage(null);
    setFile(null);
    setDecision(null);
  };

  const colorKey: Verdict | null = decision ? decisionVerdictToColorKey[decision.verdict] : null;
  const primaryConfig = colorKey ? verdictConfig[colorKey] : null;
  const scores: DeepfakeScores | null = decision?.deepfake_scores ?? null;

  const shareText =
    decision && decision.verdict === "valid"
      ? `✅ IMETHIBITISHWA: Picha imehakikiwa. Imehakikiwa na HAKIKI SCANNER.`
      : "";

  const shareDisabledReason =
    decision?.verdict === "invalid"
      ? "Hatuwezi kushiriki picha iliyogundulika kuwa feki."
      : "Hatuwezi kushiriki picha inayotia shaka.";

  const reportDisabledReason =
    decision?.verdict === "valid"
      ? "Hatuwezi kuripoti picha iliyothibitishwa kuwa halisi."
      : "Tunaweza kuripoti tu picha zilizothibitishwa kuwa feki.";

  return (
    <motion.div
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

          {!decision && !scanning && (
            <div className="mt-6 text-center">
              <Button variant="hero" size="lg" onClick={handleScan} className="h-14 px-10 text-base pulse-ring">
                <Shield className="mr-2 h-5 w-5" /> Chambua Picha
              </Button>
            </div>
          )}

          <AnimatePresence>
            {decision && colorKey && primaryConfig && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6"
              >
                <div className={`flex items-center gap-4 rounded-xl border p-5 ${primaryConfig.bgClass}`}>
                  {(() => {
                    const Icon = primaryConfig.icon;
                    return <Icon className={`h-10 w-10 shrink-0 ${primaryConfig.colorClass}`} />;
                  })()}
                  <div className="flex-1">
                    <p className={`font-display text-2xl font-bold ${primaryConfig.colorClass}`}>
                      {primaryConfig.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{primaryConfig.description}</p>
                  </div>
                </div>

                {scores && (
                  <div className="mt-6 space-y-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Uchambuzi wa Picha
                    </p>
                    {(["real", "suspicious", "fake"] as const).map((key) => (
                      <div key={key}>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="font-medium">{verdictConfig[key].label}</span>
                          <span className="text-muted-foreground">{Math.round(scores[key])}%</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            className={`h-full rounded-full ${verdictConfig[key].barClass}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${scores[key]}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(() => {
                  const ocr = decision.trace?.ocr as { text?: unknown } | undefined;
                  const ocrText =
                    ocr && typeof ocr === "object" && typeof ocr.text === "string" ? ocr.text : null;
                  if (!ocrText || !ocrText.trim()) return null;
                  return (
                    <div className="mt-4">
                      <p className="mb-2 text-sm font-semibold">Maandishi Yaliyotolewa</p>
                      <pre className="rounded-xl border border-border bg-background/40 p-3 text-xs text-muted-foreground whitespace-pre-wrap">
                        {ocrText}
                      </pre>
                    </div>
                  );
                })()}

                <div className="mt-6 flex gap-3">
                  <div className="flex-1">
                    <ShareMenu
                      text={shareText}
                      disabled={decision.verdict !== "valid"}
                      disabledReason={shareDisabledReason}
                    />
                  </div>
                  <ReportButton
                    className="flex-1"
                    label="Ripoti Picha"
                    disabled={decision.verdict !== "invalid"}
                    disabledReason={reportDisabledReason}
                    mailto={`mailto:cybercrimeunit@policeforce.go.tz?subject=${encodeURIComponent(
                      "Ripoti ya Picha Feki - HAKIKI SCANNER"
                    )}&body=${encodeURIComponent(
                      [
                        "Habari,",
                        "",
                        "Ninaripoti picha iliyogundulika kuwa feki na HAKIKI SCANNER:",
                        "",
                        "Matokeo: SI SAHIHI",
                        scores
                          ? `Alama: Halisi ${Math.round(scores.real)}% | Inatia shaka ${Math.round(scores.suspicious)}% | Feki ${Math.round(scores.fake)}%`
                          : "",
                        `Tarehe: ${new Date().toISOString()}`,
                        "",
                        "Kumbuka: picha yenyewe haiwezi kuambatanishwa kiotomatiki. Tafadhali ihifadhi kutoka kwa kifaa chako na kuituma kama kiambatisho ikiwa inahitajika.",
                        "",
                        "Asante.",
                      ]
                        .filter(Boolean)
                        .join("\n")
                    )}`}
                  />
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
  );
};

export default ImageScanPanel;
