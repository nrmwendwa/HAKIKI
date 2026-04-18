import { Share2, MessageCircle, Twitter, Facebook, Send, Link2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ShareMenuProps {
  text: string;
  url?: string;
  disabled?: boolean;
  disabledReason?: string;
  className?: string;
}

const ShareMenu = ({ text, url, disabled, disabledReason, className }: ShareMenuProps) => {
  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.origin : "");

  if (disabled) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={className} tabIndex={0}>
            <Button variant="outline" className="w-full" disabled>
              <Share2 className="mr-2 h-4 w-4" /> Tuma Matokeo
            </Button>
          </span>
        </TooltipTrigger>
        {disabledReason && <TooltipContent>{disabledReason}</TooltipContent>}
      </Tooltip>
    );
  }

  const openShare = (target: string) => {
    window.open(target, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      toast.success("Imenakiliwa!");
    } catch {
      toast.error("Haikuweza kunakili. Tafadhali nakili mwenyewe.");
    }
  };

  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(shareUrl);
  const whatsappText = encodeURIComponent(`${text} ${shareUrl}`);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className ?? "w-full"}>
          <Share2 className="mr-2 h-4 w-4" /> Tuma Matokeo
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onClick={() => openShare(`https://wa.me/?text=${whatsappText}`)}>
          <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            openShare(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`)
          }
        >
          <Twitter className="mr-2 h-4 w-4" /> X (Twitter)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            openShare(
              `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
            )
          }
        >
          <Facebook className="mr-2 h-4 w-4" /> Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            openShare(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`)
          }
        >
          <Send className="mr-2 h-4 w-4" /> Telegram
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopy}>
          <Link2 className="mr-2 h-4 w-4" /> Nakili Kiungo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareMenu;
