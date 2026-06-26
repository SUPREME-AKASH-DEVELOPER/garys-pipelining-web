export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`container-px mx-auto max-w-[1400px] ${className}`}>{children}</div>;
}
