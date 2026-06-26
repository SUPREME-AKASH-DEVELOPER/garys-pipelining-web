"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CircleCheck } from "lucide-react";
import { services } from "@/lib/content/services";
import { submitEstimateForm } from "@/lib/web3forms";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  address: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function EstimateForm({ defaultService }: { defaultService?: string }) {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { service: defaultService ?? "" },
  });

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      await submitEstimateForm(values);
    } catch {
      setError("We couldn't send your request automatically. Please call us instead, we'd rather hear from you than lose the message.");
    }
  }

  if (isSubmitSuccessful && !error) {
    return (
      <div className="grid place-items-center gap-4 py-16 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
          <CircleCheck className="h-6 w-6" />
        </span>
        <h3 className="text-3xl tracking-tight text-ink">Thank you.</h3>
        <p className="max-w-sm text-muted-foreground">
          We&rsquo;ve received your request and will reach out within the hour during business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <h3 className="text-2xl tracking-tight text-ink md:text-3xl" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
        Request your free estimate
      </h3>
      <p className="-mt-2 text-sm text-muted-foreground">Typical response within 1 business hour.</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder="Jane Smith"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="(206) 555-0123"
            className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </Field>
      </div>

      <Field label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </Field>

      <Field label="Address">
        <input
          {...register("address")}
          placeholder="123 Main St, City"
          className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </Field>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Service needed</label>
        <select
          {...register("service")}
          defaultValue={defaultService ?? ""}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Not sure">Not sure, please diagnose</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">Describe the issue</label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Slow drain, backup, recurring clog, recent inspection report…"
          className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {error && <p className="text-sm text-emergency">{error}</p>}

      <button type="submit" disabled={isSubmitting} className="btn-primary mt-2 justify-center text-base disabled:opacity-60">
        {isSubmitting ? "Sending…" : "Send my request"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your service request. We never share your info.
      </p>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-emergency">{error}</p>}
    </div>
  );
}
