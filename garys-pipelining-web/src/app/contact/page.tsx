import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { EstimateForm } from "@/components/forms/estimate-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Request a free estimate or reach ${siteConfig.shortName} directly by phone, email, or our 24/7 emergency line.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; area?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40">
        <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
        <div className="container-px mx-auto max-w-[1400px]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Contact</span>
          </nav>
          <span className="chip mt-8 inline-flex">Get in touch</span>
          <h1 className="mt-5 max-w-2xl text-balance text-[40px] leading-[1.05] tracking-tight md:text-6xl">
            Tell us what&rsquo;s wrong. We&rsquo;ll tell you what&rsquo;s right.
          </h1>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="grid gap-10 overflow-hidden rounded-[2.5rem] lg:grid-cols-[1fr_1.1fr]" style={{ background: "var(--gradient-hero)" }}>
            <div className="relative p-10 md:p-14">
              <div aria-hidden className="absolute inset-0 mesh-overlay opacity-50" />
              <div className="relative">
                <h2 className="text-balance text-3xl leading-[1.05] md:text-4xl" style={{ color: "white" }}>
                  Same-day callbacks during business hours.
                </h2>
                <p className="mt-4 max-w-md text-pretty text-white/70">
                  After hours, use the emergency line for live dispatch, we&rsquo;re answered 24/7.
                </p>

                <div className="mt-10 grid gap-5">
                  {[
                    { Icon: Phone, label: "Call", value: siteConfig.phone, href: siteConfig.phoneHref },
                    { Icon: Mail, label: "Email", value: siteConfig.email, href: siteConfig.emailHref },
                    { Icon: MapPin, label: "Address", value: siteConfig.address.full, href: undefined },
                    { Icon: Clock, label: "Hours", value: siteConfig.hours, href: undefined },
                  ].map((c) => {
                    const content = (
                      <>
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white">
                          <c.Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs uppercase tracking-wider text-white/50">{c.label}</div>
                          <div className="text-white">{c.value}</div>
                        </div>
                      </>
                    );
                    return c.href ? (
                      <a key={c.label} href={c.href} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
                        {content}
                      </a>
                    ) : (
                      <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                        {content}
                      </div>
                    );
                  })}
                </div>

                <a href={siteConfig.phoneHref} className="btn-emergency mt-8">
                  <Phone className="h-4 w-4" /> 24/7 Emergency Line
                </a>
              </div>
            </div>

            <div className="bg-surface-elevated p-8 md:p-12">
              <EstimateForm defaultService={service} />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-px mx-auto max-w-[1400px]">
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-soft)]">
            <iframe
              title="Map to our Tukwila office"
              src={siteConfig.mapEmbedSrc}
              width="100%"
              height="100%"
              style={{ minHeight: 360, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
