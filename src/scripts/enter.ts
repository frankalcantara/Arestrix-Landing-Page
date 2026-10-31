/**
 * Starts the entrance animations in src/styles/effects.css ([data-enter]) when an element
 * reaches the screen, once, as on the reference. Phones (under 751px) and reduced motion get
 * no entrances; without this script every element simply shows.
 *
 * Text and small rows start at 15% visible, as measured on the reference. Cards and panels
 * wait until 40% of the surface is on screen (18% when the element is taller than half the
 * viewport, so a very tall panel still starts), otherwise the whole entrance plays below the
 * fold and the reader only sees the settled card.
 */
if (
  matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 751px)").matches &&
  "IntersectionObserver" in window
) {
  const needed = (el: Element) => {
    const kind = el.getAttribute("data-enter");
    if (kind !== "card" && kind !== "panel") return 0.15;
    return el.getBoundingClientRect().height > innerHeight * 0.55 ? 0.18 : 0.4;
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.intersectionRatio >= needed(e.target)) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: [0, 0.15, 0.18, 0.4, 0.6] },
  );
  document.documentElement.classList.add("js-enter");
  for (const el of document.querySelectorAll("[data-enter]")) io.observe(el);
}
