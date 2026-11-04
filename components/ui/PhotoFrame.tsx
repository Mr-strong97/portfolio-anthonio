import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

// Cadre 4:5 : dimensions réservées (aucun décalage de mise en page). "priority" = chargement
// prioritaire, réservé au portrait du Hero.
export default function PhotoFrame({ className, alt, ...img }: Props) {
  return (
    <div
      className={cn(
        "border-line bg-surface relative aspect-[4/5] overflow-hidden rounded-3xl border",
        className,
      )}
    >
      <Image {...img} alt={alt} className="size-full object-cover object-[50%_15%]" />
    </div>
  );
}
