import { motion } from "framer-motion";
import { ScanFace, Zap, Globe, Users, ArrowRight, FileText, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

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
              Vipengele <span className="text-gradient-primary">Muhimu</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Imejengwa kupambana na habari za uongo na kulinda ukweli wa kidijitali nchini Tanzania na kwingineko.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
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
      </div>
    </>
  );
};

export default Features;
