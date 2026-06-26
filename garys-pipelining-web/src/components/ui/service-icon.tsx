import { Cog, Hammer, Wrench, Droplets, Camera, Sparkles } from "lucide-react";

export function ServiceIcon({
  name,
  className,
  strokeWidth,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  switch (name) {
    case "Cog":
      return <Cog className={className} strokeWidth={strokeWidth} />;
    case "Hammer":
      return <Hammer className={className} strokeWidth={strokeWidth} />;
    case "Wrench":
      return <Wrench className={className} strokeWidth={strokeWidth} />;
    case "Droplets":
      return <Droplets className={className} strokeWidth={strokeWidth} />;
    case "Camera":
      return <Camera className={className} strokeWidth={strokeWidth} />;
    case "Sparkles":
      return <Sparkles className={className} strokeWidth={strokeWidth} />;
    default:
      return <Wrench className={className} strokeWidth={strokeWidth} />;
  }
}
