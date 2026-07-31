import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  /** Size in pixels (width and height if square). Default is 40. */
  size?: number;
  /** Explicit width in pixels. Overrides `size`. */
  width?: number;
  /** Explicit height in pixels. Overrides `size`. */
  height?: number;
  /** Whether to display the text label alongside the logo icon. */
  showText?: boolean;
  /** Optional subtitle displayed beneath the main title. */
  subtitle?: string;
  /** Additional CSS class names for the container. */
  className?: string;
  /** Additional CSS class names for the image element wrapper. */
  imgClassName?: string;
  /** Optional navigation target. If provided, logo is wrapped in Next.js Link. */
  href?: string;
  /** Preload logo image for high priority (e.g. in hero/navbar). */
  priority?: boolean;
}

export function Logo({
  size = 40,
  width,
  height,
  showText = false,
  subtitle,
  className,
  imgClassName,
  href,
  priority = false,
}: LogoProps) {
  const w = width ?? size;
  const h = height ?? size;

  const logoContent = (
    <div className={cn("inline-flex items-center gap-2.5 group select-none", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-200 group-hover:scale-105",
          imgClassName
        )}
        style={{ width: `${w}px`, height: `${h}px` }}
      >
        <Image
          src="/logo_tefa.svg"
          alt="Logo TeFa PPLG"
          width={w}
          height={h}
          priority={priority}
          className="object-contain w-full h-full"
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-heading font-bold text-base leading-none text-foreground tracking-tight">
            TeFa PPLG
          </span>
          {subtitle && (
            <span className="text-[11px] text-muted-foreground leading-tight tracking-wider uppercase mt-1">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-none">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
