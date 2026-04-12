# Design Document: Mobile Performance Optimisation

## Overview

This document describes the technical approach to eliminating frame drops and scroll jank on mobile devices for the IoTRONICS website. All changes are gated behind a mobile detection utility so the desktop experience is completely unchanged. The strategy is: detect mobile once, then (1) reduce particle counts and add frame-skipping, (2) replace Three.js canvases with CSS placeholders, (3) strip or reduce framer-motion infinite animations, (4) disable Lenis smooth scroll, (5) remove expensive CSS effects, (6) slow down background intervals, and (7) add Intersection Observer gating to pause off-screen work.

## Architecture

```
src/
  lib/
    isMobile.ts          ← single source of truth for mobile detection
  hooks/
    useInView.ts         ← lightweight IntersectionObserver hook
    useImmersiveScroll.ts  ← modified: skip Lenis + ticker on mobile
  components/
    3d/
      ParticleCanvas.tsx   ← modified: 80 particles, frame-skip, InView gating
      FloatingOrbs.tsx     ← modified: CSS placeholder on mobile
      RotatingCube.tsx     ← modified: CSS placeholder on mobile
      IoTDeviceViewer.tsx  ← modified: CSS placeholder on mobile
    LiveElements.tsx       ← modified: no animated nodes on mobile
    HeroSection.tsx        ← modified: 0 particles + no glow pulse on mobile
    AnimatedBackgrounds.tsx← modified: 2 static orbs on mobile
    ImmersiveHome.tsx      ← modified: slower intervals + InView gating
  index.css               ← modified: @media mobile disables blur, scanline, ambient float
```

## Components and Interfaces

### `src/lib/isMobile.ts`

```ts
export const isMobile = (): boolean =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768);
```

Called once at component mount (inside `useEffect` or `useMemo`) and stored in a local variable. Never called on every render.

### `src/hooks/useInView.ts`

```ts
// Returns a [ref, isInView] tuple using IntersectionObserver
export function useInView(threshold = 0.1): [React.RefObject<Element>, boolean]
```

Used by ParticleCanvas and ImmersiveHome IoT section to pause RAF loops and intervals when off-screen.

### ParticleCanvas changes

- `PARTICLE_COUNT` stays 400 for desktop; on mobile use `MOBILE_PARTICLE_COUNT = 80`
- Add `frameSkip` counter: on mobile, only call `render()` on every 2nd RAF tick (targets ~30fps)
- Wrap the RAF loop start/stop in an IntersectionObserver: cancel `animationRef` when `isIntersecting < 0.1`, restart when visible
- On mobile, skip all mouse/touch repulsion physics — particles drift back to `baseX/baseY` only

### FloatingOrbs / RotatingCube / IoTDeviceViewer changes

Each component gets an early return on mobile that renders a lightweight CSS alternative:

```tsx
if (isMobile()) return <MobileOrbPlaceholder />;
return <Canvas ...>...</Canvas>;
```

`MobileOrbPlaceholder` is a `<div>` with a radial-gradient background and a single CSS `@keyframes` scale pulse — no JS animation loop.

### LiveElements changes

- `FloatingParticles`: on mobile, return `null` immediately
- `CircuitBackground`: on mobile, return a static SVG with no `motion.*` elements
- `ElectricityArc`: on mobile, return `null`

### HeroSection changes

- `particles` array: on mobile, set length to 0 (no floating dots rendered)
- Central glow `motion.div`: on mobile, render as a plain `<div>` with no `animate` prop
- Rotating orbit ring: on mobile, remove the `animate={{ rotate: 360 }}` — render as static

### AnimatedBackgrounds changes

- `FloatingOrbsBackground`: on mobile, render 2 static `<div>` orbs with CSS `opacity: 0.3`, no framer-motion

### ImmersiveHome changes

- `useLivePulsingValue`: accept a `mobile` flag; when true, use `interval = 5000`
- `QuoteCarousel`: on mobile, use `interval = 8000`
- IoT dashboard section: wrap with `useInView` — clear all intervals when off-screen, restart when visible

### useImmersiveScroll changes

```ts
const mobile = isMobile();
if (mobile) {
  // Skip Lenis init entirely
  // Skip gsap.ticker.add()
  // Still register ScrollTrigger for fade-in animations but skip parallax
  return;
}
```

On mobile, only the panel fade-in ScrollTrigger animations run (no Lenis, no ticker, no parallax, no background color morphing).

## Data Models

No new data models. The only new shared state is the `isMobile()` boolean computed once per component mount.


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Property 1: Mobile particle count is bounded
*For any* render of ParticleCanvas on a mobile device, the number of particles initialised shall be at most 80.
**Validates: Requirements 1.1**

Property 2: Three.js canvases are absent on mobile
*For any* Three.js canvas component (FloatingOrbs, RotatingCube, IoTDeviceViewer), when rendered on a mobile device, no `<canvas>` element shall appear in the rendered output.
**Validates: Requirements 2.1, 2.2, 2.3**

Property 3: Animated overlay components return null on mobile
*For any* render of FloatingParticles, ElectricityArc, or CircuitBackground on a mobile device, the rendered output shall contain no animated DOM nodes.
**Validates: Requirements 3.1, 3.4, 3.5**

Property 4: FloatingOrbsBackground orb count is bounded on mobile
*For any* render of FloatingOrbsBackground on a mobile device, the number of orb elements rendered shall be at most 2.
**Validates: Requirements 3.3**

Property 5: Lenis and GSAP ticker are not initialised on mobile
*For any* invocation of useImmersiveScroll on a mobile device, neither the Lenis constructor nor `gsap.ticker.add` shall be called.
**Validates: Requirements 4.1, 4.2**

Property 6: Polling intervals are increased on mobile
*For any* component using useLivePulsingValue or QuoteCarousel on a mobile device, the setInterval call shall use a delay of at least 5000ms.
**Validates: Requirements 6.1, 6.3**

Property 7: ParticleCanvas RAF is cancelled when off-screen
*For any* ParticleCanvas that receives an IntersectionObserver callback with `isIntersecting = false`, `cancelAnimationFrame` shall be called.
**Validates: Requirements 1.3, 7.1**

## Error Handling

- If `window.matchMedia` is unavailable (SSR), `isMobile()` returns `false` (safe default — desktop behaviour)
- If `IntersectionObserver` is unavailable, ParticleCanvas falls back to always-running RAF (graceful degradation)
- If GSAP/Lenis globals are missing, `useImmersiveScroll` already has a guard and returns early

## Testing Strategy

**Dual Testing Approach**: unit tests for specific examples and edge cases; property-based tests for universal properties.

**Property-Based Testing Library**: `fast-check` (already compatible with Vitest/Jest, works in jsdom)

**Unit Tests**:
- Verify `isMobile()` returns correct values for various `matchMedia` mock states
- Verify `useInView` hook correctly starts/stops observation
- Verify interval values in QuoteCarousel and useLivePulsingValue on mobile

**Property Tests** (minimum 100 iterations each):
- Property 1: Generate random mobile viewport widths (≤768), verify particle count ≤ 80
- Property 2: For each Three.js component, render with mobile=true, assert no canvas in output
- Property 3: For each animated overlay component, render with mobile=true, assert no animated nodes
- Property 4: Render FloatingOrbsBackground with mobile=true, assert orb count ≤ 2
- Property 5: Mock GSAP/Lenis globals, invoke hook with mobile=true, assert neither constructor called
- Property 6: Mock setInterval, render mobile components, assert all delays ≥ 5000
- Property 7: Mock IntersectionObserver, trigger not-intersecting, assert cancelAnimationFrame called

Tag format: `// Feature: mobile-performance-optimization, Property N: <property_text>`
