import { useState, useEffect } from "react";

export const useIntersectionObserver = (
  elementRef,
  { threshold = 0, root = null, rootMargin = "0%", freezeOnceVisible = false }
) => {
  const [entry, setEntry] = useState();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]) => {
    // Use requestIdleCallback for better performance
    if ("requestIdleCallback" in window) {
      requestIdleCallback(
        () => {
          setEntry(entry);
        },
        { timeout: 50 }
      );
    } else {
      setEntry(entry);
    }
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport =
      typeof window !== "undefined" && !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = {
      threshold,
      root,
      rootMargin,
      // Add performance optimizations
      delay: 100, // Add delay to reduce frequency
    };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
};
