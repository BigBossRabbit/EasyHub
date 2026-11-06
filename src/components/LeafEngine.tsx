import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * LEAF scroll language ("A Story You Scroll") — shared with hub + gto.
 * 1) immediate pass for in-viewport, 2) IntersectionObserver reveal + unobserve,
 * 3) 1.5s safety timer (a blank page is worse than no animation),
 * prefers-reduced-motion short-circuits, j/k travel between sections.
 */
const LeafEngine = () => {
  const { pathname } = useLocation();

  // progress rail — mounted once
  useEffect(() => {
    const bar = document.getElementById("leaf-progress");
    if (!bar) return;
    let ticking = false;
    const paint = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? Math.min(scrollY / h, 1) : 0})`;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", paint);
    paint();
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", paint); };
  }, []);

  // reveal — re-armed on every route
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io: IntersectionObserver | null = null;
    const arm = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(
        "main section, main h2, main .leaf-card"
      )).filter((el) => !el.closest("[data-no-reveal]"));
      els.forEach((el) => el.classList.add("leaf-reveal"));
      if (reduce || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("leaf-in")); return; }
      const vh = innerHeight;
      els.forEach((el) => { if (el.getBoundingClientRect().top < vh * 0.96) el.classList.add("leaf-in"); });
      io = new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("leaf-in"); io?.unobserve(en.target); }
      }), { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
      els.forEach((el) => { if (!el.classList.contains("leaf-in")) io!.observe(el); });
    };
    const t0 = setTimeout(arm, 60);       // let the route paint first
    const safety = setTimeout(() => {
      document.querySelectorAll(".leaf-reveal").forEach((el) => el.classList.add("leaf-in"));
    }, 1500);
    return () => { clearTimeout(t0); clearTimeout(safety); io?.disconnect(); };
  }, [pathname]);

  // keyboard travel j/k between sections
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
      if (t && t.isContentEditable) return;
      if (e.key !== "j" && e.key !== "k") return;
      const secs = Array.from(document.querySelectorAll<HTMLElement>("main section"));
      if (!secs.length) return;
      let idx = 0, best = Infinity;
      secs.forEach((s, i) => { const d = Math.abs(s.getBoundingClientRect().top - 120); if (d < best) { best = d; idx = i; } });
      const next = e.key === "j" ? Math.min(idx + 1, secs.length - 1) : Math.max(idx - 1, 0);
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      scrollTo({ top: secs[next].getBoundingClientRect().top + scrollY - 110, behavior: reduce ? "auto" : "smooth" });
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  return <div id="leaf-progress" aria-hidden="true" />;
};

export default LeafEngine;
