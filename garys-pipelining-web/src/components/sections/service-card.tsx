import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceIcon } from "@/components/ui/service-icon";
import type { Service } from "@/lib/content/services";

export function ServiceCard({ service, large = false }: { service: Service; large?: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`surface-card surface-card-hover group relative flex flex-col overflow-hidden p-7 ${
        large ? "lg:col-span-2 lg:flex-row lg:items-end lg:gap-10 lg:p-10" : ""
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      {service.featured && (
        <span className="absolute right-7 top-7 inline-flex items-center rounded-full bg-yellow px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-yellow-foreground lg:right-10 lg:top-10">
          Popular
        </span>
      )}
      <div className={large ? "flex-1" : ""}>
        <div className="flex items-center">
          <span
            className="grid h-12 w-12 place-items-center rounded-2xl text-primary transition-transform duration-300 group-hover:scale-110"
            style={{ background: "var(--color-primary-soft)" }}
          >
            <ServiceIcon name={service.icon} className="h-5 w-5" strokeWidth={1.6} />
          </span>
        </div>
        <h3 className={`mt-6 tracking-tight text-ink ${large ? "text-3xl md:text-4xl" : "text-2xl"}`}>{service.name}</h3>
        <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">{service.shortDescription}</p>
      </div>
      <div className={large ? "lg:shrink-0" : "mt-6"}>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
          Learn more
          <span className="grid h-7 w-7 place-items-center rounded-full border border-border-strong text-foreground transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </span>
      </div>
    </Link>
  );
}
