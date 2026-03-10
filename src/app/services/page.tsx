"use client";

import Image from "next/image";
import { SERVICES, BUSINESS } from "@/lib/constants";
import { ServiceIcon } from "@/components/service-icon";
import { CtaBlock } from "@/components/cta-banner";
import { Reveal, ZoomImage, DrawLine } from "@/components/motion";

const serviceImages: Record<string, { src: string; alt: string }> = {
  mowing: { src: "/images/hero-lawn.jpg", alt: "Freshly mowed lawn" },
  "weed-control": { src: "/images/weed-detail.jpg", alt: "Weed removal detail" },
  "storm-cleanup": { src: "/images/storm-cleanup.jpg", alt: "Storm debris on a property" },
  "seasonal-cleanup": { src: "/images/fall-cleanup.jpg", alt: "Fall leaf cleanup" },
  "storage-cleanouts": { src: "/images/clean-shed.jpg", alt: "Cleaned out storage" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Header — image bleed + text overlap */}
      <div className="relative h-48 md:h-64">
        <Image
          src="/images/trimmer-action.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark-green/70" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <div className="-mt-12 md:-mt-16">
          <Reveal>
            <div className="inline-block bg-warm-white px-6 py-4 md:px-8 md:py-6">
              <p className="text-xs uppercase tracking-[0.2em] text-field-green">Services</p>
              <h1 className="mt-1 font-heading text-3xl text-dark-green md:text-4xl">
                What we take on.
              </h1>
              <p className="mt-2 max-w-md text-slate">
                No contracts. No fine print. You tell us what you need, we tell you
                what it costs, and we get to work.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Services — alternating image/text */}
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-20">
          {SERVICES.map((service, i) => {
            const image = serviceImages[service.id];
            const flipped = i % 2 === 1;

            return (
              <article key={service.id}>
                <div className="grid items-center gap-8 md:grid-cols-12">
                  <Reveal
                    className={`${flipped ? "md:col-start-7 md:col-span-6" : "md:col-span-6"}`}
                    delay={0.1}
                  >
                    {image && (
                      <ZoomImage className="relative aspect-[4/3] rounded-sm">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </ZoomImage>
                    )}
                  </Reveal>

                  <Reveal
                    className={`${
                      flipped
                        ? "md:col-start-1 md:row-start-1 md:col-span-5"
                        : "md:col-span-5 md:col-start-8"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ServiceIcon icon={service.icon} size={22} className="text-field-green" />
                      <h2 className="font-heading text-2xl text-dark-green md:text-3xl">
                        {service.title}
                      </h2>
                    </div>
                    <p className="mt-4 leading-relaxed text-slate">
                      {service.description}
                    </p>
                  </Reveal>
                </div>

                {i < SERVICES.length - 1 && <DrawLine className="mt-16" />}
              </article>
            );
          })}
        </div>

        <div className="mt-20 border-t border-light-gray pt-10">
          <Reveal>
            <h2 className="font-heading text-2xl text-dark-green">
              Something else on your property?
            </h2>
            <p className="mt-2 max-w-lg text-slate">
              If it needs doing and it&apos;s on your land, call us. We&apos;ll tell you
              straight whether we can handle it — and we usually can.
            </p>
          </Reveal>
          <CtaBlock text="Every estimate is free. No pressure, no obligation." />
        </div>
      </div>
    </>
  );
}
