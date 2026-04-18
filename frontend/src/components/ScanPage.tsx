import { motion } from "framer-motion";
import { Image as ImageIcon, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageScanPanel from "@/components/ImageScanPanel";
import TextCheckPanel from "@/components/TextCheckPanel";

const ScanPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Hakiki <span className="text-gradient-primary">Picha au Taarifa</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Chagua aina ya kuhakiki: picha au maandishi.
          </p>
        </motion.div>

        <Tabs defaultValue="image" className="mt-8">
          <TabsList className="mx-auto grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="image" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Picha
            </TabsTrigger>
            <TabsTrigger value="text" className="gap-2">
              <FileText className="h-4 w-4" />
              Maandishi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="mt-8">
            <ImageScanPanel />
          </TabsContent>
          <TabsContent value="text" className="mt-8">
            <TextCheckPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ScanPage;
