import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-field-green">404</p>
        <h1 className="mt-3 font-heading text-3xl text-dark-green md:text-4xl">
          Page not found.
        </h1>
        <p className="mt-4 leading-relaxed text-slate">
          The page you&apos;re looking for doesn&apos;t exist. Maybe it moved,
          maybe it was never here. Either way, let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-block bg-field-green px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-dark-green"
          >
            Back to home
          </Link>
          <a
            href={BUSINESS.phone1Tel}
            className="inline-block border border-field-green/20 px-6 py-3 text-sm font-medium text-field-green transition-colors hover:border-field-green hover:bg-field-green hover:text-white"
          >
            Call us: {BUSINESS.phone1}
          </a>
        </div>
      </div>
    </section>
  );
}
