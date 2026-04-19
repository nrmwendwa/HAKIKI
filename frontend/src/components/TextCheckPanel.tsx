import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Shield,
  ShieldX,
  AlertTriangle,
  Loader2,
  ClipboardPaste,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ShareMenu from "@/components/ShareMenu";
import ReportButton from "@/components/ReportButton";
import {
  validateText,
  ApiError,
  decisionToVerificationLabel,
  type DecisionResult,
  type VerificationLabel,
} from "@/lib/api";

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
"⁠Iran yafunga mlango wa Hormuz",
"Watoto wanne wafariki dunia Bukoba kwa kuangukiwa na ukuta",
"⁠Madaktari Bingwa bobezi wawasili nchini kutoa huduma za tiba asili",
"Bei ya mafuta yapanda kwa asilimia 50 Tanzania",
"⁠Iran yatangaza vita na Tanzania leo",
"⁠NMB yatangaza nafasi 10,000 za ajira kwa vijana kote nchini",
"⁠Mbeya yaongoza zaidi kwa idadi ya maambukizi ya ugonjwa wa Kipindupindu Machi 2026 Tanzania yafungiwa kufanya biashara na nchi za Kiarabu",
"⁠Kiwango cha ukuaji wa Pato la Taifa cha Tanzania mwaka 2023 kilikuwa takriban 5.0%"
];

const TextCheckPanel = () => {
  const [text, setText] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<DecisionResult | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleVerify = async () => {
    if (!text.trim()) {
      toast.error("Tafadhali andika au ubandike maandishi kwanza.");
      return;
    }

    setVerifying(true);
    setResult(null);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const data = await validateText(text.trim(), controller.signal);
      setResult(data);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      const message =
        error instanceof ApiError
          ? error.message
          : "Uthibitishaji umeshindwa. Tafadhali jaribu tena.";
      toast.error(message);
    } finally {
      setVerifying(false);
    }
  };

  const handleClear = () => {
    abortRef.current?.abort();
    abortRef.current = null;
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

  const label = result ? decisionToVerificationLabel(result.verdict) : null;
  const config = label ? labelConfig[label] : null;
  const evidence = result?.evidence ?? [];
  const primaryEvidence = evidence[0];
  const source = primaryEvidence?.matched_source || "HAKIKI SCANNER";
  const url = primaryEvidence?.matched_url || undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div
        className="rounded-2xl border border-border bg-card p-6"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
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

        <AnimatePresence>
          {result && config && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
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

              {result.verdict === "valid" && (
              <>
              <div className="mt-5 space-y-3 rounded-xl border border-border bg-secondary/30 p-4">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Chanzo
                    </p>
                    <p className="mt-1 text-sm">{source}</p>
                  </div>
                </div>

                {url && (
                  <div className="flex items-start gap-3">
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Kiungo
                      </p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-sm text-primary hover:underline"
                      >
                        {url}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              </>
              )}

              <div className="mt-6 flex gap-3">
                <div className="flex-1">
                  <ShareMenu
                    text={
                      label === "imethibitishwa"
                        ? `✅ IMETHIBITISHWA: "${text.trim()}" — Chanzo: ${source}. Imehakikiwa na HAKIKI SCANNER.`
                        : ""
                    }
                    disabled={label !== "imethibitishwa"}
                    disabledReason={
                      label === "ya_uongo"
                        ? "Hatuwezi kushiriki taarifa ya uongo."
                        : "Hatuwezi kushiriki taarifa ambayo haijathibitishwa."
                    }
                  />
                </div>
                <ReportButton
                  className="flex-1"
                  label="Ripoti Taarifa"
                  disabled={label !== "ya_uongo"}
                  disabledReason={
                    label === "imethibitishwa"
                      ? "Hatuwezi kuripoti taarifa iliyothibitishwa kuwa ya kweli."
                      : "Tunaweza kuripoti tu taarifa zilizothibitishwa kuwa za uongo."
                  }
                  mailto={`mailto:cybercrimeunit@policeforce.go.tz?subject=${encodeURIComponent(
                    "Ripoti ya Taarifa ya Uongo - HAKIKI SCANNER"
                  )}&body=${encodeURIComponent(
                    [
                      "Habari,",
                      "",
                      "Ninaripoti taarifa ifuatayo ambayo imethibitishwa kuwa ya uongo na HAKIKI SCANNER:",
                      "",
                      `Taarifa: "${text.trim()}"`,
                      "Matokeo: YA UONGO",
                      `Tarehe: ${new Date().toISOString()}`,
                      "",
                      "Tafadhali chukua hatua zinazohitajika kwa mujibu wa Sheria ya Makosa ya Mtandao Tanzania.",
                      "",
                      "Asante.",
                    ].join("\n")
                  )}`}
                />
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
  );
};

export default TextCheckPanel;
