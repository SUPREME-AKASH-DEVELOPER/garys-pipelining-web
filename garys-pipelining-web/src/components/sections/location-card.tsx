import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Location } from "@/lib/content/locations";

export function LocationCard({ location }: { location: Location }) {
  return (
    <Link
      href={`/service-area/${location.slug}`}
      className="surface-card surface-card-hover group relative flex flex-col overflow-hidden p-0"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={location.heroImage}
          alt={`${location.city}, WA`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {location.isHQ && (
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-yellow px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-yellow-foreground">
            Home base
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="flex items-center gap-2 text-xl tracking-tight text-ink">
          <MapPin className="h-4 w-4 text-primary" /> {location.city}, WA
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{location.intro}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary link-underline">
          View service area
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
