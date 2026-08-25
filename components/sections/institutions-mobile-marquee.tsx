"use client";

import { useCallback, useRef } from "react";
import { InstitutionLogo } from "@/components/ui/institution-logo";
import { siteData } from "@/lib/site-data";

export function InstitutionsMobileMarquee() {
  const trackRef = useRef<HTMLUListElement>(null);
  const resumeTimerRef = useRef<number | null>(null);

  const pause = useCallback(() => {
    trackRef.current?.classList.add("institutions-marquee-paused");
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const resumeLater = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      trackRef.current?.classList.remove("institutions-marquee-paused");
      resumeTimerRef.current = null;
    }, 1800);
  }, []);

  const items = siteData.institutions;
  const marqueeItems = [...items, ...items];

  return (
    <div
      className="overflow-hidden md:hidden"
      onTouchStart={pause}
      onTouchEnd={resumeLater}
      onTouchCancel={resumeLater}
    >
      <ul
        ref={trackRef}
        className="institutions-marquee flex w-max items-center gap-x-6 motion-reduce:transform-none"
      >
        {marqueeItems.map((item, index) => (
          <InstitutionLogo
            key={`${item.name}-${index}`}
            name={item.name}
            logo={item.logo}
            context="mobile"
            showSeparator={index > 0}
            duplicate={index >= items.length}
            maxWidthClass="max-w-[9rem]"
          />
        ))}
      </ul>
    </div>
  );
}
