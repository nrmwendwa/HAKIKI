import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const steps = [
  { 
    step: "01", 
    title: "Receive suspicious image", 
    description: "Get a photo from WhatsApp, Instagram, or any source." 
  },
  { 
    step: "02", 
    title: "Upload to HAKIKI Scanner", 
    description: "Drop the image into our scanner via mobile or web." 
  },
  { 
    step: "03", 
    title: "AI analyzes in seconds", 
    description: "Our EfficientNet model processes the image instantly." 
  },
  { 
    step: "04", 
    title: "Get your verdict", 
    description: "See REAL, SUSPICIOUS, or FAKE with confidence scores." 
  },
];

const HowItWorks = () => {
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
              How It <span className="text-gradient-primary">Works</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Simple 4-step process to verify face authenticity.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-16">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 font-display text-xl font-bold text-primary">
                  {s.step}
                </div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-8">
                    <ArrowRight className="h-6 w-6 text-primary/30" />
                  </div>
                )}
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

export default HowItWorks;
