import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowRight, ScanFace, Zap, Globe, Users, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-scan.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen overflow-hidden pt-16">
    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
    <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
    <div className="container relative mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-12 px-4 lg:flex-row">
      <motion.div
        className="flex-1 text-center lg:text-left"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <Shield className="h-4 w-4" />
          Uthibitishaji wa Habari Unaoendeshwa na AI
        </div>
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Thibitisha Picha.
          <br />
          <span className="text-gradient-primary">Hakiki Maandishi.</span>
          <br />
          Linda Ukweli.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          HAKIKI SCANNER inatambua picha bandia na kuthibitisha taarifa zinazosambazwa mtandaoni. Pakia picha au andika maandishi na upate uamuzi wa papo hapo.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
          <Link to="/scanner">
            <Button variant="hero" size="lg" className="h-14 px-8 text-base">
              Skani Picha <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/text-checker">
            <Button variant="heroOutline" size="lg" className="h-14 px-8 text-base">
              Hakiki Maandishi
            </Button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="relative mx-auto max-w-lg">
          <div className="absolute -inset-4 rounded-2xl bg-primary/10 blur-2xl" />
          <img
            src={heroImage}
            alt="AI image and text verification visualization"
            className="relative rounded-2xl border border-border shadow-2xl"
            width={1280}
            height={720}
          />
          <div className="absolute inset-0 rounded-2xl">
            <div className="scanner-line absolute left-0 right-0 top-0" />
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-primary/5 p-12"
        style={{ boxShadow: "var(--shadow-glow)" }}
      >
        <h2 className="font-display text-3xl font-bold">
          Uko tayari kuhakiki?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Jilinde dhidi ya habari za uongo na picha bandia. Jaribu HAKIKI SCANNER sasa — ni bure.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link to="/scanner">
            <Button variant="hero" size="lg" className="h-14 px-10 text-base">
              Skani Picha <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/text-checker">
            <Button variant="heroOutline" size="lg" className="h-14 px-10 text-base">
              Hakiki Maandishi <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

const features = [
  {
    icon: ScanFace,
    title: "Kigunduzi cha Picha Bandia",
    description: "Hutambua picha zilizotengenezwa au kubadilishwa na AI kwa kutumia modeli za CNN na kutoa uamuzi wa HALISI, INATIA SHAKA, au FEKI.",
  },
  {
    icon: FileText,
    title: "Uthibitishaji wa Maandishi",
    description: "Angalia taarifa zinazosambazwa mtandaoni dhidi ya vyanzo rasmi na ML classifier kujua kama ni kweli au uongo.",
  },
  {
    icon: Zap,
    title: "Uchambuzi wa Papo Hapo",
    description: "AI huchambua picha na maandishi ndani ya sekunde chache, ikitoa alama ya uhakika na mchanganuo wa kina.",
  },
  {
    icon: Globe,
    title: "Simu ya Mkononi + Tovuti",
    description: "Inafanya kazi kwenye majukwaa yote na usaidizi wa nje ya mtandao kwa maeneo yenye data ndogo.",
  },
  {
    icon: Search,
    title: "Ulinganishaji na Vyanzo Rasmi",
    description: "Taarifa zinalinganishwa na data kutoka NBS, WHO, IMF na vyanzo vingine rasmi vya Tanzania.",
  },
  {
    icon: Users,
    title: "Kuripoti kwa Jamii",
    description: "Shiriki matokeo yaliyothibitishwa au ripoti taarifa zinazotia shaka kwa ukaguzi wa jamii.",
  },
];

const FeaturesSection = () => (
  <section className="py-24 bg-secondary/30">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-4xl font-bold sm:text-5xl">
          Vipengele <span className="text-gradient-primary">Muhimu</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Imejengwa kupambana na habari za uongo na kulinda ukweli wa kidijitali nchini Tanzania na kwingineko.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg"
            style={{ boxShadow: "var(--shadow-card)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
    </div>
  </section>
);

const steps = [
  { 
    step: "01", 
    title: "Pokea habari inayotia shaka", 
    description: "Pata picha au maandishi kutoka WhatsApp, X, Instagram, au chanzo chochote." 
  },
  { 
    step: "02", 
    title: "Pakia kwenye HAKIKI Scanner", 
    description: "Weka picha kwenye skana yetu au bandika maandishi kwenye Hakiki Maandishi." 
  },
  { 
    step: "03", 
    title: "AI huchambua ndani ya sekunde chache", 
    description: "Modeli zetu za AI huchakata picha na maandishi papo hapo." 
  },
  { 
    step: "04", 
    title: "Pata uamuzi wako", 
    description: "Angalia matokeo pamoja na alama ya uhakika na chanzo cha data." 
  },
];

const HowItWorksSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-4xl font-bold sm:text-5xl">
          Inavyofanya <span className="text-gradient-primary">Kazi</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Hatua 4 rahisi kuhakiki uhalisi wa picha na maandishi.
        </p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            className="relative text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <span className="font-display text-sm font-semibold">HAKIKI SCANNER</span>
      </div>
      <p className="text-sm text-muted-foreground">
        © 2026 HAKIKI SCANNER — Tanzanian AI Tech. Haki zote zimehifadhiwa.
      </p>
    </div>
  </footer>
);

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default LandingPage;
