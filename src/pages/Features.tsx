import { motion } from "framer-motion";
import { ScanFace, Zap, Globe, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const features = [
  {
    icon: ScanFace,
    title: "Face Deepfake Detector",
    description: "Detects AI-generated or manipulated faces using CNN-based models with REAL, SUSPICIOUS, or FAKE verdicts.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "AI analyzes uploaded images in seconds, providing confidence scores and detailed breakdown.",
  },
  {
    icon: Globe,
    title: "Mobile + Web",
    description: "Works across all platforms with offline support for low-data areas.",
  },
  {
    icon: Users,
    title: "Community Reporting",
    description: "Share verified results or flag suspicious images for community review.",
  },
];

const Features = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl font-bold sm:text-5xl">
              Key <span className="text-gradient-primary">Features</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Built to fight impersonation and protect digital identity in Tanzania and beyond.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg"
                style={{ boxShadow: "var(--shadow-card)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <h2 className="font-display text-3xl font-bold">
              Ready to verify?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Protect yourself from deepfake impersonation. Try HAKIKI SCANNER now — it's free.
            </p>
            <Link to="/scanner">
              <Button variant="hero" size="lg" className="mt-8 h-14 px-10 text-base">
                Launch Scanner <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Features;
