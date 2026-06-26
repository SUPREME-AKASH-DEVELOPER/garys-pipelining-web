import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/brand/logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Gary's Pipelining & Drain Cleaning, home" className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src={logo}
        alt="Gary's Pipelining and Drain Cleaning, LLC"
        width={1135}
        height={417}
        className="h-14 w-auto sm:h-16 lg:h-[4.5rem]"
        priority
      />
    </Link>
  );
}
