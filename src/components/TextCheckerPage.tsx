import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  Shield,
  ShieldX,
  AlertTriangle,
  Loader2,
  Share2,
  Flag,
  ClipboardPaste,
  RotateCcw,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type VerificationLabel = "imethibitishwa" | "ya_uongo" | "haijathibitishwa";

interface VerifyResult {
  label: VerificationLabel;
  confidence: number;
  source: string;
  details: string;
  url?: string;
  similarity_score?: number;
  scores?: Record<string, number>;
}

const labelConfig: Record<
  VerificationLabel,
  {
    label: string;
    description: string;
    icon: typeof Shield;
    colorClass: string;
    bgClass: string;
    barClass: string;
  }
> = {
  imethibitishwa: {
    label: "IMETHIBITISHWA",
    description: "Taarifa hii imethibitishwa na vyanzo rasmi",
    icon: Shield,
    colorClass: "text-safe",
    bgClass: "bg-safe/10 border-safe/30",
    barClass: "bg-safe",
  },
  ya_uongo: {
    label: "YA UONGO",
    description: "Taarifa hii imegunduliwa kuwa si ya kweli",
    icon: ShieldX,
    colorClass: "text-destructive",
    bgClass: "bg-destructive/10 border-destructive/30",
    barClass: "bg-destructive",
  },
  haijathibitishwa: {
    label: "HAIJATHIBITISHWA",
    description: "Taarifa hii haijaweza kuthibitishwa kikamilifu",
    icon: AlertTriangle,
    colorClass: "text-suspicious",
    bgClass: "bg-suspicious/10 border-suspicious/30",
    barClass: "bg-suspicious",
  },
};

const exampleClaims = [
  "Tanzania ina zaidi ya watu milioni 60",
  "Kiwango cha ukuaji wa Pato la Taifa cha Tanzania mwaka 2023 kilikuwa takriban 5.0%",
  "Tanzania ina mikoa 26 na wilaya 184",
  "Chanjo ya COVID-19 nchini Tanzania imezidi 50%",
];

const TextCheckerPage = () => {
  const [text, setText] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);

  const handleVerify = async () => {
    if (!text.trim()) {
      toast.error("Tafadhali andika au ubandike maandishi kwanza.");
      return;
    }

    setVerifying(true);
    setResult(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/verify-text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(
          error.detail || "Uthibitishaji umeshindwa. Tafadhali jaribu tena."
        );
      }

      const data: VerifyResult = await res.json();
      setResult(data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Uthibitishaji umeshindwa. Tafadhali jaribu tena.";
      toast.error(message);
    } finally {
      setVerifying(false);
    }
  };

  const handleClear = () => {
    setText("");
    setResult(null);
  };

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      setText(clipText);
      toast.success("Maandishi yamebandikwa!");
    } catch {
      toast.error("Haikuweza kubandika. Tafadhali bandika mwenyewe.");
    }
  };

  const handleExampleClick = (example: string) => {
    setText(example);
    setResult(null);
  };

  const config = result ? labelConfig[result.label] : null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            Uthibitishaji wa Taarifa kwa AI
          </div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Hakiki <span className="text-gradient-primary">Taarifa</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Andika au ubandike taarifa ili kuthibitisha ukweli wake dhidi ya vyanzo rasmi.
          </p>
        </motion.div>

        {/* Input area */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="rounded-2xl border border-border bg-card p-6"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {/* Textarea */}
            <div className="relative">
              <textarea
                id="text-verify-input"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (result) setResult(null);
                }}
                placeholder="Andika au ubandike taarifa hapa... mfano: 'Tanzania ina zaidi ya watu milioni 60'"
                className="w-full min-h-[160px] resize-y rounded-xl border border-border bg-background p-4 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                disabled={verifying}
              />
              {!text && (
                <button
                  onClick={handlePaste}
                  className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
                >
                  <ClipboardPaste className="h-3.5 w-3.5" />
                  Bandika
                </button>
              )}
            </div>

            {/* Character count */}
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{text.length} herufi</span>
              {text && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  Futa
                </button>
              )}
            </div>

            {/* Example claims */}
            {!text && !result && (
              <div className="mt-5">
                <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Mifano ya kujaribu
                </p>
                <div className="flex flex-wrap gap-2">
                  {exampleClaims.map((example) => (
                    <button
                      key={example}
                      onClick={() => handleExampleClick(example)}
                      className="rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Verify button */}
            {!result && (
              <div className="mt-6 text-center">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleVerify}
                  disabled={!text.trim() || verifying}
                  className="h-14 px-10 text-base pulse-ring disabled:opacity-50 disabled:animate-none"
                  id="verify-text-button"
                >
                  {verifying ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Inathibitisha...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Thibitisha Taarifa
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Results */}
            <AnimatePresence>
              {result && config && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6"
                >
                  {/* Verdict banner */}
                  <div
                    className={`flex items-center gap-4 rounded-xl border p-5 ${config.bgClass}`}
                  >
                    <config.icon
                      className={`h-10 w-10 shrink-0 ${config.colorClass}`}
                    />
                    <div className="flex-1">
                      <p
                        className={`font-display text-2xl font-bold ${config.colorClass}`}
                      >
                        {config.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {config.description}
                      </p>
                    </div>
                  </div>

                  {/* Confidence bar */}
                  <div className="mt-5">
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-medium">Kiwango cha Uhakika</span>
                      <span className={`font-bold ${config.colorClass}`}>
                        {result.confidence}%
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className={`h-full rounded-full ${config.barClass}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-5 space-y-3 rounded-xl border border-border bg-secondary/30 p-4">
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Maelezo
                        </p>
                        <p className="mt-1 text-sm">{result.details}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Chanzo
                        </p>
                        <p className="mt-1 text-sm">{result.source}</p>
                      </div>
                    </div>

                    {result.url && (
                      <div className="flex items-start gap-3">
                        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Kiungo
                          </p>
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-block text-sm text-primary hover:underline"
                          >
                            {result.url}
                          </a>
                        </div>
                      </div>
                    )}

                    {result.similarity_score !== undefined &&
                      result.similarity_score !== null && (
                        <div className="flex items-start gap-3">
                          <Search className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Ushabihiano
                            </p>
                            <p className="mt-1 text-sm">
                              {(result.similarity_score * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      )}
                  </div>

                  {/* ML scores breakdown (if available) */}
                  {result.scores && (
                    <div className="mt-5 space-y-3">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Uchambuzi wa ML
                      </p>
                      {Object.entries(result.scores).map(([key, value]) => {
                        const scoreLabel: Record<string, string> = {
                          verified: "Imethibitishwa",
                          false: "Ya Uongo",
                          unverified: "Haijathibitishwa",
                        };
                        const scoreBar: Record<string, string> = {
                          verified: "bg-safe",
                          false: "bg-destructive",
                          unverified: "bg-suspicious",
                        };
                        return (
                          <div key={key}>
                            <div className="mb-1 flex justify-between text-sm">
                              <span className="font-medium">
                                {scoreLabel[key] || key}
                              </span>
                              <span className="text-muted-foreground">
                                {value}%
                              </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-secondary">
                              <motion.div
                                className={`h-full rounded-full ${scoreBar[key] || "bg-primary"}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${value}%` }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="mt-6 flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        toast.success("Matokeo yameshirikiwa!")
                      }
                    >
                      <Share2 className="mr-2 h-4 w-4" /> Tuma Matokeo
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        toast.info(
                          "Taarifa imeripotiwa kwa ukaguzi wa jamii."
                        )
                      }
                    >
                      <Flag className="mr-2 h-4 w-4" /> Ripoti Taarifa
                    </Button>
                  </div>

                  <div className="mt-4 text-center">
                    <Button variant="hero" onClick={handleClear}>
                      Thibitisha Taarifa Nyingine
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TextCheckerPage;
