import { useEffect, useRef } from 'react';

/**
 * useImmersiveScroll — Initializes Lenis smooth scroll,
 * registers GSAP ScrollTrigger, syncs them together,
 * and sets up per-panel fade+slide animations with
 * parallax depth layers and rich background morphing.
 */
const useImmersiveScroll = () => {
  const lenisRef = useRef<any>(null);
  const tickerCallbackRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    // Access globals loaded via CDN
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    const Lenis = (window as any).Lenis;

    if (!gsap || !ScrollTrigger || !Lenis) {
      console.warn('[useImmersiveScroll] GSAP, ScrollTrigger, or Lenis not found on window.');
      return;
    }

    // Register plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      mouseMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ticker
    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    tickerCallbackRef.current = tickerCallback;
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // ============================
    // Panel fade-in + slide-up
    // ============================
    const panels = gsap.utils.toArray('.imm-panel');
    panels.forEach((panel: HTMLElement, i: number) => {
      const content = panel.querySelector('.imm-panel-content');
      if (!content) return;

      // Skip hero (first panel) — it starts visible
      if (i === 0) return;

      gsap.fromTo(
        content,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
    });

    // ============================
    // Background color morphing — richer, more distinct tones
    // ============================
    const colors = [
      '#0a0a0a',  // Panel 1 — pure dark
      '#0d0806',  // Panel 2 — warm dark (orange tint)
      '#080b0d',  // Panel 3 — cool dark (cyan/teal tint)
      '#0a0908',  // Panel 4 — warm neutral
      '#100804',  // Panel 5 — deep warm (orange glow CTA)
    ];
    panels.forEach((panel: HTMLElement, i: number) => {
      if (i === 0) return;
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 60%',
        end: 'top 20%',
        scrub: true,
        onUpdate: (self: any) => {
          const from = colors[i - 1] || colors[0];
          const to = colors[i] || colors[colors.length - 1];
          const interpolated = gsap.utils.interpolate(from, to, self.progress);
          document.body.style.backgroundColor = interpolated;
        },
      });
    });

    // ============================
    // Parallax on ambient glow elements
    // ============================
    const ambientOrbs = gsap.utils.toArray('.imm-panel-ambient');
    ambientOrbs.forEach((orb: HTMLElement) => {
      // Find which panel this orb belongs to
      const parentPanel = orb.closest('.imm-panel');
      if (!parentPanel) return;

      gsap.fromTo(
        orb,
        { y: 60 },
        {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: parentPanel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    // ============================
    // Subtle opacity cross-fade on panel gradient overlays
    // ============================
    const gradientOverlays = gsap.utils.toArray('.imm-panel-gradient');
    gradientOverlays.forEach((overlay: HTMLElement) => {
      const parentPanel = overlay.closest('.imm-panel');
      if (!parentPanel) return;

      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: parentPanel,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );
    });

    // ============================
    // Stat counter animation (Panel 2)
    // ============================
    const statElements = document.querySelectorAll('.imm-stat-number');
    statElements.forEach((el: Element) => {
      const target = parseInt((el as HTMLElement).dataset.target || '0', 10);
      const suffix = (el as HTMLElement).dataset.suffix || '';

      gsap.fromTo(
        { val: 0 },
        { val: target },
        {
          val: target,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate: function (this: any) {
            (el as HTMLElement).textContent = Math.round(this.targets()[0].val) + suffix;
          },
        }
      );
    });

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st: any) => st.kill());
      // Fix: remove the actual ticker callback, not lenis.raf
      if (tickerCallbackRef.current) {
        gsap.ticker.remove(tickerCallbackRef.current);
      }
      document.body.style.backgroundColor = '';
    };
  }, []);

  return lenisRef;
};

export default useImmersiveScroll;
