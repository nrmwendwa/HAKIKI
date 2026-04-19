import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ReportButtonProps {
  mailto: string;
  label: string;
  disabled?: boolean;
  disabledReason?: string;
  className?: string;
}

const ReportButton = ({
  mailto,
  label,
  disabled,
  disabledReason,
  className,
}: ReportButtonProps) => {
  if (disabled) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={className} tabIndex={0}>
            <Button variant="outline" className="w-full" disabled>
              <Flag className="mr-2 h-4 w-4" /> {label}
            </Button>
          </span>
        </TooltipTrigger>
        {disabledReason && <TooltipContent>{disabledReason}</TooltipContent>}
      </Tooltip>
    );
  }

  return (
    <Button variant="outline" className={className ?? "w-full"} asChild>
      <a href={mailto}>
        <Flag className="mr-2 h-4 w-4" /> {label}
      </a>
    </Button>
  );
};

export default ReportButton;
