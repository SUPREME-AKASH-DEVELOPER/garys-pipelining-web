import { ShieldCheck, Clock, Wrench, CircleCheck, Hammer, Award } from "lucide-react";

const items = [
  { Icon: ShieldCheck, label: "Licensed & Insured" },
  { Icon: Clock, label: "24/7 Emergency" },
  { Icon: Award, label: "Trenchless Specialists" },
  { Icon: Wrench, label: "Contractor Friendly" },
  { Icon: Hammer, label: "Trade Pricing Available" },
  { Icon: CircleCheck, label: "Written Warranty" },
];

function TrustItems() {
  return (
    <>
      {items.map(({ Icon, label }) => (
        <div key={label} className="flex shrink-0 items-center gap-2.5 px-8 text-[19px] text-white">
          <Icon className="h-4 w-4 shrink-0 text-white" />
          <span className="whitespace-nowrap font-medium text-white">{label}</span>
        </div>
      ))}
    </>
  );
}

export function TrustStrip() {
  return (
    <section aria-label="Trust signals" className="relative flex items-center overflow-hidden border-y border-border bg-primary py-[29px]">
      <div className="marquee-track-rtl flex w-max shrink-0 items-center">
        <TrustItems />
        <TrustItems />
      </div>
    </section>
  );
}
