import { Star, Quote } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const reviews = [
  {
    name: "Kylie Barrett",
    body: "Couldn't recommend Gary's enough! We just moved into our first house two months ago and had our main sewer line clog, it ended up being an emergency situation. They were able to get out to us the next day, and finish the project within 6 hours. The supervisor was so kind, knowledgeable, and walked us through the entire process. I am so thankful for this company getting our house back up and running so quickly. Just great people!",
  },
  {
    name: "Ronald Imbert",
    body: "Had an awesome experience with Gary's Pipelining and can't recommend them enough! We needed sewer line replacement, and from start to finish, the whole team was fantastic, straightforward pricing, careful digging, and creative solutions for unexpected issues. The lining crew did an amazing job, so precise the liner didn't have a single wrinkle. What impressed us most was how thoroughly they cleaned up afterward, you truly couldn't tell they'd been here.",
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 md:py-32">
      <div className="container-px mx-auto max-w-[1400px]">
        <Reveal>
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <span className="chip">
                <Star className="h-3.5 w-3.5 fill-yellow text-yellow" /> Verified Google reviews
              </span>
              <h2 className="mt-5 max-w-3xl text-balance text-4xl leading-[1.05] md:text-6xl">
                The work speaks. <span className="italic text-muted-foreground">So do our customers.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <RevealItem key={r.name}>
              <figure className="surface-card surface-card-hover flex h-full flex-col gap-6 p-8 md:p-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow text-yellow" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary/30" />
                </div>
                <blockquote className="text-pretty text-lg leading-relaxed text-foreground md:text-xl">&ldquo;{r.body}&rdquo;</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-border pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft font-semibold text-primary">
                    {r.name.charAt(0)}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink">{r.name}</div>
                    <div className="text-xs text-muted-foreground">Google review</div>
                  </div>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
