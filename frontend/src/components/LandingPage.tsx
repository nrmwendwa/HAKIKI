import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowRight, ScanFace, Zap, Globe, Users, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const VerificationHeroVisual = () => (
  <div
    className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border"
    style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
    aria-hidden="true"
  >
    <div className="absolute inset-0 bg-grid-pattern opacity-30" />
    <div
      className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      style={{ background: "hsl(var(--primary) / 0.2)" }}
    />

    <div className="relative h-full w-full">
      <motion.div
        className="absolute"
        style={{ left: "8%", top: "14%", width: "44%", transform: "rotate(-6deg)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          className="relative overflow-hidden rounded-xl border"
          style={{
            background: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            boxShadow: "0 16px 40px hsl(220 20% 2% / 0.5)",
          }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <svg viewBox="0 0 200 150" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="heroPhotoSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(28 75% 60%)" />
                  <stop offset="100%" stopColor="hsl(12 60% 38%)" />
                </linearGradient>
              </defs>
              <rect width="200" height="150" fill="url(#heroPhotoSky)" />
              <circle cx="148" cy="48" r="14" fill="hsl(48 95% 72%)" />
              <path d="M0 112 L42 78 L78 100 L118 62 L158 88 L200 72 L200 150 L0 150 Z" fill="hsl(220 30% 15%)" />
              <path d="M0 130 L55 104 L100 122 L150 92 L200 110 L200 150 L0 150 Z" fill="hsl(220 30% 10%)" />
            </svg>
          </div>
          <div
            className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              background: "hsl(var(--destructive))",
              boxShadow: "0 6px 18px hsl(var(--destructive) / 0.5)",
              border: "3px solid hsl(var(--card))",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{ right: "6%", bottom: "14%", width: "44%", transform: "rotate(5deg)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <div
          className="relative rounded-2xl rounded-bl-sm border px-4 py-3"
          style={{
            background: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
            boxShadow: "0 16px 40px hsl(220 20% 2% / 0.5)",
          }}
        >
          <div className="space-y-2">
            <div className="h-2 w-full rounded-full" style={{ background: "hsl(var(--muted-foreground) / 0.45)" }} />
            <div className="h-2 w-11/12 rounded-full" style={{ background: "hsl(var(--muted-foreground) / 0.4)" }} />
            <div className="h-2 w-8/12 rounded-full" style={{ background: "hsl(var(--muted-foreground) / 0.35)" }} />
          </div>
          <div
            className="absolute -bottom-2 left-2 h-4 w-4 rotate-45 border-b border-l"
            style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
          />
          <div
            className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              background: "hsl(var(--safe))",
              boxShadow: "0 6px 18px hsl(var(--safe) / 0.5)",
              border: "3px solid hsl(var(--card))",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--safe-foreground))" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="5 12 10 17 19 7" />
            </svg>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ width: "48%", aspectRatio: "1 / 1", translateX: "-50%", translateY: "-50%" }}
        initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -12 }}
        transition={{ duration: 0.6, delay: 0.55, type: "spring", stiffness: 160 }}
      >
        <motion.div
          className="h-full w-full"
          animate={{ y: [-4, 4, -4], rotate: [-12, -10, -12] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id="lensRim" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
              <radialGradient id="lensGlass" cx="0.35" cy="0.3">
                <stop offset="0%" stopColor="hsl(var(--primary) / 0.35)" />
                <stop offset="55%" stopColor="hsl(var(--primary) / 0.1)" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.05)" />
              </radialGradient>
            </defs>
            <line
              x1="132"
              y1="132"
              x2="188"
              y2="188"
              stroke="url(#lensRim)"
              strokeWidth="22"
              strokeLinecap="round"
            />
            <line
              x1="132"
              y1="132"
              x2="188"
              y2="188"
              stroke="hsl(220 20% 4%)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <circle cx="82" cy="82" r="62" fill="url(#lensGlass)" stroke="url(#lensRim)" strokeWidth="10" />
            <circle cx="82" cy="82" r="62" fill="none" stroke="hsl(var(--background))" strokeWidth="3" opacity="0.7" />
            <ellipse cx="60" cy="58" rx="20" ry="10" fill="white" opacity="0.25" transform="rotate(-30 60 58)" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

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
          <Link to="/scan">
            <Button variant="hero" size="lg" className="h-14 px-8 text-base">
              Anza Kuhakiki <ArrowRight className="ml-2 h-5 w-5" />
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
          <VerificationHeroVisual />
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
        <div className="mt-8 flex justify-center">
          <Link to="/scan">
            <Button variant="hero" size="lg" className="h-14 px-10 text-base">
              Anza Kuhakiki <ArrowRight className="ml-2 h-5 w-5" />
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
  <section id="vipengele" className="scroll-mt-20 py-24 bg-secondary/30">
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
  <section id="inavyofanya-kazi" className="scroll-mt-20 py-24">
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
