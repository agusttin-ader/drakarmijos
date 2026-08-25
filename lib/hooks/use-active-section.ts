"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section most visible in the viewport (for nav highlighting).
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!active) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}
