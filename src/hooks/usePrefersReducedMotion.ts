import React from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";
const isRenderingOnServer = typeof window === "undefined";
const getInitialState = () => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
};
export default function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    React.useState(getInitialState);
  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    // Type the event parameter as MediaQueryListEvent
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };
    // The 'change' event on MediaQueryList dispatches a MediaQueryListEvent
    // modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      // older browsers
      mediaQueryList.addListener(listener);
    }
    return () => {
      // modern browsers
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        // older browsers
        mediaQueryList.removeListener(listener);
      }
    };
  }, []);
  return prefersReducedMotion;
}
